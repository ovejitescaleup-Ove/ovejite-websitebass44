import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import CTAButton from "./CTAButton";
import { trackEvent } from "@/hooks/useSiteSettings";

const BUDGETS = ["Under $1k/mo", "$1k–$5k/mo", "$5k–$10k/mo", "$10k–$25k/mo", "$25k+/mo"];
const SERVICES = [
  "Google Ads Management", "Meta Ads", "E-commerce Growth", "Conversion Tracking",
  "GA4 & GTM Setup", "Server-Side Tracking", "Landing Page Optimization", "Growth Strategy", "Not sure yet",
];

export default function ContactForm({ source = "contact_page", compact = false }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", website: "",
    budget: "", service_interest: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [honeypot, setHoneypot] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Tell me what you need help with";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot) { setStatus("success"); return; } // bot trap — silently pretend success
    setStatus("submitting");
    try {
      await base44.entities.Lead.create({ ...form, source });
      trackEvent("contact_form_submit", { service_interest: form.service_interest, source });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-6 bg-green-50 rounded-3xl border border-green-100">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message sent!</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Thanks for reaching out. I'll get back to you within 24 hours to discuss your marketing goals.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", company: "", website: "", budget: "", service_interest: "", message: "" }); }}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-5`}>
        <Field label="Name" error={errors.name} required>
          <input
            type="text" value={form.name} onChange={handleChange("name")}
            className={inputClass(errors.name)} placeholder="John Doe"
          />
        </Field>
        <Field label="Email" error={errors.email} required>
          <input
            type="email" value={form.email} onChange={handleChange("email")}
            className={inputClass(errors.email)} placeholder="john@company.com"
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel" value={form.phone} onChange={handleChange("phone")}
            className={inputClass(errors.phone)} placeholder="+1 555 000 0000"
          />
        </Field>
        <Field label="Company" error={errors.company}>
          <input
            type="text" value={form.company} onChange={handleChange("company")}
            className={inputClass(errors.company)} placeholder="Your company"
          />
        </Field>
        <Field label="Website" error={errors.website}>
          <input
            type="text" value={form.website} onChange={handleChange("website")}
            className={inputClass(errors.website)} placeholder="https://yourwebsite.com"
          />
        </Field>
        <Field label="Monthly Ad Budget" error={errors.budget}>
          <select value={form.budget} onChange={handleChange("budget")} className={inputClass(errors.budget)}>
            <option value="">Select range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Service Interested In" error={errors.service_interest}>
        <select value={form.service_interest} onChange={handleChange("service_interest")} className={inputClass(errors.service_interest)}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="Message" error={errors.message} required>
        <textarea
          value={form.message} onChange={handleChange("message")} rows={4}
          className={inputClass(errors.message)} placeholder="Tell me about your business and what you'd like to achieve..."
        />
      </Field>

      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label>Leave this field empty
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4" />
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <CTAButton type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-5 h-5" /> Send Message</>
        )}
      </CTAButton>
      <p className="text-xs text-center text-slate-400">
        Your information is private and will never be shared.
      </p>
    </form>
  );
}

function Field({ label, error, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
    error ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-primary"
  }`;
}
