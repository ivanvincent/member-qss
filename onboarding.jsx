/* ============ LOGO ============ */
function Logo({ size = 30, stacked }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{
        width: size, height: size, borderRadius: size * 0.32, flex: "none",
        background: "var(--accent)", color: "var(--accent-ink)",
        display: "grid", placeItems: "center", boxShadow: "0 8px 20px -8px var(--accent)",
      }}><Icon name="wash" size={size * 0.62} stroke={2.6} fill /></span>
      <div style={{ lineHeight: 1 }}>
        <span className="h-display" style={{ fontSize: size * 0.62, fontWeight: 900, letterSpacing: "-.03em" }}>QSS</span>
        {stacked && <div style={{ fontSize: size * 0.3, fontWeight: 700, color: "var(--text-mute)", letterSpacing: ".22em", marginTop: 2 }}>CAR WASH</div>}
      </div>
    </div>
  );
}

/* ============ ONBOARDING ============ */
function Onboarding({ actions }) {
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({ name: "", phone: "", email: "", plate: "", carModel: "", carColor: "Silver" });
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const colors = ["Putih", "Silver", "Hitam", "Abu-abu", "Merah", "Biru", "Lainnya"];

  const canNext = step === 1 ? f.name.trim() && f.phone.trim() : step === 2 ? f.plate.trim() && f.carModel.trim() : true;
  const total = 2;

  const finish = () => actions.completeOnboarding(f);

  // WELCOME
  if (step === 0) {
    return (
      <div className="app-scroll no-nav" style={{ display: "flex", flexDirection: "column", padding: "0 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 26, paddingTop: 40 }}>
          <Logo size={40} stacked />
          <div style={{ marginTop: 8 }}>
            <h1 className="h-display" style={{ margin: 0, fontSize: 46, fontWeight: 900, lineHeight: .98, letterSpacing: "-.03em" }}>
              Tanpa<br />antre.<br /><span style={{ color: "var(--accent)" }}>Kumpulkan<br />cap.</span>
            </h1>
            <p style={{ margin: "18px 0 0", fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.5, maxWidth: 320, fontWeight: 500 }}>
              Pesan slot cuci, dapat 1 cuci gratis tiap 10 kunjungan, dan buka perk member di QSS Car Wash.
            </p>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {[["calendar", "Tanpa antre"], ["stamp", "Cuci gratis"], ["crown", "Perk member"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "var(--text-dim)" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name={ic} size={17} /></span>{t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)", display: "flex", flexDirection: "column", gap: 12 }}>
          <Button size="lg" full iconRight="arrowRight" onClick={() => setStep(1)}>Jadi member</Button>
          <button onClick={() => actions.completeOnboarding(null)} style={{ color: "var(--text-dim)", fontWeight: 700, fontSize: 14.5, padding: 8 }}>Saya sudah punya akun</button>
          <button onClick={() => actions.openOfficerLogin && actions.openOfficerLogin()} style={{ color: "var(--text-mute)", fontWeight: 600, fontSize: 13, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="shield" size={14} /> Masuk sebagai petugas
          </button>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (step === 3) {
    return (
      <div className="app-scroll no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
        <div className="pop-in" style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", boxShadow: "0 20px 50px -16px var(--accent)" }}>
          <Icon name="check" size={52} stroke={3} />
        </div>
        <h1 className="h-display" style={{ fontSize: 32, fontWeight: 900, margin: "26px 0 8px" }}>Halo, {f.name.split(" ")[0] || "driver"}!</h1>
        <p style={{ fontSize: 16, color: "var(--text-dim)", margin: "0 0 8px", lineHeight: 1.5, maxWidth: 300 }}>
          Membership QSS kamu siap. Kamu di paket <b style={{ color: "var(--text)" }}>Basic</b> — mulai kumpulkan cap hari ini.
        </p>
        <div style={{ width: "100%", maxWidth: 320, marginTop: 24 }}>
          <Button size="lg" full iconRight="arrowRight" onClick={finish}>Masuk ke aplikasi</Button>
        </div>
      </div>
    );
  }

  // FORM STEPS
  return (
    <div className="app-scroll no-nav" style={{ display: "flex", flexDirection: "column", padding: "0 22px" }}>
      <div style={{ padding: "calc(env(safe-area-inset-top) + 16px) 0 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setStep(step - 1)} style={{ width: 42, height: 42, borderRadius: 99, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--text)" }}><Icon name="arrowLeft" size={20} stroke={2.4} /></button>
        <div style={{ flex: 1, display: "flex", gap: 6 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 99, background: i < step ? "var(--accent)" : "var(--surface-2)", transition: "background .3s" }} />
          ))}
        </div>
      </div>

      <div key={step} style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: ".06em" }}>LANGKAH {step} DARI {total}</div>
        <h1 className="h-display" style={{ fontSize: 30, fontWeight: 900, margin: "6px 0 4px", letterSpacing: "-.02em" }}>
          {step === 1 ? "Data kamu" : "Mobil kamu"}
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--text-dim)", margin: "0 0 24px", fontWeight: 500 }}>
          {step === 1 ? "Supaya kami bisa menyesuaikan cucian dan perk kamu." : "Kami siapkan tempat saat kamu tiba."}
        </p>

        {step === 1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Nama lengkap" icon="user" value={f.name} onChange={set("name")} placeholder="mis. Andini Putri" autoFocus />
            <Field label="Nomor HP" icon="phone" value={f.phone} onChange={set("phone")} placeholder="08xx xxxx xxxx" type="tel" inputMode="tel" />
            <Field label="Email" icon="mail" value={f.email} onChange={set("email")} placeholder="kamu@email.com" type="email" inputMode="email" />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Pelat nomor" icon="car" value={f.plate} onChange={(v) => set("plate")(v.toUpperCase())} placeholder="B 1234 ABC" autoFocus />
            <Field label="Model mobil" icon="car" value={f.carModel} onChange={set("carModel")} placeholder="mis. Toyota Avanza" />
            <div>
              <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 9px 4px" }}>Warna</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {colors.map((c) => {
                  const on = f.carColor === c;
                  return (
                    <button key={c} onClick={() => set("carColor")(c)} style={{
                      padding: "10px 16px", borderRadius: 99, fontWeight: 700, fontSize: 14,
                      background: on ? "var(--accent)" : "var(--surface)", color: on ? "var(--accent-ink)" : "var(--text-dim)",
                      border: `1.5px solid ${on ? "var(--accent)" : "var(--line)"}`, minHeight: 44,
                    }}>{c}</button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 22px)", paddingTop: 16 }}>
        <Button size="lg" full iconRight="arrowRight" disabled={!canNext} onClick={() => setStep(step + 1)}>
          {step === total ? "Buat akun" : "Lanjut"}
        </Button>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, Onboarding });
