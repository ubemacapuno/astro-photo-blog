import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

export const server = {
  send: defineAction({
    accept: "form",

    input: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email required"),
      message: z.string().min(1, "Message is required"),
    }),

    handler: async ({ name, email, message }, { locals }) => {
      // @ts-ignore
      const apiKey = locals.runtime?.env?.RESEND_API_KEY;
      // @ts-ignore
      const toEmail = locals.runtime?.env?.RESEND_EMAIL_ADDRESS;

      if (apiKey === undefined || apiKey === "") {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Resend API key is not configured",
        });
      }

      if (toEmail === undefined || toEmail === "") {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Resend email address is not configured",
        });
      }

      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: toEmail,
        replyTo: email,
        subject: `New contact message from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
