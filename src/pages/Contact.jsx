import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import {
  businessHours,
  contactFaqs,
  contactSupportChannels,
  salonInfo,
} from "../data/siteData";

function Contact() {
  return (
    <PageShell
      eyebrow="Contact"


      actions={
        <>
          <ActionLink href={salonInfo.whatsappHref}>Chat on WhatsApp</ActionLink>
          <ActionLink href={salonInfo.phoneHref} variant="secondary">
            Call the Salon
          </ActionLink>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[1.75rem] bg-rose-600 px-6 py-7 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-100">
            Visit Us
          </p>
          <h2 className="mt-4 text-4xl font-semibold">
            {salonInfo.neighborhood}
          </h2>
          <p className="mt-3 text-base leading-8 text-rose-50">
            {salonInfo.address}, {salonInfo.location}
          </p>

          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-100">
              Opening Hours
            </p>
            <div className="mt-4 space-y-3">
              {businessHours.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-rose-50">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <ActionLink href={salonInfo.phoneHref} variant="inverse">
              Call the Salon
            </ActionLink>
            <ActionLink href={salonInfo.whatsappHref} variant="subtle">
              Send a WhatsApp
            </ActionLink>
          </div>
        </div>

        <div className="divide-y divide-rose-100 border-y border-rose-100">
          {contactSupportChannels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="grid gap-4 py-6 sm:grid-cols-[0.8fr_1.2fr] sm:items-start"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                  {channel.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-salon-strong">
                  {channel.detail}
                </p>
              </div>
              <p className="text-sm leading-7 text-salon-copy">
                {channel.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white">
        <div className="border-b border-rose-100 px-6 py-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            Map
          </p>
          <p className="mt-2 text-sm text-salon-copy">
            Find us in {salonInfo.location}.
          </p>
        </div>
        <iframe
          title={`Map to ${salonInfo.location}`}
          src="https://www.google.com/maps?q=Dubai,+UAE&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-12 grid gap-8 border-t border-rose-100 pt-8 md:grid-cols-3">
        {contactFaqs.map((item, index) => (
          <div key={item.question}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-salon-strong">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-salon-copy">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export default Contact;
