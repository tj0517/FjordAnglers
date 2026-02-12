"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.GUIDE_FORM_TO_EMAIL || "hello@fjordanglers.com";

export async function submitGuideForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const location = formData.get("location") as string;
  const experience = formData.get("experience") as string;
  const painPoints = formData.get("painPoints") as string;
  const features = formData.get("features") as string;

  if (!name || !email || !location || !experience) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    await resend.emails.send({
      from: "FjordAnglers <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Beta Guide: ${name} — ${location}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #0A2E4D;">New Beta Guide Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0A2E4D; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0A2E4D;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0A2E4D;">Location</td>
              <td style="padding: 8px 0;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0A2E4D;">Experience</td>
              <td style="padding: 8px 0;">${experience} years</td>
            </tr>
          </table>
          ${painPoints ? `<h3 style="color: #0A2E4D; margin-top: 24px;">Pain Points</h3><p style="color: #4B5563; white-space: pre-wrap;">${painPoints}</p>` : ""}
          ${features ? `<h3 style="color: #0A2E4D; margin-top: 24px;">Requested Features</h3><p style="color: #4B5563; white-space: pre-wrap;">${features}</p>` : ""}
        </div>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send. Please try again." };
  }
}
