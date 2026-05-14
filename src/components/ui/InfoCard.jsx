const toneClasses = {
  default: "luxury-card text-salon-strong",
  accent:
    "border border-rose-200 bg-rose-600 text-white",
  muted:
    "border border-rose-100 bg-rose-50/70 text-salon-strong",
};

const paddingClasses = {
  default: "p-5 sm:p-7",
  none: "p-0",
};

const badgeClasses = {
  default: "bg-rose-50 text-rose-600",
  accent: "bg-white/15 text-white",
  muted: "bg-white text-rose-700",
};

function InfoCard({
  title,
  description,
  badge,
  footer,
  children,
  className = "",
  tone = "default",
  padding = "default",
}) {
  const toneClassName = toneClasses[tone] ?? toneClasses.default;
  const paddingClassName = paddingClasses[padding] ?? paddingClasses.default;
  const descriptionClassName =
    tone === "accent" ? "text-rose-50" : "text-salon-copy";

  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] ${toneClassName} ${paddingClassName} ${className}`.trim()}
    >
      {title || description || badge ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
            {description ? (
              <p className={`mt-3 leading-7 ${descriptionClassName}`}>{description}</p>
            ) : null}
          </div>

          {badge ? (
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${badgeClasses[tone] ?? badgeClasses.default}`}
            >
              {badge}
            </span>
          ) : null}
        </div>
      ) : null}

      {children ? (
        <div className={title || description || badge ? "mt-5" : ""}>{children}</div>
      ) : null}

      {footer ? <div className="mt-6">{footer}</div> : null}
    </div>
  );
}

export default InfoCard;
