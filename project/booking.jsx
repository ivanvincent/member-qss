/* ============ BOOKING ============ */
function BookingScreen({ user, actions, go }) {
  const tier = window.QSS.TIERS[user.tier];
  const days = React.useMemo(() => window.QSS.buildDays(), []);
  const slots = React.useMemo(() => window.QSS.buildSlots(), []);
  const [washType, setWashType] = React.useState("premium");
  const [dayISO, setDayISO] = React.useState(days[2].iso);
  const [time, setTime] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [qr, setQr] = React.useState(null);

  // UPSELL for non-booking tiers
  if (!tier.booking) {
    return (
      <div className="app-scroll">
        <TopBar title="Booking" subtitle="Khusus member" />
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 18 }}>
          <Card style={{ padding: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 180, height: 180, borderRadius: "50%", background: "var(--accent-soft)" }} />
            <span style={{ position: "relative", width: 72, height: 72, borderRadius: 22, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", margin: "6px auto 16px" }}><Icon name="lock" size={34} /></span>
            <h2 className="h-display" style={{ position: "relative", margin: "0 0 8px", fontSize: 24, fontWeight: 900 }}>Booking khusus member</h2>
            <p style={{ position: "relative", margin: "0 auto", fontSize: 15, color: "var(--text-dim)", lineHeight: 1.5, maxWidth: 290, fontWeight: 500 }}>
              Di paket Basic kamu ikut antrean reguler. Upgrade ke <b style={{ color: "var(--text)" }}>Luxury</b> atau <b style={{ color: "var(--text)" }}>Premium</b> untuk pesan slot dan lewati antrean.
            </p>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["luxury", "premium"].map((id) => {
              const t = window.QSS.TIERS[id];
              return (
                <Card key={id} onClick={() => go("tiers")} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: id === "luxury" ? "var(--chrome)" : "var(--accent-soft)", color: id === "luxury" ? "var(--chrome-ink)" : "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={id === "premium" ? "crown" : "star"} size={22} fill /></span>
                  <div style={{ flex: 1 }}>
                    <div className="h-display" style={{ fontSize: 17, fontWeight: 800 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>{t.priceLabel}{t.period} · termasuk booking</div>
                  </div>
                  <Icon name="chevron" size={20} style={{ color: "var(--text-mute)" }} />
                </Card>
              );
            })}
          </div>
          <Button size="lg" full icon="crown" onClick={() => go("tiers")}>Lihat paket membership</Button>
        </div>
      </div>
    );
  }

  const selectedDay = days.find((d) => d.iso === dayISO);
  const wash = window.QSS.WASH_TYPES.find((w) => w.id === washType);
  const confirm = () => { actions.addBooking({ dateISO: dayISO, time, washType }); setDone(true); setTime(null); };

  return (
    <div className="app-scroll">
      <TopBar title="Pesan slot" subtitle="Tanpa antre" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 22 }}>
        {/* existing bookings */}
        {user.bookings.filter((b) => b.status === "upcoming").length > 0 && (
          <div>
            <SectionTitle>Reservasi kamu</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {user.bookings.filter((b) => b.status === "upcoming").map((b) => (
                <BookingCard key={b.id} booking={b} onCancel={actions.cancelBooking} onQR={setQr} />
              ))}
            </div>
          </div>
        )}

        {/* wash type */}
        <div>
          <SectionTitle>Pilih cucian</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {window.QSS.WASH_TYPES.map((w) => {
              const on = washType === w.id;
              return (
                <button key={w.id} onClick={() => setWashType(w.id)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: 15, borderRadius: "var(--r)", textAlign: "left",
                  background: on ? "var(--accent-soft)" : "var(--surface)", border: `1.5px solid ${on ? "var(--accent)" : "var(--line)"}`, color: "var(--text)",
                }}>
                  <span style={{ width: 22, height: 22, borderRadius: 99, border: `2px solid ${on ? "var(--accent)" : "var(--line-strong)"}`, display: "grid", placeItems: "center", flex: "none" }}>
                    {on && <span style={{ width: 11, height: 11, borderRadius: 99, background: "var(--accent)" }} />}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>{w.name} <span style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 700 }}>· {w.mins} mnt</span></div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>{w.desc}</div>
                  </div>
                  <span className="h-display" style={{ fontSize: 14.5, fontWeight: 800, color: on ? "var(--accent)" : "var(--text-dim)" }}>{w.priceLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* date strip */}
        <div>
          <SectionTitle>Pilih hari</SectionTitle>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, margin: "0 -18px", padding: "0 18px 4px" }}>
            {days.map((d) => {
              const on = d.iso === dayISO;
              return (
                <button key={d.iso} onClick={() => { setDayISO(d.iso); setTime(null); }} style={{
                  flex: "none", width: 58, padding: "12px 0", borderRadius: "var(--r-sm)", textAlign: "center",
                  background: on ? "var(--accent)" : "var(--surface)", color: on ? "var(--accent-ink)" : "var(--text)",
                  border: `1.5px solid ${on ? "var(--accent)" : "var(--line)"}`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: .75 }}>{d.dow}</div>
                  <div className="h-display" style={{ fontSize: 22, fontWeight: 900, margin: "3px 0" }}>{d.day}</div>
                  {d.isWeekend && <div style={{ width: 5, height: 5, borderRadius: 99, background: on ? "var(--accent-ink)" : "var(--accent)", margin: "0 auto" }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* slots */}
        <div>
          <SectionTitle>{selectedDay ? `${selectedDay.dow} ${selectedDay.day} — jam tersedia` : "Jam tersedia"}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {slots.map((s) => {
              const full = s.status === "full";
              const on = time === s.time;
              return (
                <button key={s.time} disabled={full} onClick={() => setTime(s.time)} style={{
                  padding: "14px 0", borderRadius: "var(--r-sm)", position: "relative",
                  background: on ? "var(--accent)" : full ? "transparent" : "var(--surface)",
                  color: on ? "var(--accent-ink)" : full ? "var(--text-mute)" : "var(--text)",
                  border: `1.5px solid ${on ? "var(--accent)" : full ? "var(--line)" : "var(--line-strong)"}`,
                  opacity: full ? .45 : 1, cursor: full ? "not-allowed" : "pointer",
                }}>
                  <span className="h-display" style={{ fontSize: 16, fontWeight: 800, textDecoration: full ? "line-through" : "none" }}>{s.time}</span>
                  {s.status === "few" && !on && <div style={{ fontSize: 10, fontWeight: 800, color: "var(--accent)", marginTop: 2 }}>sisa 1</div>}
                  {full && <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>Penuh</div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* hold notice */}
        <div style={{ display: "flex", gap: 11, padding: 14, borderRadius: "var(--r-sm)", background: "var(--surface)", border: "1px dashed var(--line-strong)" }}>
          <Icon name="clock" size={20} style={{ color: "var(--accent)", flex: "none" }} />
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.45, fontWeight: 600 }}>
            Kami kosongkan 1 tempat dan menunggu hingga <b style={{ color: "var(--text)" }}>15 menit</b> dari jam booking. Jika terlambat, slot bisa diberikan ke pelanggan berikutnya.
          </p>
        </div>
        <div style={{ height: 96 }} />
      </div>

      {/* sticky confirm */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 18px calc(env(safe-area-inset-bottom) + 96px)", background: "linear-gradient(180deg, transparent, var(--bg) 38%)", pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>
          <Button size="lg" full disabled={!time} iconRight="arrowRight" onClick={confirm}>
            {time ? `Pesan ${time} · ${wash.name}` : "Pilih jam"}
          </Button>
        </div>
      </div>

      <Sheet open={done} onClose={() => setDone(false)}>
        <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
          <div className="pop-in" style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", margin: "0 auto 18px", boxShadow: "0 16px 40px -14px var(--accent)" }}><Icon name="check" size={44} stroke={3} /></div>
          <h2 className="h-display" style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 900 }}>Slot dipesan!</h2>
          <p style={{ margin: "0 0 20px", fontSize: 15, color: "var(--text-dim)", fontWeight: 500 }}>Tempat kamu sudah dipesan. Tanpa antre — langsung datang.</p>
          <Button size="lg" full onClick={() => { setDone(false); go("home"); }}>Selesai</Button>
        </div>
      </Sheet>

      <Sheet open={!!qr} onClose={() => setQr(null)} title="QR masuk">
        {qr && <BookingQRBody booking={qr} />}
      </Sheet>
    </div>
  );
}

Object.assign(window, { BookingScreen });
