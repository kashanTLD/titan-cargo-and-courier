import { NextResponse } from "next/server";
import { getTransport, getFromAddress, getContactRecipients } from "@/lib/mail";

export const runtime = "nodejs";
// Allow up to 5 minutes in environments that honor this (e.g., serverless platforms)
export const maxDuration = 300;

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { firstName = "", lastName = "", email = "", phone = "", message = "" } = body || {};

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(String(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const transporter = getTransport();
    const toList = getContactRecipients();
    if (toList.length === 0) {
      return NextResponse.json({ error: "No recipients configured (set CONTACT_RECIPIENTS or SMTP_USERNAME)" }, { status: 500 });
    }

    const subject = `New contact form submission from ${firstName} ${lastName}`;
    const from = getFromAddress();

    const plain = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : undefined,
      "",
      message,
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px 0">New Contact Form Submission</h2>
        <p style="margin:0 0 6px 0"><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p style="margin:0 0 6px 0"><strong>Email:</strong> ${email}</p>
        ${phone ? `<p style="margin:0 0 12px 0"><strong>Phone:</strong> ${phone}</p>` : ""}
        <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa;white-space:pre-wrap">${String(message).replace(/</g, "&lt;")}</div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: toList,
      subject,
      text: plain,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
