/* ============ TWEAKS ============ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "midnight",
  "accent": "#19D3F3",
  "displayFont": "Archivo",
  "radius": "rounded"
}/*EDITMODE-END*/;

const ACCENTS = ["#19D3F3", "#4D8DFF", "#36E0B0", "#9B8CFF", "#FF8A5B"];
const DISPLAY_FONTS = ["Archivo", "Space Grotesk", "Plus Jakarta Sans"];

function hexToSoft(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ============ TOAST ============ */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", left: "50%", transform: "translateX(-50%)",
      zIndex: 80, background: "var(--accent)", color: "var(--accent-ink)",
      padding: "12px 18px", borderRadius: 99, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14.5,
      boxShadow: "0 14px 34px -10px var(--accent)", display: "flex", alignItems: "center", gap: 8,
      animation: "toastIn .35s cubic-bezier(.2,.9,.3,1.3) both", whiteSpace: "nowrap",
    }}>
      <Icon name="check" size={18} stroke={3} /> {msg}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translate(-50%,-14px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
    </div>
  );
}

/* ============ APP ============ */
const STORE_KEY = "qss_user_v2";

function loadUser() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return { ...window.QSS.DEFAULT_USER, ...JSON.parse(raw) };
  } catch (e) {}
  return { ...window.QSS.DEFAULT_USER };
}

const OFFICER_SESSION_KEY = "qss_officer_session_v1";

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [user, setUser] = React.useState(loadUser);
  const [screen, setScreen] = React.useState("home");
  const [toast, setToast] = React.useState("");
  const toastTimer = React.useRef(null);

  const [officerMode, setOfficerMode] = React.useState(() => {
    try { return localStorage.getItem(OFFICER_SESSION_KEY) === "1"; } catch (e) { return false; }
  });
  const [showOfficerLogin, setShowOfficerLogin] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(user)); } catch (e) {}
  }, [user]);

  const flash = (m) => {
    setToast(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  const go = (s) => { setScreen(s); document.querySelector(".app-scroll")?.scrollTo(0, 0); };

  const actions = React.useMemo(() => ({
    completeOnboarding(form) {
      setUser((u) => ({ ...u, onboarded: true, ...(form || {}) }));
      setScreen("home");
    },
    checkIn() {
      setUser((u) => {
        let stamps = u.stamps + 1;
        let freeWashes = u.freeWashes;
        let full = false;
        if (stamps >= window.QSS.STAMP_GOAL) { stamps -= window.QSS.STAMP_GOAL; freeWashes += 1; full = true; }
        const member = window.QSS.TIERS[u.tier].washesPerMonth;
        flash(full ? "Kartu penuh — +1 cuci gratis! 🎉" : "+1 cap didapat!");
        return { ...u, stamps, freeWashes, washesUsedThisMonth: member ? u.washesUsedThisMonth + 1 : u.washesUsedThisMonth };
      });
    },
    redeem() {
      setUser((u) => (u.freeWashes > 0 ? { ...u, freeWashes: u.freeWashes - 1 } : u));
      flash("Cuci gratis ditukar 🎉");
    },
    upgrade(tierId) {
      setUser((u) => ({ ...u, tier: tierId, washesUsedThisMonth: 0 }));
      flash(tierId === "basic" ? "Pindah ke Basic" : `Selamat datang di ${window.QSS.TIERS[tierId].name}!`);
    },
    addBooking(b) {
      setUser((u) => ({ ...u, bookings: [{ id: "b" + Date.now(), status: "upcoming", ...b }, ...u.bookings] }));
    },
    cancelBooking(b) {
      setUser((u) => ({ ...u, bookings: u.bookings.filter((x) => x.id !== b.id) }));
      flash("Reservasi dibatalkan");
    },
    updateUser(form) { setUser((u) => ({ ...u, ...form })); flash("Profil diperbarui"); },
    signOut() {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      setUser({ ...window.QSS.DEFAULT_USER });
      setScreen("home");
    },
    openOfficerLogin() { setShowOfficerLogin(true); },
  }), []);

  const handleOfficerLogin = () => {
    try { localStorage.setItem(OFFICER_SESSION_KEY, "1"); } catch (e) {}
    setOfficerMode(true);
    setShowOfficerLogin(false);
  };

  const handleOfficerLogout = () => {
    try { localStorage.removeItem(OFFICER_SESSION_KEY); } catch (e) {}
    setOfficerMode(false);
  };

  // apply tweaks to wrapper vars
  const wrapStyle = {
    "--accent": t.accent,
    "--accent-deep": t.accent,
    "--accent-soft": hexToSoft(t.accent, 0.14),
    "--accent-ink": "#04181f",
    "--font-display": `"${t.displayFont}", system-ui, sans-serif`,
    width: "100%", display: "flex", justifyContent: "center",
  };

  const screens = {
    home: <HomeScreen user={user} actions={actions} go={go} />,
    stamps: <StampsScreen user={user} actions={actions} go={go} />,
    book: <BookingScreen user={user} actions={actions} go={go} />,
    promos: <PromosScreen user={user} actions={actions} go={go} />,
    profile: <ProfileScreen user={user} actions={actions} go={go} />,
    tiers: <TiersScreen user={user} actions={actions} go={go} />,
    qr: <QRScreen user={user} actions={actions} go={go} />,
  };

  const navActive = ["home", "stamps", "book", "promos", "profile"].includes(screen) ? screen : "home";
  const showNav = user.onboarded && screen !== "tiers" && screen !== "qr";

  if (officerMode) {
    return (
      <div data-theme={t.theme} data-radius={t.radius} style={wrapStyle}>
        <OfficerAppShell onLogout={handleOfficerLogout} />
      </div>
    );
  }

  return (
    <div data-theme={t.theme} data-radius={t.radius} style={wrapStyle}>
      <div className="app-frame">
        {!user.onboarded
          ? <Onboarding actions={actions} />
          : <React.Fragment>
              {screens[screen]}
              {showNav && <BottomNav active={navActive} onNav={go} />}
            </React.Fragment>}
        <Toast msg={toast} />
        {showOfficerLogin && (
          <OfficerLoginSheet
            onLogin={handleOfficerLogin}
            onClose={() => setShowOfficerLogin(false)}
          />
        )}
      </div>

      <TweaksPanel>
        <TweakSection label="Tampilan" />
        <TweakRadio label="Tema" value={t.theme} options={["midnight", "aqua", "noir"]} onChange={(v) => setTweak("theme", v)} />
        <TweakColor label="Aksen" value={t.accent} options={ACCENTS} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Font & bentuk" />
        <TweakSelect label="Font judul" value={t.displayFont} options={DISPLAY_FONTS} onChange={(v) => setTweak("displayFont", v)} />
        <TweakRadio label="Sudut" value={t.radius} options={["sharp", "rounded", "pill"]} onChange={(v) => setTweak("radius", v)} />
        <TweakSection label="Demo" />
        <TweakButton label="Reset akun & data" onClick={actions.signOut} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
