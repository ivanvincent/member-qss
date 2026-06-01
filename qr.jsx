/* ============ QR CODE (real, via QRious) ============ */
function QRCode({ value, size = 220, fg = "#06141F", bg = "#ffffff" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || typeof QRious === "undefined") return;
    new QRious({ element: ref.current, value: String(value), size: size * 2, foreground: fg, background: bg, level: "H", padding: 0 });
  }, [value, size, fg, bg]);
  return <canvas ref={ref} style={{ width: size, height: size, display: "block", borderRadius: 6 }} />;
}

/* ============ MEMBER PASS QR SCREEN ============ */
function QRScreen({ user, actions, go }) {
  const tier = window.QSS.TIERS[user.tier];
  const toGo = window.QSS.STAMP_GOAL - user.stamps;
  const payload = `QSS-MEMBER|${user.memberId || "QSS-000000"}|${user.name || "Member"}|${user.plate || "-"}|${user.tier}|cap:${user.stamps}`;

  return (
    <div className="app-scroll">
      <TopBar title="Kartu Member" subtitle="QR Pass" onBack={() => go("home")} />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* pass card */}
        <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", border: "1.5px solid var(--line-strong)", background: "var(--surface)" }}>
          {/* header band */}
          <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: user.tier === "luxury" ? "var(--chrome)" : user.tier === "premium" ? "linear-gradient(135deg,#0f3a4a,#0a2734)" : "var(--surface-2)", color: user.tier === "luxury" ? "var(--chrome-ink)" : "var(--text)" }}>
            <Logo size={24} />
            <Pill tone={user.tier === "luxury" ? "chrome" : "accent"} style={user.tier === "luxury" ? { background: "rgba(27,42,54,.14)", color: "var(--chrome-ink)" } : {}}>
              <Icon name={user.tier === "premium" ? "crown" : user.tier === "luxury" ? "star" : "car"} size={14} fill={user.tier !== "basic"} /> {tier.name}
            </Pill>
          </div>
          {/* qr */}
          <div style={{ padding: "26px 18px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "#fff", padding: 16, borderRadius: 18, boxShadow: "0 12px 30px -14px rgba(0,0,0,.5)" }}>
              <QRCode value={payload} size={216} />
            </div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 900, marginTop: 18 }}>{user.name || "Member QSS"}</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dim)", letterSpacing: ".08em", marginTop: 3 }}>{user.memberId || "QSS-000000"}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Pill>{user.plate || "—"}</Pill>
              <Pill tone="accent">{user.stamps}/10 cap</Pill>
            </div>
          </div>
        </div>

        {/* instruction */}
        <div style={{ display: "flex", gap: 11, padding: 15, borderRadius: "var(--r-sm)", background: "var(--surface)", border: "1px solid var(--line)" }}>
          <Icon name="scan" size={22} style={{ color: "var(--accent)", flex: "none" }} />
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.45, fontWeight: 600 }}>
            Tunjukkan QR ini ke staf saat tiba. Staf memindai untuk <b style={{ color: "var(--text)" }}>menambah cap</b>, menukar cuci gratis, atau verifikasi membership.
          </p>
        </div>

        {/* free wash redeem */}
        {user.freeWashes > 0 && (
          <Card style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, borderColor: "var(--accent)" }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="gift" size={22} /></span>
            <div style={{ flex: 1 }}>
              <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>{user.freeWashes} cuci gratis</div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>Siap ditukar via QR</div>
            </div>
            <Button size="sm" onClick={actions.redeem}>Tukar</Button>
          </Card>
        )}

        {/* demo scan simulation */}
        <div style={{ padding: 16, borderRadius: "var(--r)", border: "1px dashed var(--line-strong)", background: "var(--surface)" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--text-mute)", letterSpacing: ".04em", marginBottom: 10 }}>SIMULASI STAF</div>
          <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--text-dim)", fontWeight: 600, lineHeight: 1.45 }}>
            {toGo > 0 ? `${toGo} cuci lagi menuju cuci gratis.` : "Kartu penuh! Cuci berikutnya gratis."} Tombol di bawah meniru pemindaian staf.
          </p>
          <Button variant="subtle" full icon="check" onClick={actions.checkIn}>Simulasikan pemindaian (+1 cap)</Button>
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

/* ============ BOOKING ENTRY QR (sheet body) ============ */
function BookingQRBody({ booking }) {
  const wash = window.QSS.WASH_TYPES.find((w) => w.id === booking.washType);
  const payload = `QSS-BOOKING|${booking.id}|${booking.dateISO}|${booking.time}|${booking.washType}`;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block", background: "#fff", padding: 16, borderRadius: 18, marginBottom: 16 }}>
        <QRCode value={payload} size={190} />
      </div>
      <div className="h-display" style={{ fontSize: 19, fontWeight: 800 }}>{wash ? wash.name : "Cuci"}</div>
      <div style={{ fontSize: 14, color: "var(--text-dim)", fontWeight: 600, marginTop: 3 }}>{fmtDate(booking.dateISO)} · {booking.time}</div>
      <p style={{ fontSize: 13.5, color: "var(--text-mute)", fontWeight: 600, margin: "16px 0 0", lineHeight: 1.45 }}>
        Pindai QR ini di gerbang masuk QSS. Bay kamu sudah disiapkan — tanpa antre.
      </p>
    </div>
  );
}

Object.assign(window, { QRCode, QRScreen, BookingQRBody });
