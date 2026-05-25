import { useEffect, useState } from "react";

function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, testimonials.length]);

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[300px]" aria-live="polite">
        {testimonials.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={item.name}
              className={`absolute inset-0 flex h-full flex-col justify-between border-t-2 pt-6 transition-all duration-500 ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <div className="grid gap-5 sm:grid-cols-[56px_1fr]">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-rose-200 text-2xl text-rose-600">
                  "
                </div>
                <p className="text-2xl leading-10 text-salon-strong sm:text-[2rem]">
                  {item.review}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-5 border-t border-rose-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.avatarAlt}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold text-salon-strong">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(testimonials.length).padStart(2, "0")}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + testimonials.length) %
                          testimonials.length,
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-700 transition-colors hover:border-rose-300 hover:bg-rose-50"
                    aria-label="Show previous testimonial"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % testimonials.length)
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-700 transition-colors hover:border-rose-300 hover:bg-rose-50"
                    aria-label="Show next testimonial"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-rose-100 pt-4">
        {testimonials.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-rose-500 bg-rose-50 text-rose-700"
                  : "border-rose-100 bg-white text-salon-copy hover:border-rose-300 hover:text-rose-700"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-2">
        {testimonials.map((item, index) => (
          <button
            key={`${item.name}-dot`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show testimonial from ${item.name}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-rose-600" : "w-2.5 bg-rose-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;
