import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const resendEmail = import.meta.env.RESEND_EMAIL_ADDRESS;

export const server = {
  send: defineAction({
    accept: "form",

    input: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email required"),
      message: z.string().min(1, "Message is required"),
    }),

    handler: async ({ name, email, message }) => {
      const { data, error } = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: resendEmail,
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
