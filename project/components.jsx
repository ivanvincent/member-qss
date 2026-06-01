/* ============ ICONS ============ */
const ICONS = {
  home: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  stamp: "M9 5a3 3 0 0 1 6 0c0 1.5-1 2-1 3.5h-4C10 7 9 6.5 9 5ZM6 12h12v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2ZM5 20h14",
  calendar: "M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  promo: "M4 12.5 11 5.5a2 2 0 0 1 1.4-.6H18a2 2 0 0 1 2 2v5.6a2 2 0 0 1-.6 1.4l-7 7a1.8 1.8 0 0 1-2.5 0l-5.4-5.4a1.8 1.8 0 0 1 0-2.5ZM16 9h.01",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0",
  wash: "M12 3s5 5.5 5 9.5a5 5 0 0 1-10 0C7 8.5 12 3 12 3Z",
  car: "M5 13l1.5-4.2A2 2 0 0 1 8.4 7.5h7.2a2 2 0 0 1 1.9 1.3L19 13M4 13h16v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H7.5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4ZM7 16h.01M17 16h.01",
  glass: "M5 4h14l-1 9a3 3 0 0 1-3 2.6H9A3 3 0 0 1 6 13L5 4ZM4 4h16M9 20h6M12 16v4",
  interior: "M4 18v-5a8 8 0 0 1 16 0v5M4 18h16M7 18v-4M17 18v-4",
  drink: "M6 4h12l-1.2 14a1.5 1.5 0 0 1-1.5 1.4H8.7A1.5 1.5 0 0 1 7.2 18ZM5.5 8h13",
  queue: "M5 7h14M5 12h14M5 17h9",
  check: "M5 12.5 10 17.5 19.5 7",
  chevron: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  star: "M12 4l2.4 5 5.5.7-4 3.8 1 5.4-4.9-2.7L7.1 22l1-5.4-4-3.8 5.5-.7L12 4Z",
  crown: "M4 8l4 4 4-7 4 7 4-4-1.5 11H5.5L4 8ZM5.5 19h13",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z",
  clock: "M12 7v5l3.5 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  bell: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM9.5 19a2.5 2.5 0 0 0 5 0",
  edit: "M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4ZM13.5 6.5l4 4",
  gift: "M5 11h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16v3H4V8ZM12 8v12M12 8S9 8 8 6.5 9 4 12 8ZM12 8s3 0 4-1.5S15 4 12 8Z",
  sparkle: "M12 4l1.6 4.8L18 10l-4.4 1.2L12 16l-1.6-4.8L6 10l4.4-1.2L12 4ZM18 16l.7 1.8L20.5 18l-1.8.7L18 20.5l-.7-1.8L15.5 18l1.8-.5L18 16Z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 18l-6-6 6-6",
  phone: "M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L19 12l4 1.5V17a2 2 0 0 1-2 2 16 16 0 0 1-16-16 2 2 0 0 1 2-2Z",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM4 7l8 6 8-6",
  shield: "M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z",
  logout: "M9 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3M16 8l4 4-4 4M9 12h11",
  map: "M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2ZM9 4v14M15 6v14",
  info: "M12 11v5M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  qr: "M4 4h6v6H4ZM14 4h6v6h-6ZM4 14h6v6H4ZM14 14h2.5v2.5H14ZM19 14h1.5M20.5 14v2.5M14 19v1.5M16.5 20.5h1.5M20.5 19v1.5",
  scan: "M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16",
  x: "M6 6l12 12M18 6 6 18",
};

function Icon({ name, size = 22, stroke = 2, fill = false, style }) {
  const d = ICONS[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" style={{ flex: "none", ...style }}>
      {d.split("M").filter(Boolean).map((seg, i) => (
        <path key={i} d={"M" + seg} fill={fill ? "currentColor" : "none"} />
      ))}
    </svg>
  );
}

/* ============ PRIMITIVES ============ */
function Button({ children, variant = "primary", size = "md", full, icon, iconRight, onClick, disabled, style }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
    fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-.01em",
    borderRadius: "var(--r-pill)", border: "1.5px solid transparent",
    transition: "transform .12s ease, filter .15s ease, background .15s ease",
    width: full ? "100%" : "auto", cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "9px 16px", fontSize: 14, minHeight: 40 },
    md: { padding: "14px 22px", fontSize: 16, minHeight: 52 },
    lg: { padding: "17px 26px", fontSize: 18, minHeight: 58 },
  };
  const variants = {
    primary: { background: "var(--accent)", color: "var(--accent-ink)", boxShadow: "0 10px 26px -10px var(--accent)" },
    dark: { background: "var(--surface-2)", color: "var(--text)", border: "1.5px solid var(--line-strong)" },
    ghost: { background: "transparent", color: "var(--text)", border: "1.5px solid var(--line-strong)" },
    subtle: { background: "var(--accent-soft)", color: "var(--accent)" },
    chrome: { background: "var(--chrome)", color: "var(--chrome-ink)", boxShadow: "0 10px 26px -12px rgba(0,0,0,.6)" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
      {icon && <Icon name={icon} size={size === "lg" ? 22 : 19} stroke={2.4} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 22 : 19} stroke={2.4} />}
    </button>
  );
}

