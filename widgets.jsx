/* ============ STAMP GRID ============ */
function StampGrid({ stamps, goal = 10, compact }) {
  const cells = Array.from({ length: goal });
  const size = compact ? 44 : 56;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(5,1fr)",
      gap: compact ? 9 : 12,
    }}>
      {cells.map((_, i) => {
        const filled = i < stamps;
        const isNext = i === stamps;
        return (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: "50%",
            display: "grid", placeItems: "center", position: "relative",
            background: filled ? "var(--accent)" : "var(--surface-2)",
            border: filled ? "none" : isNext ? "2px dashed var(--accent)" : "1.5px solid var(--line)",
            color: filled ? "var(--accent-ink)" : isNext ? "var(--accent)" : "var(--text-mute)",
            boxShadow: filled ? "0 6px 16px -8px var(--accent)" : "none",
            animation: filled ? `popIn .3s ${i * 0.03}s cubic-bezier(.2,.9,.3,1.4) both` : "none",
            transition: "all .2s",
          }}>
            {filled
              ? <Icon name="wash" size={compact ? 19 : 24} stroke={2.4} fill />
              : <span className="mono" style={{ fontSize: compact ? 14 : 17, fontWeight: 800 }}>{i + 1}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ============ TIER CARD ============ */
function tierStyle(accent) {
  if (accent === "chrome") return { bg: "var(--chrome)", ink: "var(--chrome-ink)", sub: "rgba(27,42,54,.7)", line: "rgba(27,42,54,.18)" };
  if (accent === "aqua") return { bg: "linear-gradient(150deg,#0f3a4a,#0a2734 60%,#093142)", ink: "var(--text)", sub: "var(--text-dim)", line: "rgba(25,211,243,.3)", glow: true };
  return { bg: "var(--surface)", ink: "var(--text)", sub: "var(--text-dim)", line: "var(--line)" };
}

function TierCard({ tier, current, onSelect, compact }) {
  const s = tierStyle(tier.accent);
  const isAqua = tier.accent === "aqua";
  const isChrome = tier.accent === "chrome";
  return (
    <div style={{
      position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden",
      background: s.bg, color: s.ink,
      border: `1.5px solid ${isAqua ? "var(--accent)" : s.line}`,
      padding: compact ? 18 : 22,
      boxShadow: isAqua ? "0 18px 50px -24px var(--accent)" : isChrome ? "0 18px 44px -24px rgba(0,0,0,.6)" : "none",
    }}>
      {isChrome && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 38%,rgba(255,255,255,.55) 48%,transparent 58%)", pointerEvents: "none" }} />}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <Icon name={tier.id === "premium" ? "crown" : tier.id === "luxury" ? "star" : "car"} size={22} stroke={2.3} fill={tier.id !== "basic"} />
        <span className="h-display" style={{ fontSize: 25, fontWeight: 900, letterSpacing: "-.02em" }}>{tier.name}</span>
        {current && <Pill tone={isChrome ? "chrome" : "accent"} style={isChrome ? { background: "rgba(27,42,54,.14)", color: "var(--chrome-ink)" } : {}}>YOUR PLAN</Pill>}
      </div>
      <div style={{ position: "relative", fontSize: 13.5, fontWeight: 600, color: s.sub, marginBottom: 14 }}>{tier.tagline}</div>

      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 4, marginBottom: compact ? 14 : 18 }}>
        <span className="h-display" style={{ fontSize: 28, fontWeight: 900 }}>{tier.priceLabel}</span>
        {tier.period && <span style={{ fontSize: 14, fontWeight: 700, color: s.sub }}>{tier.period}</span>}
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, marginBottom: onSelect ? 18 : 0 }}>
        {tier.perks.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{
              width: 26, height: 26, borderRadius: 8, flex: "none", display: "grid", placeItems: "center",
              background: isChrome ? "rgba(27,42,54,.1)" : isAqua ? "var(--accent-soft)" : "var(--surface-2)",
              color: isChrome ? "var(--chrome-ink)" : "var(--accent)",
            }}><Icon name={p.icon} size={16} stroke={2.2} /></span>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, paddingTop: 3 }}>{p.text}</span>
          </div>
        ))}
      </div>

      {onSelect && (
        <div style={{ position: "relative" }}>
          {current
            ? <Button variant={isChrome ? "dark" : "ghost"} full disabled style={isChrome ? { background: "rgba(27,42,54,.12)", color: "var(--chrome-ink)", border: "none" } : {}}>Current plan</Button>
            : <Button variant={isChrome ? "dark" : isAqua ? "primary" : "subtle"} full iconRight="arrowRight"
                onClick={() => onSelect(tier)}
                style={isChrome ? { background: "var(--chrome-ink)", color: "#eef3f6" } : {}}>
                {tier.id === "basic" ? "Downgrade" : "Choose " + tier.name}
              </Button>}
        </div>
      )}
    </div>
  );
}

