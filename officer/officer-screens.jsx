/* ============ DASHBOARD ============ */
function DashboardScreen({ bookings, checkinLog, queue, announcements }) {
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const done = bookings.filter((b) => b.status === "completed").length;
  const arrived = bookings.filter((b) => b.status === "arrived").length;
  const upcoming = bookings.filter((b) => b.status === "upcoming").length;
  const activeAnn = announcements.filter((a) => a.active).length;

  return (
    <div className="app-scroll">
      <div style={{ padding: "calc(env(safe-area-inset-top) + 18px) 18px 6px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--text-mute)", fontWeight: 600 }}>{today}</div>
          <h1 className="h-display" style={{ margin: "3px 0 0", fontSize: 26, fontWeight: 900 }}>Panel Petugas</h1>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center" }}>
          <Icon name="shield" size={22} stroke={2.3} />
        </div>
      </div>

      <div style={{ padding: "14px 18px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Booking hari ini", value: bookings.length, icon: "calendar" },
            { label: "Selesai", value: done, icon: "check", accent: true },
            { label: "Sedang proses", value: arrived, icon: "wash" },
            { label: "Antrean walk-in", value: queue.length, icon: "clock" },
          ].map((s) => (
            <div key={s.label} style={{
              padding: 16, borderRadius: "var(--r)",
              background: s.accent ? "var(--accent)" : "var(--surface)",
              border: s.accent ? "none" : "1px solid var(--line)",
              color: s.accent ? "var(--accent-ink)" : "var(--text)",
              boxShadow: s.accent ? "0 10px 28px -14px var(--accent)" : "none",
              display: "flex", flexDirection: "column", gap: 8, minHeight: 86,
            }}>
              <Icon name={s.icon} size={21} stroke={2.3} />
              <div>
                <div className="h-display" style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, opacity: .7, marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Next bookings */}
        <div>
          <SectionTitle>Booking berikutnya</SectionTitle>
          {bookings.filter((b) => b.status === "upcoming" || b.status === "arrived").slice(0, 3).map((b) => (
            <MiniBookingRow key={b.id} booking={b} />
          ))}
          {bookings.filter((b) => b.status === "upcoming" || b.status === "arrived").length === 0 && (
            <Card style={{ padding: 16, textAlign: "center" }}>
              <div style={{ color: "var(--text-mute)", fontWeight: 600, fontSize: 14 }}>Semua booking hari ini sudah selesai 🎉</div>
            </Card>
          )}
        </div>

        {/* Recent check-ins */}
        {checkinLog.length > 0 && (
          <div>
            <SectionTitle>Check-in terbaru</SectionTitle>
            <Card style={{ padding: 6 }}>
              {checkinLog.slice(0, 4).map((l, i) => (
                <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}>
                    <Icon name="check" size={18} stroke={2.8} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{l.customerName}</div>
                    <div style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 600 }}>{l.plate} · {l.washName} · {l.time}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)" }}>+1 cap</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* Active announcements preview */}
        <div>
          <SectionTitle>{activeAnn} pengumuman aktif</SectionTitle>
          {announcements.filter((a) => a.active).slice(0, 2).map((a) => (
            <Card key={a.id} style={{ padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 99, background: "#46e09a", flex: "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{a.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 600 }}>{a.badge} · {a.category}</div>
              </div>
              <Pill tone="live" style={{ fontSize: 11 }}>Aktif</Pill>
            </Card>
          ))}
          {activeAnn === 0 && (
            <Card style={{ padding: 14 }}>
              <div style={{ color: "var(--text-mute)", fontWeight: 600, fontSize: 13.5 }}>Belum ada pengumuman aktif.</div>
            </Card>
          )}
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

function MiniBookingRow({ booking }) {
  const wash = (window.QSS.WASH_TYPES || []).find((w) => w.id === booking.washType);
  const sc = { upcoming: "var(--text-mute)", arrived: "#fbbf24", completed: "#46e09a", noshow: "#ff6b6b" };
  const sl = { upcoming: "Menunggu", arrived: "Tiba", completed: "Selesai", noshow: "Tdk hadir" };
  return (
    <Card style={{ padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ textAlign: "center", background: "var(--surface-2)", borderRadius: "var(--r-sm)", padding: "7px 11px", minWidth: 54 }}>
        <div className="h-display" style={{ fontSize: 18, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{booking.time}</div>
        <div style={{ fontSize: 10.5, color: "var(--text-mute)", fontWeight: 700, marginTop: 2 }}>{wash ? wash.mins + "m" : ""}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{booking.customerName}</div>
        <div style={{ fontSize: 12.5, color: "var(--text-dim)", fontWeight: 600 }}>{booking.plate} · {wash ? wash.name : ""}</div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color: sc[booking.status] || "var(--text-mute)", flex: "none" }}>{sl[booking.status] || ""}</span>
    </Card>
  );
}

/* ============ CHECK-IN ============ */
function CheckInScreen({ onCheckin }) {
  const [query, setQuery] = React.useState("");
  const [customer, setCustomer] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);
  const [washType, setWashType] = React.useState("premium");
  const [result, setResult] = React.useState(null);

  const search = () => {
    if (!query.trim()) return;
    const c = window.QSS_OFFICER.lookupCustomer(query);
    setCustomer(c || null);
    setNotFound(!c);
    setResult(null);
  };

  const confirm = () => {
    const wash = (window.QSS.WASH_TYPES || []).find((w) => w.id === washType);
    const res = window.QSS_OFFICER.addStampToCustomer(customer.memberId || "DEMO");
    const log = {
      id: "ci-" + Date.now(),
      customerName: customer.name || "Member",
      plate: customer.plate || "—",
      memberId: customer.memberId || "DEMO",
      washName: wash ? wash.name : washType,
      washType,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    const prev = window.QSS_OFFICER.loadCheckinLog();
    window.QSS_OFFICER.saveCheckinLog([log, ...prev]);
    setResult({ ...res, log });
    onCheckin(log);
  };

  const reset = () => { setQuery(""); setCustomer(null); setNotFound(false); setResult(null); };

  const tier = customer ? (window.QSS.TIERS[customer.tier] || window.QSS.TIERS.basic) : null;

  if (result) {
    return (
      <div className="app-scroll">
        <TopBar title="Check-in" subtitle="Konfirmasi cuci" />
        <div style={{ padding: "24px 18px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
          <div className="pop-in" style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", boxShadow: "0 18px 44px -16px var(--accent)" }}>
            <Icon name="check" size={48} stroke={3} />
          </div>
          <div>
            <h2 className="h-display" style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 900 }}>Check-in berhasil!</h2>
            <p style={{ margin: 0, fontSize: 15, color: "var(--text-dim)", fontWeight: 500 }}>{result.log.customerName} · {result.log.plate}</p>
          </div>
          <Card style={{ padding: 18, width: "100%", display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <div className="h-display" style={{ fontSize: 28, fontWeight: 900, color: "var(--accent)" }}>+1</div>
              <div style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 700, marginTop: 2 }}>Cap ditambah</div>
            </div>
            {result.stamps != null && (
              <div style={{ textAlign: "center" }}>
                <div className="h-display" style={{ fontSize: 28, fontWeight: 900 }}>{result.stamps}/10</div>
                <div style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 700, marginTop: 2 }}>Total cap</div>
              </div>
            )}
            {result.earnedFreeWash && (
              <div style={{ textAlign: "center" }}>
                <div className="h-display" style={{ fontSize: 26, fontWeight: 900 }}>🎉</div>
                <div style={{ fontSize: 12.5, color: "#46e09a", fontWeight: 700, marginTop: 2 }}>Cuci gratis!</div>
              </div>
            )}
          </Card>
          <div style={{ width: "100%" }}>
            <Button size="lg" full iconRight="arrowRight" onClick={reset}>Check-in berikutnya</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-scroll">
      <TopBar title="Check-in" subtitle="Konfirmasi cuci" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* search */}
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-mute)", letterSpacing: ".05em", marginBottom: 12 }}>CARI PELANGGAN</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "var(--surface-2)", border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", padding: "0 14px" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}>
              <Icon name="scan" size={18} style={{ color: "var(--text-mute)", flex: "none" }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="ID member, pelat, atau payload QR"
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 15, fontWeight: 600, padding: "14px 0" }} />
            </div>
            <Button onClick={search} disabled={!query.trim()}>Cari</Button>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 600, marginTop: 8 }}>
            Contoh: QSS-112233 · B 9182 KL · atau tempel payload QR pelanggan
          </div>
        </Card>

        {notFound && (
          <Card style={{ padding: 18, textAlign: "center", border: "1px solid rgba(255,107,107,.3)" }}>
            <Icon name="info" size={28} style={{ color: "#ff6b6b", margin: "0 auto 8px" }} />
            <div style={{ fontWeight: 700, color: "#ff6b6b", fontSize: 15 }}>Pelanggan tidak ditemukan</div>
            <div style={{ fontSize: 13, color: "var(--text-mute)", fontWeight: 600, marginTop: 4 }}>Coba ID member atau pelat nomor lain</div>
          </Card>
        )}

        {customer && (
          <>
            <Card style={{ padding: 18 }} glow>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, flex: "none" }}>
                  {(customer.name || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="h-display" style={{ fontSize: 20, fontWeight: 900 }}>{customer.name || "Member"}</div>
                  <div style={{ display: "flex", gap: 7, marginTop: 5, flexWrap: "wrap" }}>
                    <Pill>{customer.plate || "—"}</Pill>
                    <Pill tone={customer.tier === "luxury" ? "chrome" : customer.tier === "premium" ? "accent" : "default"}>
                      {tier ? tier.name : "Basic"}
                    </Pill>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, padding: "10px 0", background: "var(--surface-2)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                  <div className="h-display" style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)" }}>{customer.stamps ?? "—"}</div>
                  <div style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 700, marginTop: 1 }}>Cap saat ini</div>
                </div>
                <div style={{ flex: 1, padding: "10px 0", background: "var(--surface-2)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                  <div className="h-display" style={{ fontSize: 24, fontWeight: 900, color: (customer.freeWashes || 0) > 0 ? "#46e09a" : "var(--text-mute)" }}>
                    {customer.freeWashes ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 700, marginTop: 1 }}>Cuci gratis</div>
                </div>
                <div style={{ flex: 1, padding: "10px 0", background: "var(--surface-2)", borderRadius: "var(--r-sm)", textAlign: "center" }}>
                  <div className="h-display" style={{ fontSize: 24, fontWeight: 900 }}>{10 - Math.min(customer.stamps ?? 0, 10)}</div>
                  <div style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 700, marginTop: 1 }}>Lagi gratis</div>
                </div>
              </div>
            </Card>

            <div>
              <SectionTitle>Jenis cucian</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {(window.QSS.WASH_TYPES || []).map((w) => {
                  const on = washType === w.id;
                  return (
                    <button key={w.id} onClick={() => setWashType(w.id)} style={{
                      display: "flex", alignItems: "center", gap: 13, padding: 14, borderRadius: "var(--r)", textAlign: "left",
                      background: on ? "var(--accent-soft)" : "var(--surface)", border: `1.5px solid ${on ? "var(--accent)" : "var(--line)"}`, color: "var(--text)",
                    }}>
                      <span style={{ width: 20, height: 20, borderRadius: 99, border: `2px solid ${on ? "var(--accent)" : "var(--line-strong)"}`, display: "grid", placeItems: "center", flex: "none" }}>
                        {on && <span style={{ width: 10, height: 10, borderRadius: 99, background: "var(--accent)" }} />}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div className="h-display" style={{ fontSize: 15, fontWeight: 800 }}>{w.name} <span style={{ fontSize: 12, color: "var(--text-mute)", fontWeight: 700 }}>· {w.mins} mnt</span></div>
                        <div style={{ fontSize: 12.5, color: "var(--text-dim)", fontWeight: 600 }}>{w.desc}</div>
                      </div>
                      <span className="h-display" style={{ fontSize: 14, fontWeight: 800, color: on ? "var(--accent)" : "var(--text-dim)" }}>{w.priceLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button size="lg" full icon="check" onClick={confirm}>Konfirmasi check-in · +1 cap</Button>
          </>
        )}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

/* ============ BOOKINGS ============ */
function BookingsScreen({ bookings, setBookings }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all", label: "Semua" },
    { id: "upcoming", label: "Menunggu" },
    { id: "arrived", label: "Tiba" },
    { id: "completed", label: "Selesai" },
    { id: "noshow", label: "Tidak hadir" },
  ];
  const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const updateStatus = (id, status) => setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  const sc = { upcoming: "var(--text-mute)", arrived: "#fbbf24", completed: "#46e09a", noshow: "#ff6b6b" };
  const sl = { upcoming: "Menunggu", arrived: "Tiba", completed: "Selesai", noshow: "Tidak hadir" };

  return (
    <div className="app-scroll">
      <TopBar title="Booking" subtitle="Hari ini" />
      <div style={{ padding: "0 18px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -18px", padding: "0 18px 14px" }}>
          {filters.map((f) => {
            const count = f.id === "all" ? bookings.length : bookings.filter((b) => b.status === f.id).length;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                flex: "none", padding: "8px 14px", borderRadius: 99, fontWeight: 700, fontSize: 13, whiteSpace: "nowrap",
                background: filter === f.id ? "var(--accent)" : "var(--surface-2)",
                color: filter === f.id ? "var(--accent-ink)" : "var(--text-dim)", border: "none",
              }}>{f.label} <span style={{ opacity: .75 }}>({count})</span></button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {visible.length === 0 && (
            <Card style={{ padding: 20, textAlign: "center" }}>
              <div style={{ color: "var(--text-mute)", fontWeight: 600 }}>Tidak ada booking di kategori ini</div>
            </Card>
          )}
          {visible.map((b) => {
            const wash = (window.QSS.WASH_TYPES || []).find((w) => w.id === b.washType);
            return (
              <Card key={b.id} style={{ padding: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: sc[b.status] || "var(--line)" }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ textAlign: "center", background: "var(--surface-2)", borderRadius: "var(--r-sm)", padding: "8px 11px", minWidth: 56 }}>
                    <div className="h-display" style={{ fontSize: 19, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{b.time}</div>
                    <div style={{ fontSize: 10.5, color: "var(--text-mute)", fontWeight: 700, marginTop: 2 }}>{wash ? wash.mins + "m" : ""}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>{b.customerName}</div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600, marginTop: 1 }}>{b.plate} · {wash ? wash.name : b.washType}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}>
                      <Pill style={{ fontSize: 11, padding: "3px 8px" }}>{b.tier || "basic"}</Pill>
                      <Pill style={{ fontSize: 11, padding: "3px 8px", color: sc[b.status], background: "var(--surface-2)" }}>{sl[b.status] || b.status}</Pill>
                      {b.source === "walkin" && <Pill style={{ fontSize: 11, padding: "3px 8px" }}>Walk-in</Pill>}
                    </div>
                  </div>
                </div>
                {b.status !== "completed" && b.status !== "noshow" && (
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    {b.status === "upcoming" && (
                      <button onClick={() => updateStatus(b.id, "arrived")} style={{ flex: 1, padding: "10px", borderRadius: "var(--r-sm)", background: "rgba(251,191,36,.12)", color: "#fbbf24", fontWeight: 700, fontSize: 13, border: "1px solid rgba(251,191,36,.22)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Icon name="car" size={15} /> Tandai tiba
                      </button>
                    )}
                    {b.status === "arrived" && (
                      <button onClick={() => updateStatus(b.id, "completed")} style={{ flex: 1, padding: "10px", borderRadius: "var(--r-sm)", background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 700, fontSize: 13, border: "1px solid rgba(25,211,243,.22)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Icon name="check" size={15} stroke={2.6} /> Tandai selesai
                      </button>
                    )}
                    <button onClick={() => updateStatus(b.id, "noshow")} style={{ padding: "10px 14px", borderRadius: "var(--r-sm)", background: "var(--surface-2)", color: "var(--text-mute)", fontWeight: 700, fontSize: 13, border: "1px solid var(--line)" }}>
                      Tidak hadir
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

/* ============ QUEUE ============ */
function QueueScreen({ queue, setQueue }) {
  const [adding, setAdding] = React.useState(false);
  const [plate, setPlate] = React.useState("");
  const [washType, setWashType] = React.useState("express");

  const addCar = () => {
    if (!plate.trim()) return;
    const wash = (window.QSS.WASH_TYPES || []).find((w) => w.id === washType);
    const entry = {
      id: "q-" + Date.now(),
      plate: plate.trim().toUpperCase(),
      washType,
      washName: wash ? wash.name : washType,
      mins: wash ? wash.mins : 30,
      addedAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...queue, entry];
    setQueue(updated);
    window.QSS_OFFICER.saveQueue(updated);
    setPlate(""); setAdding(false);
  };

  const markDone = (id) => {
    const updated = queue.filter((q) => q.id !== id);
    setQueue(updated);
    window.QSS_OFFICER.saveQueue(updated);
  };

  const waitMins = (idx) => queue.slice(0, idx).reduce((s, q) => s + (q.mins || 30), 0);

  return (
    <div className="app-scroll">
      <TopBar title="Antrean" subtitle={queue.length > 0 ? `${queue.length} mobil menunggu` : "Kosong"} right={
        <Button size="sm" icon="plus" onClick={() => { setAdding(true); setPlate(""); }}>Tambah</Button>
      } />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {adding && (
          <Card style={{ padding: 18 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Tambah ke antrean</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field label="Pelat nomor" icon="car" value={plate} onChange={(v) => setPlate(v.toUpperCase())} placeholder="B 1234 ABC" autoFocus />
              <div>
                <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 8px 4px" }}>Jenis cucian</span>
                {(window.QSS.WASH_TYPES || []).map((w) => {
                  const on = washType === w.id;
                  return (
                    <button key={w.id} onClick={() => setWashType(w.id)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: "var(--r-sm)", textAlign: "left", width: "100%", marginBottom: 7,
                      background: on ? "var(--accent-soft)" : "var(--surface-2)", border: `1.5px solid ${on ? "var(--accent)" : "var(--line)"}`, color: "var(--text)",
                    }}>
                      <span style={{ width: 18, height: 18, borderRadius: 99, border: `2px solid ${on ? "var(--accent)" : "var(--line-strong)"}`, display: "grid", placeItems: "center", flex: "none" }}>
                        {on && <span style={{ width: 9, height: 9, borderRadius: 99, background: "var(--accent)" }} />}
                      </span>
                      <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{w.name}</span>
                      <span style={{ fontSize: 13, color: "var(--text-mute)", fontWeight: 600 }}>{w.mins} mnt</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="ghost" full onClick={() => setAdding(false)}>Batal</Button>
                <Button full disabled={!plate.trim()} onClick={addCar}>Masukkan ke antrean</Button>
              </div>
            </div>
          </Card>
        )}

        {queue.length === 0 && !adding && (
          <Card style={{ padding: 32, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: "var(--surface-2)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
              <Icon name="car" size={30} style={{ color: "var(--text-mute)" }} />
            </div>
            <div className="h-display" style={{ fontSize: 18, fontWeight: 800 }}>Antrean kosong</div>
            <div style={{ fontSize: 14, color: "var(--text-mute)", fontWeight: 600, marginTop: 4, marginBottom: 18 }}>Tambah mobil walk-in ke antrean</div>
            <Button icon="plus" onClick={() => { setAdding(true); setPlate(""); }}>Tambah ke antrean</Button>
          </Card>
        )}

        {queue.map((item, idx) => (
          <Card key={item.id} style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flex: "none", display: "grid", placeItems: "center",
                background: idx === 0 ? "var(--accent)" : "var(--surface-2)",
                color: idx === 0 ? "var(--accent-ink)" : "var(--text-mute)",
              }}>
                <span className="h-display" style={{ fontSize: 17, fontWeight: 900 }}>{idx + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mono" style={{ fontSize: 17, fontWeight: 800, letterSpacing: ".04em" }}>{item.plate}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 600, marginTop: 1 }}>
                  {item.washName} · Masuk {item.addedAt}
                  {idx > 0 && <span> · Tunggu ~{waitMins(idx)} mnt</span>}
                </div>
              </div>
              {idx === 0
                ? <Button size="sm" variant="subtle" onClick={() => markDone(item.id)}>Selesai</Button>
                : <button onClick={() => markDone(item.id)} style={{ padding: "7px 12px", borderRadius: 99, background: "var(--surface-2)", border: "1px solid var(--line)", color: "var(--text-mute)", fontWeight: 700, fontSize: 12.5 }}>Hapus</button>
              }
            </div>
            {idx === 0 && (
              <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: "var(--r-sm)", background: "var(--accent-soft)", color: "var(--accent)", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--accent)" }} /> Sedang dilayani
              </div>
            )}
          </Card>
        ))}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

/* ============ ANNOUNCEMENTS ============ */
const ANN_CATEGORIES = ["promo", "info", "event", "peringatan"];
const ANN_HUES = [200, 25, 150, 280, 0, 60];
const EMPTY_FORM = { title: "", message: "", badge: "Bulan ini", category: "promo", hue: 200 };

function AnnouncementsScreen({ announcements, setAnnouncements }) {
  const [composing, setComposing] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const persist = (list) => { setAnnouncements(list); window.QSS_OFFICER.saveAnnouncements(list); };

  const saveForm = () => {
    if (!form.title.trim() || !form.message.trim()) return;
    const updated = editId
      ? announcements.map((a) => a.id === editId ? { ...a, ...form } : a)
      : [{ id: "ann-" + Date.now(), active: true, createdAt: new Date().toISOString().slice(0, 10), ...form }, ...announcements];
    persist(updated);
    setComposing(false); setEditId(null); setForm(EMPTY_FORM);
  };

  const toggle = (id) => persist(announcements.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  const remove = (id) => persist(announcements.filter((a) => a.id !== id));
  const startEdit = (a) => { setForm({ title: a.title, message: a.message, badge: a.badge, category: a.category, hue: a.hue }); setEditId(a.id); setComposing(true); };
  const startNew = () => { setForm(EMPTY_FORM); setEditId(null); setComposing(true); };

  return (
    <div className="app-scroll">
      <TopBar title="Pengumuman" subtitle="Promo & iklan" right={
        !composing && <Button size="sm" icon="plus" onClick={startNew}>Buat baru</Button>
      } />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 14 }}>

        {composing && (
          <Card style={{ padding: 18 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
              {editId ? "Edit pengumuman" : "Buat pengumuman baru"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <Field label="Judul" icon="edit" value={form.title} onChange={set("title")} placeholder="mis. Promo Akhir Bulan" autoFocus />
              <label>
                <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 7px 4px" }}>Pesan / deskripsi</span>
                <textarea value={form.message} onChange={(e) => set("message")(e.target.value)}
                  placeholder="Tulis detail promo atau pengumuman..."
                  rows={3} style={{ width: "100%", background: "var(--surface-2)", border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", padding: "12px 14px", color: "var(--text)", fontSize: 15, fontWeight: 500, resize: "vertical", outline: "none", lineHeight: 1.5, fontFamily: "var(--font-ui)", boxSizing: "border-box" }} />
              </label>
              <Field label="Label (badge)" icon="promo" value={form.badge} onChange={set("badge")} placeholder="mis. Akhir pekan" />
              <div>
                <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 8px 4px" }}>Kategori</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ANN_CATEGORIES.map((c) => (
                    <button key={c} onClick={() => set("category")(c)} style={{
                      padding: "9px 14px", borderRadius: 99, fontWeight: 700, fontSize: 13.5, minHeight: 40,
                      background: form.category === c ? "var(--accent)" : "var(--surface-2)",
                      color: form.category === c ? "var(--accent-ink)" : "var(--text-dim)",
                      border: `1.5px solid ${form.category === c ? "var(--accent)" : "var(--line)"}`,
                    }}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 8px 4px" }}>Warna banner</span>
                <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                  {ANN_HUES.map((h) => (
                    <button key={h} onClick={() => set("hue")(h)} style={{
                      width: 38, height: 38, borderRadius: 10, flex: "none",
                      background: `oklch(0.55 0.15 ${h})`,
                      border: form.hue === h ? "3px solid var(--text)" : "3px solid transparent",
                      outline: form.hue === h ? "2px solid var(--accent)" : "none", outlineOffset: 1,
                    }} />
                  ))}
                </div>
              </div>
              {form.title.trim() && (
                <div>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", margin: "0 0 8px 4px" }}>Preview</span>
                  <AnnCard ann={{ ...form, active: true, id: "preview", createdAt: "" }} preview />
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="ghost" full onClick={() => { setComposing(false); setEditId(null); }}>Batal</Button>
                <Button full disabled={!form.title.trim() || !form.message.trim()} onClick={saveForm}>
                  {editId ? "Simpan" : "Terbitkan"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {announcements.length === 0 && !composing && (
          <Card style={{ padding: 32, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: "var(--surface-2)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
              <Icon name="bell" size={28} style={{ color: "var(--text-mute)" }} />
            </div>
            <div className="h-display" style={{ fontSize: 18, fontWeight: 800 }}>Belum ada pengumuman</div>
            <div style={{ fontSize: 14, color: "var(--text-mute)", fontWeight: 600, marginTop: 4, marginBottom: 18 }}>
              Buat promo atau info yang akan tampil di aplikasi pelanggan
            </div>
            <Button icon="plus" onClick={startNew}>Buat pengumuman</Button>
          </Card>
        )}

        {announcements.map((a) => (
          <AnnCard key={a.id} ann={a} onToggle={() => toggle(a.id)} onEdit={() => startEdit(a)} onDelete={() => remove(a.id)} />
        ))}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

function AnnCard({ ann, onToggle, onEdit, onDelete, preview }) {
  const h = ann.hue || 200;
  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{
        height: 76, padding: "12px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        background: `linear-gradient(135deg, oklch(0.55 0.15 ${h}), oklch(0.4 0.12 ${h + 20}))`, position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: .4, background: "repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 2px, transparent 2px 13px)" }} />
        <Pill style={{ position: "relative", background: "rgba(0,0,0,.28)", color: "#fff" }}>{ann.badge || "Promo"}</Pill>
        {!preview && (
          <span style={{ position: "relative", fontSize: 11, fontWeight: 800, color: "#fff", padding: "4px 10px", borderRadius: 99, background: ann.active ? "rgba(70,224,154,.28)" : "rgba(0,0,0,.3)", border: `1px solid ${ann.active ? "rgba(70,224,154,.5)" : "rgba(255,255,255,.2)"}` }}>
            {ann.active ? "● Aktif" : "○ Nonaktif"}
          </span>
        )}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div className="h-display" style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{ann.title}</div>
        <div style={{ fontSize: 13.5, color: "var(--text-dim)", fontWeight: 500, lineHeight: 1.45 }}>{ann.message}</div>
        {!preview && (
          <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Pill style={{ fontSize: 11, padding: "3px 8px" }}>{ann.category}</Pill>
            {ann.createdAt && <span style={{ fontSize: 11.5, color: "var(--text-mute)", fontWeight: 600 }}>{ann.createdAt}</span>}
            <div style={{ flex: 1 }} />
            <button onClick={onToggle} style={{ padding: "6px 12px", borderRadius: 99, fontWeight: 700, fontSize: 12.5, border: "none", background: ann.active ? "rgba(255,107,107,.14)" : "var(--accent-soft)", color: ann.active ? "#ff6b6b" : "var(--accent)" }}>
              {ann.active ? "Nonaktifkan" : "Aktifkan"}
            </button>
            <button onClick={onEdit} style={{ padding: "6px 12px", borderRadius: 99, fontWeight: 700, fontSize: 12.5, border: "none", background: "var(--surface-2)", color: "var(--text-dim)" }}>Edit</button>
            <button onClick={onDelete} style={{ padding: "6px 12px", borderRadius: 99, fontWeight: 700, fontSize: 12.5, border: "none", background: "rgba(255,107,107,.1)", color: "#ff6b6b" }}>Hapus</button>
          </div>
        )}
      </div>
    </Card>
  );
}

Object.assign(window, { DashboardScreen, CheckInScreen, BookingsScreen, QueueScreen, AnnouncementsScreen });
