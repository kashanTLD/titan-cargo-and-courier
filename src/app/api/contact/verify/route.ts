import { NextResponse } from "next/server";
import { getTransport } from "@/lib/mail";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET() {
  const env = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USERNAME,
    // Do not return password
  };

  try {
    const transporter = getTransport();
    const start = Date.now();
    let ok = false;
    let message = "";
    try {
      await transporter.verify();
      ok = true;
      message = "SMTP connection verified";
    } catch (e) {
      ok = false;
      message = e instanceof Error ? e.message : String(e);
    }
    const ms = Date.now() - start;

    return NextResponse.json({ ok, ms, env, message, note: "This endpoint checks connectivity and auth without sending an email." }, { status: ok ? 200 : 500 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ ok: false, error: msg, env }, { status: 500 });
  }
}
