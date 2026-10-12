import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";
import { Resend } from "resend";
import { maxMessageLength, maxNameLength } from "../consts";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const server = {
  send: defineAction({
    accept: "form",

    input: z.object({
      name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(maxNameLength, `Name must be ${maxNameLength} characters or less`),
      email: z.email("Valid email required").max(254, "Valid email required"),
      message: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(
          maxMessageLength,
          `Message must be ${maxMessageLength} characters or less`,
        ),
    }),

    handler: async ({ name, email, message }) => {
      const apiKey = env.RESEND_API_KEY;
      const toEmail = env.RESEND_EMAIL_ADDRESS;

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
        // collapse newlines so the name can't break the subject line
        subject: `New contact message from ${name.replace(/\s+/g, " ")}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
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
