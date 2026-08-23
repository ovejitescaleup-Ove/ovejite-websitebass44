import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useSiteSettings, buildWhatsAppUrl, trackEvent } from "@/hooks/useSiteSettings";

/**
 * WhatsAppButton — floating action button (desktop + mobile).
 * Shows a small tooltip bubble on first load, then collapses.
 */
export default function WhatsAppButton() {
  const { settings } = useSiteSettings();
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (!settings.whatsapp_number) return;
    const t = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(t);
  }, [settings.whatsapp_number]);

  if (!settings.whatsapp_number) return null;

  const url = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 max-w-xs animate-fade-in-up">
          <button
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center"
            onClick={() => setShowBubble(false)}
            aria-label="Close"
          >
            <X className="w-3 h-3 text-slate-600" />
          </button>
          <p className="text-sm text-slate-700 font-medium">
            Have a question? Let's chat on WhatsApp 👋
          </p>
        </div>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-green-500/30 flex items-center justify-center transition-all hover:scale-110 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="w-7 h-7 text-white relative" />
      </a>
    </div>
  );
}
