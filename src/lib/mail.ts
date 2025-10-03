import nodemailer from "nodemailer";

const required = (name: string, val: string | undefined) => {
  if (!val || val.trim() === "") throw new Error(`Missing env: ${name}`);
  return val;
};

export function getTransport() {
  // Defaults for Hostinger VPS:
  // - Host: titancargocourier.com
  // - Port 587 with STARTTLS (recommended)
  // - Port 465 with implicit SSL (secure=true)
  const host = process.env.SMTP_HOST || "titancargocourier.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465; // true for implicit SSL

  // Support both SMTP_USERNAME and SMTP_USER for compatibility
  const userEnv = process.env.SMTP_USERNAME || process.env.SMTP_USER;
  const user = required("SMTP_USERNAME|SMTP_USER", userEnv);
  const pass = required("SMTP_PASSWORD", process.env.SMTP_PASSWORD);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // For STARTTLS strictly on 587, keep secure=false and requireTLS=true to upgrade.
    requireTLS: !secure && port === 587,
    // Extended timeouts (default 2 minutes) to avoid premature ETIMEDOUT
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 120000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 120000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 120000),
    tls: {
      rejectUnauthorized: String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED || "true").toLowerCase() !== "false",
    },
    logger: String(process.env.SMTP_DEBUG || "false").toLowerCase() === "true",
    debug: String(process.env.SMTP_DEBUG || "false").toLowerCase() === "true",
  });

  return transporter;
}

export function getFromAddress() {
  // Prefer SMTP_FROM; fallback to SMTP_USER/USERNAME; then no-reply@host
  return (
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    process.env.SMTP_USERNAME ||
    `no-reply@${process.env.SMTP_HOST || "titancargocourier.com"}`
  );
}

export function getContactRecipients() {
  // Support legacy CONTACT_TO_EMAIL as alias
  const to = process.env.CONTACT_RECIPIENTS || process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || process.env.SMTP_USERNAME || "";
  return to.split(",").map(s => s.trim()).filter(Boolean);
}
