"use client";

import { useState } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ContactForm() {
  const landingPageData = useLandingPageData();
  const theme = landingPageData.themeData;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      let payloadBody: unknown = null;
      if (contentType.includes("application/json")) {
        payloadBody = await res.json();
      } else {
        const text = await res.text();
        payloadBody = { error: text };
      }

      if (!res.ok) {
        const message =
          typeof payloadBody === "object" && payloadBody && "error" in payloadBody
            ? String((payloadBody as { error?: unknown }).error || "Failed to send message")
            : "Failed to send message";
        throw new Error(message);
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-1000 hover:bg-white/90 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Get In Touch
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {submitError && (
          <div
            role="alert"
            className="p-3 rounded-lg border border-red-200 bg-red-50 text-red-800"
          >
            {submitError}
          </div>
        )}
        {submitSuccess && !submitError && (
          <div
            role="status"
            className="p-3 rounded-lg border border-green-200 bg-green-50 text-green-800"
          >
            Message sent successfully.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
            placeholder="Tell us about your project..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 ${
            submitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{
            background: theme
              ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
              : "#000",
          }}
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
