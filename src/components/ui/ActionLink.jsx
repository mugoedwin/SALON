import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-rose-600 text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600",
  secondary:
    "border border-rose-200 bg-white text-rose-700 hover:border-rose-300 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600",
  inverse:
    "bg-white text-rose-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  subtle:
    "border border-white/35 bg-white/15 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
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
