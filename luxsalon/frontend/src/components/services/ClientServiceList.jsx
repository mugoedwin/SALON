function getTagList(service) {
  if (Array.isArray(service?.tagsList) && service.tagsList.length > 0) {
    return service.tagsList;
  }

  if (typeof service?.tags === "string" && service.tags.trim()) {
    return service.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }

  return ["Clean Parting", "Neat Finish"];
}

export default function ClientServiceList({ services, onBookNow }) {
  function formatDisplayPrice(service) {
    const priceNumber = Number(service.price);
    if (Number.isFinite(priceNumber)) {
      return parseInt(service.price, 10);
    }
    return service.price;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {services.map((service) => (
        <div
          key={service.id}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(58, 13, 24, 0.02)",
            border: "1px solid #F3EDE8",
            position: "relative",
            width: "100%",
            boxSizing: "border-box",
            gap: "24px",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <img
              src={service.image_url || service.imageSrc || "https://via.placeholder.com/150"}
              alt={service.title}
              style={{
                width: "130px",
                height: "110px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#C92C4B",
                  fontSize: "11px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {service.category || "Protective Styling"}
              </span>
              <h3
                style={{
                  fontFamily: "serif",
                  fontSize: "26px",
                  color: "#3A0D18",
                  margin: "4px 0 0 0",
                  lineHeight: 1.1,
                }}
              >
                {service.title}
              </h3>
            </div>

            <p
              style={{
                color: "#70605A",
                fontSize: "14px",
                margin: "4px 0",
                maxWidth: "85%",
                lineHeight: "1.5",
              }}
            >
              {service.description}
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
              {getTagList(service).map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#FAF5F0",
                    color: "#C92C4B",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                  }}
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: "110px",
              minWidth: "150px",
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#C92C4B", fontWeight: "bold", fontSize: "18px" }}>
                {service.currency || "AED"} {formatDisplayPrice(service)}
              </div>
              <div style={{ color: "#A39590", fontSize: "13px", marginTop: "2px" }}>
                {service.duration || "3 hrs"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookNow(service)}
              style={{
                background: "#E01E43",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: "25px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(224, 30, 67, 0.2)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C92C4B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E01E43";
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
