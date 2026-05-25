import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-[#E11D48] text-white shadow-[0_12px_28px_rgba(225,29,72,0.24)] hover:bg-[#F43F5E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
  secondary:
    "border border-gold-muted/45 bg-white text-maroon-deep hover:border-gold-muted hover:bg-[#FBF3F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
  inverse:
    "bg-white text-maroon-deep hover:bg-[#FBF3F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  subtle:
    "border border-gold-light/45 bg-white/10 text-white hover:border-gold-light/70 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
};

function ActionLink({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = false,
}) {
  const variantClassName = variantClasses[variant] ?? variantClasses.primary;
  const linkClassName =
    `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${variantClassName} ${className}`.trim();
  const arrow = showArrow ? (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  ) : null;

  if (href) {
    const shouldOpenNewTab = href.startsWith("http");

    return (
      <a
        href={href}
        className={linkClassName}
        target={shouldOpenNewTab ? "_blank" : undefined}
        rel={shouldOpenNewTab ? "noreferrer" : undefined}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link to={to} className={linkClassName}>
      {children}
      {arrow}
    </Link>
  );
}

export default ActionLink;