function Card({ children, style, onClick, glow }) {
  return (
    <div onClick={onClick}
      style={{
        background: "var(--surface)", border: "1px solid var(--line)",
        borderRadius: "var(--r)", boxShadow: glow ? "0 16px 40px -22px var(--accent)" : "none",
        ...style,
      }}>
      {children}
    </div>
  );
}

function Pill({ children, tone = "default", style }) {
  const tones = {
    default: { background: "var(--surface-2)", color: "var(--text-dim)" },
    accent: { background: "var(--accent-soft)", color: "var(--accent)" },
    chrome: { background: "var(--chrome)", color: "var(--chrome-ink)" },
    live: { background: "rgba(40,210,120,.16)", color: "#46e09a" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, fontWeight: 700, letterSpacing: ".02em",
      padding: "5px 11px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap",
      fontFamily: "var(--font-ui)", ...tones[tone], ...style,
    }}>{children}</span>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "4px 2px 12px" }}>
      <h2 className="h-display" style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{children}</h2>
      {action && (
        <button onClick={onAction} style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 3 }}>
          {action} <Icon name="chevron" size={15} stroke={2.6} />
        </button>
      )}
    </div>
  );
}

/* ============ TOP BAR ============ */
function TopBar({ title, onBack, right, subtitle }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      padding: "calc(env(safe-area-inset-top) + 16px) 18px 14px",
      background: "linear-gradient(180deg, var(--bg) 62%, transparent)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      {onBack && (
        <button onClick={onBack} aria-label="Back" style={{
          width: 42, height: 42, borderRadius: "var(--r-pill)", flex: "none",
          background: "var(--surface-2)", border: "1px solid var(--line)",
          display: "grid", placeItems: "center", color: "var(--text)",
        }}><Icon name="arrowLeft" size={20} stroke={2.4} /></button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--accent)", letterSpacing: ".04em", textTransform: "uppercase" }}>{subtitle}</div>}
        <h1 className="h-display" style={{ margin: 0, fontSize: 23, fontWeight: 800 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}

/* ============ BOTTOM NAV ============ */
function BottomNav({ active, onNav }) {
  const items = [
    { id: "home", icon: "home", label: "Beranda" },
    { id: "stamps", icon: "stamp", label: "Cap" },
    { id: "book", icon: "calendar", label: "Pesan" },
    { id: "promos", icon: "promo", label: "Promo" },
    { id: "profile", icon: "user", label: "Profil" },
  ];
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 30,
      padding: "10px 12px calc(env(safe-area-inset-bottom) + 12px)",
      background: "linear-gradient(180deg, transparent, var(--bg) 32%)",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5,1fr)",
        background: "var(--surface)", border: "1px solid var(--line-strong)",
        borderRadius: "var(--r-pill)", padding: 6,
        boxShadow: "0 14px 34px -14px rgba(0,0,0,.7)",
      }}>
        {items.map((it) => {
          const on = active === it.id;
          return (
            <button key={it.id} onClick={() => onNav(it.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "9px 0 7px", borderRadius: "var(--r-pill)",
              color: on ? "var(--accent-ink)" : "var(--text-mute)",
              background: on ? "var(--accent)" : "transparent",
              transition: "all .2s ease", minHeight: 52,
            }}>
              <Icon name={it.icon} size={21} stroke={on ? 2.6 : 2.1} fill={false} />
              <span style={{ fontSize: 10.5, fontWeight: 700, fontFamily: "var(--font-ui)" }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============ FIELD ============ */
function Field({ label, icon, value, onChange, placeholder, type = "text", inputMode, autoFocus }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 7px 4px" }}>{label}</span>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--surface)", border: "1.5px solid var(--line)",
        borderRadius: "var(--r-sm)", padding: "0 14px", transition: "border .15s",
      }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}>
        {icon && <Icon name={icon} size={19} style={{ color: "var(--text-mute)" }} />}
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          type={type} inputMode={inputMode} autoFocus={autoFocus}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "var(--text)", fontSize: 16, fontWeight: 600, padding: "15px 0", minWidth: 0,
          }} />
      </div>
    </label>
  );
}

/* ============ SHEET / MODAL ============ */
function Sheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 60,
      background: "rgba(2,8,13,.62)", backdropFilter: "blur(3px)",
      display: "flex", alignItems: "flex-end",
      animation: "fadeIn .2s ease both",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", background: "var(--surface)",
        borderTopLeftRadius: "var(--r-lg)", borderTopRightRadius: "var(--r-lg)",
        borderTop: "1px solid var(--line-strong)",
        padding: "12px 18px calc(env(safe-area-inset-bottom) + 22px)",
        animation: "sheetUp .34s cubic-bezier(.2,.9,.3,1.1) both", maxHeight: "88%", overflowY: "auto",
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 99, background: "var(--line-strong)", margin: "2px auto 16px" }} />
        {title && <h2 className="h-display" style={{ margin: "0 0 14px", fontSize: 22 }}>{title}</h2>}
        {children}
      </div>
      <style>{`@keyframes sheetUp{from{transform:translateY(100%)}to{transform:none}}`}</style>
    </div>
  );
}

Object.assign(window, { Icon, Button, Card, Pill, SectionTitle, TopBar, BottomNav, Field, Sheet });
