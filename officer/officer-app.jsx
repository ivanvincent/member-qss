/* ============ LOGO (inline — officer app doesn't load onboarding.jsx) ============ */
function Logo({ size = 30, stacked }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: size, height: size, borderRadius: size * 0.32, flex: "none", background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", boxShadow: "0 8px 20px -8px var(--accent)" }}>
        <Icon name="wash" size={size * 0.62} stroke={2.6} fill />
      </span>
      <div style={{ lineHeight: 1 }}>
        <span className="h-display" style={{ fontSize: size * 0.62, fontWeight: 900, letterSpacing: "-.03em" }}>QSS</span>
        {stacked && <div style={{ fontSize: size * 0.3, fontWeight: 700, color: "var(--text-mute)", letterSpacing: ".22em", marginTop: 2 }}>CAR WASH</div>}
      </div>
    </div>
  );
}

/* ============ LOGIN ============ */
function LoginScreen({ onLogin }) {
  const [pin, setPin] = React.useState("");
  const [shake, setShake] = React.useState(false);

  const tryPin = (p) => {
    if (p === window.QSS_OFFICER.OFFICER_PIN) {
      onLogin();
    } else {
      setShake(true);
      setTimeout(() => { setPin(""); setShake(false); }, 700);
    }
  };

  const press = (k) => {
    if (shake) return;
    if (k === "del") { setPin((p) => p.slice(0, -1)); return; }
    const next = pin + k;
    setPin(next);
    if (next.length === 4) setTimeout(() => tryPin(next), 120);
  };

  return (
    <div className="app-scroll no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", minHeight: "100%" }}>
      <Logo size={36} stacked />
      <div style={{ marginTop: 30, textAlign: "center", marginBottom: 32 }}>
        <h1 className="h-display" style={{ fontSize: 26, fontWeight: 900, margin: "0 0 6px" }}>Panel Petugas</h1>
        <p style={{ fontSize: 14.5, color: "var(--text-dim)", fontWeight: 500, margin: 0 }}>Masukkan PIN 4 digit untuk lanjut</p>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: shake ? 8 : 24, transition: "transform .1s", transform: shake ? "translateX(6px)" : "none" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: 17, height: 17, borderRadius: "50%",
            background: i < pin.length ? (shake ? "#ff6b6b" : "var(--accent)") : "var(--surface-2)",
            border: `2px solid ${i < pin.length ? (shake ? "#ff6b6b" : "var(--accent)") : "var(--line-strong)"}`,
            transition: "all .15s",
          }} />
        ))}
      </div>
      {shake && <div style={{ fontSize: 13, color: "#ff6b6b", fontWeight: 700, marginBottom: 16 }}>PIN salah</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 11, width: "100%", maxWidth: 276 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((k, i) => (
          <button key={i} onClick={() => k !== null && press(String(k))} style={{
            height: 62, borderRadius: "var(--r)", fontFamily: "var(--font-display)", fontSize: k === "del" ? 20 : 26, fontWeight: 700,
            background: k === null ? "transparent" : "var(--surface)", border: k === null ? "none" : "1px solid var(--line)",
            color: "var(--text)", cursor: k === null ? "default" : "pointer",
          }}>
            {k === "del" ? "⌫" : k === null ? "" : k}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 22, fontSize: 13, color: "var(--text-mute)", fontWeight: 600 }}>PIN default: 1234</div>
    </div>
  );
}

/* ============ BOTTOM NAV ============ */
function OfficerNav({ active, onNav, checkinBadge }) {
  const items = [
    { id: "dashboard", icon: "home", label: "Dasbor" },
    { id: "checkin", icon: "scan", label: "Check-in" },
    { id: "bookings", icon: "calendar", label: "Booking" },
    { id: "queue", icon: "clock", label: "Antrean" },
    { id: "announce", icon: "bell", label: "Umumkan" },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 30, padding: "10px 12px calc(env(safe-area-inset-bottom) + 12px)", background: "linear-gradient(180deg, transparent, var(--bg) 32%)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: "var(--r-pill)", padding: 6, boxShadow: "0 14px 34px -14px rgba(0,0,0,.7)" }}>
        {items.map((it) => {
          const on = active === it.id;
          return (
            <button key={it.id} onClick={() => onNav(it.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "9px 0 7px", borderRadius: "var(--r-pill)", color: on ? "var(--accent-ink)" : "var(--text-mute)", background: on ? "var(--accent)" : "transparent", transition: "all .2s ease", minHeight: 52, position: "relative" }}>
              <Icon name={it.icon} size={21} stroke={on ? 2.6 : 2.1} />
              <span style={{ fontSize: 10.5, fontWeight: 700, fontFamily: "var(--font-ui)" }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============ TOAST ============ */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", left: "50%", transform: "translateX(-50%)", zIndex: 80, background: "var(--accent)", color: "var(--accent-ink)", padding: "12px 18px", borderRadius: 99, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14.5, boxShadow: "0 14px 34px -10px var(--accent)", display: "flex", alignItems: "center", gap: 8, animation: "toastIn .35s cubic-bezier(.2,.9,.3,1.3) both", whiteSpace: "nowrap" }}>
      <Icon name="check" size={18} stroke={3} /> {msg}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translate(-50%,-14px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
    </div>
  );
}

/* ============ APP ============ */
const SESSION_KEY = "qss_officer_session_v1";

function OfficerApp() {
  const [loggedIn, setLoggedIn] = React.useState(() => {
    try { return localStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
  });
  const [screen, setScreen] = React.useState("dashboard");
  const [bookings, setBookings] = React.useState(() => window.QSS_OFFICER.buildTodayBookings());
  const [queue, setQueue] = React.useState(() => window.QSS_OFFICER.loadQueue());
  const [announcements, setAnnouncements] = React.useState(() => window.QSS_OFFICER.loadAnnouncements());
  const [checkinLog, setCheckinLog] = React.useState(() => window.QSS_OFFICER.loadCheckinLog());
  const [toast, setToast] = React.useState("");
  const toastRef = React.useRef(null);

  const flash = (m) => { setToast(m); clearTimeout(toastRef.current); toastRef.current = setTimeout(() => setToast(""), 2200); };

  const login = () => {
    try { localStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
    setLoggedIn(true);
  };

  const go = (s) => { setScreen(s); document.querySelector(".app-scroll")?.scrollTo(0, 0); };

  const handleCheckin = (log) => {
    setCheckinLog((prev) => [log, ...prev]);
    flash(`Check-in: ${log.customerName} · +1 cap`);
  };

  const handleSetBookings = (updated) => setBookings(updated);
  const handleSetQueue = (updated) => setQueue(updated);
  const handleSetAnnouncements = (updated) => setAnnouncements(updated);

  const screens = {
    dashboard: <DashboardScreen bookings={bookings} checkinLog={checkinLog} queue={queue} announcements={announcements} />,
    checkin: <CheckInScreen onCheckin={handleCheckin} />,
    bookings: <BookingsScreen bookings={bookings} setBookings={handleSetBookings} />,
    queue: <QueueScreen queue={queue} setQueue={handleSetQueue} />,
    announce: <AnnouncementsScreen announcements={announcements} setAnnouncements={handleSetAnnouncements} />,
  };

  return (
    <div data-theme="midnight" data-radius="rounded" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="app-frame">
        {!loggedIn
          ? <LoginScreen onLogin={login} />
          : <>
              {screens[screen] || screens.dashboard}
              <OfficerNav active={screen} onNav={go} />
            </>
        }
        <Toast msg={toast} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<OfficerApp />);