/* ============ PROMO CARD ============ */
function PromoCard({ promo, onOpen }) {
  const h = promo.hue;
  return (
    <div onClick={() => onOpen && onOpen(promo)} style={{
      borderRadius: "var(--r)", overflow: "hidden", cursor: "pointer",
      border: "1px solid var(--line)", background: "var(--surface)",
    }}>
      <div style={{
        position: "relative", height: 118, padding: 16,
        background: `linear-gradient(135deg, oklch(0.55 0.15 ${h}), oklch(0.4 0.12 ${h + 20}))`,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: .5, background: "repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 2px, transparent 2px 13px)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Pill style={{ background: "rgba(0,0,0,.28)", color: "#fff" }}>{promo.badge}</Pill>
          <span className="h-display" style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,.85)", letterSpacing: ".08em" }}>{promo.month}</span>
        </div>
        <span style={{ position: "relative", alignSelf: "flex-start", background: "#fff", color: "#10202c", fontWeight: 800, fontSize: 12.5, padding: "5px 11px", borderRadius: 99, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>{promo.tag}</span>
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 className="h-display" style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>{promo.title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.45 }}>{promo.desc}</p>
      </div>
    </div>
  );
}

/* ============ BOOKING CARD ============ */
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", month: "short", day: "numeric" });
}
function BookingCard({ booking, onCancel, onQR, compact }) {
  const wash = window.QSS.WASH_TYPES.find((w) => w.id === booking.washType);
  return (
    <Card style={{ padding: 16, position: "relative", overflow: "hidden" }} glow>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: "var(--accent)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Pill tone="live"><span style={{ width: 7, height: 7, borderRadius: 99, background: "#46e09a" }} /> Slot dipesan</Pill>
        <span style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 600 }}>Ditahan 15 mnt</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ textAlign: "center", background: "var(--surface-2)", borderRadius: "var(--r-sm)", padding: "10px 14px", minWidth: 64 }}>
          <div className="h-display" style={{ fontSize: 26, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{booking.time}</div>
          <div style={{ fontSize: 11, color: "var(--text-mute)", fontWeight: 700, marginTop: 3 }}>{wash ? wash.mins + " mnt" : ""}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="h-display" style={{ fontSize: 17, fontWeight: 800 }}>{wash ? wash.name : "Wash"}</div>
          <div style={{ fontSize: 13.5, color: "var(--text-dim)", fontWeight: 600, marginTop: 2 }}>{fmtDate(booking.dateISO)}</div>
        </div>
      </div>
      {!compact && (onQR || onCancel) && (
        <div style={{ marginTop: 14, display: "flex", gap: 9 }}>
          {onQR && (
            <button onClick={() => onQR(booking)} style={{ flex: 1, padding: "11px", borderRadius: "var(--r-sm)", background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 800, fontSize: 13.5, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "var(--font-display)" }}>
              <Icon name="qr" size={17} stroke={2.2} /> QR masuk
            </button>
          )}
          {onCancel && (
            <button onClick={() => onCancel(booking)} style={{ flex: 1, padding: "11px", borderRadius: "var(--r-sm)", background: "var(--surface-2)", color: "var(--text-dim)", fontWeight: 700, fontSize: 13.5, border: "1px solid var(--line)" }}>
              Batalkan
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

Object.assign(window, { StampGrid, TierCard, tierStyle, PromoCard, BookingCard, fmtDate });
