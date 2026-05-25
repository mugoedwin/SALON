function PageShell({ eyebrow, title, description, actions, children }) {
  return (
    <section className="px-4 pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-rose-100 pb-8 sm:pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-rose-300" />
                {eyebrow ? <p className="eyebrow-label">{eyebrow}</p> : null}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-salon-strong sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-5 max-w-2xl text-base leading-8 text-salon-copy sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>

            {actions ? (
              <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
            ) : null}
          </div>
        </div>

        {children ? <div className="mt-8 sm:mt-10">{children}</div> : null}
      </div>
    </section>
  );
}

export default PageShell;
