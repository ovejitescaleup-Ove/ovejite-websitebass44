import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/useSiteSettings";

/**
 * CTAButton — primary conversion button with gradient + click tracking.
 * Variants: "primary" (orange→coral), "secondary" (purple border ghost),
 * "dark" (navy), "whatsapp" (green), "white".
 */
const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "text-white bg-gradient-to-r from-[#FF4D00] to-[#FF8E72] shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5",
  secondary:
    "text-slate-900 border-2 border-[#7C3AED]/40 bg-white hover:bg-[#7C3AED]/5 hover:border-[#7C3AED]",
  dark:
    "text-white bg-slate-900 hover:bg-slate-800 shadow-lg hover:-translate-y-0.5",
  whatsapp:
    "text-white bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-green-500/25 hover:-translate-y-0.5",
  white:
    "text-slate-900 bg-white hover:bg-slate-50 shadow-lg hover:-translate-y-0.5",
  ghostLight:
    "text-white border-2 border-white/30 hover:bg-white/10",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-8 py-4 text-base",
};

export default function CTAButton({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  eventName,
  eventParams,
  className = "",
  ...rest
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`;

  const handleClick = (e) => {
    if (eventName) trackEvent(eventName, eventParams || {});
    if (onClick) onClick(e);
  };

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={classes} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}
