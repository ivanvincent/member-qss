const { fmtIDR, TIERS, TIER_ORDER, STAMP_GOAL } = window.QSS;

/* ============ HOME ============ */
function HomeScreen({ user, actions, go }) {
  const tier = TIERS[user.tier];
  const firstName = user.name ? user.name.split(" ")[0] : "driver";
  const nextBooking = user.bookings.find((b) => b.status === "upcoming");
  const toGo = STAMP_GOAL - user.stamps;

  return (
    <div className="app-scroll">
      {/* header */}
      <div style={{ padding: "calc(env(safe-area-inset-top) + 18px) 18px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, color: "var(--text-dim)", fontWeight: 600 }}>Halo,</div>
          <h1 className="h-display" style={{ margin: "2px 0 0", fontSize: 26, fontWeight: 900 }}>{firstName} 👋</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => go("qr")} aria-label="QR" style={{ width: 44, height: 44, borderRadius: 99, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--text)" }}>
            <Icon name="qr" size={21} stroke={2} />
          </button>
          <button onClick={() => go("profile")} aria-label="Profil" style={{ width: 44, height: 44, borderRadius: 99, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 17 }}>
            {firstName[0] ? firstName[0].toUpperCase() : "Q"}
          </button>
        </div>
      </div>

      <div style={{ padding: "12px 18px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* HERO membership card */}
        <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", padding: 20,
          background: user.tier === "basic" ? "linear-gradient(150deg,#103247,#0a2230)" : tierStyle(tier.accent).bg,
          color: user.tier === "luxury" ? "var(--chrome-ink)" : "var(--text)",
          border: `1.5px solid ${user.tier === "premium" ? "var(--accent)" : "var(--line-strong)"}` }}>
          {user.tier === "luxury" && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,.5) 50%,transparent 60%)" }} />}
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".08em", opacity: .7 }}>MEMBERSHIP QSS</div>
              <div className="h-display" style={{ fontSize: 30, fontWeight: 900, marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name={user.tier === "premium" ? "crown" : user.tier === "luxury" ? "star" : "car"} size={24} fill={user.tier !== "basic"} /> {tier.name}
              </div>
            </div>
            <Logo size={26} />
          </div>
          <div style={{ position: "relative", marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, opacity: .7, fontWeight: 700 }}>{user.carModel || "Mobil kamu"}</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 800, letterSpacing: ".06em" }}>{user.plate || "— — —"}</div>
            </div>
            {tier.washesPerMonth ? (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, opacity: .7, fontWeight: 700 }}>Cuci bulan ini</div>
                <div className="h-display" style={{ fontSize: 18, fontWeight: 800 }}>{user.washesUsedThisMonth} / {tier.washesPerMonth}</div>
              </div>
            ) : (
              <button onClick={() => go("tiers")} style={{ background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 800, fontSize: 13, padding: "9px 14px", borderRadius: 99, fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="crown" size={15} /> Upgrade
              </button>
            )}
          </div>
        </div>

        {/* quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <QuickAction icon="calendar" label="Pesan slot" sub={tier.booking ? "Tanpa antre" : "Khusus member"} onClick={() => go("book")} primary />
          <QuickAction icon="stamp" label="Cap saya" sub={`${toGo} lagi cuci gratis`} onClick={() => go("stamps")} />
        </div>

        {/* QR pass */}
        <Card onClick={() => go("qr")} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ width: 46, height: 46, borderRadius: 13, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="qr" size={24} stroke={2} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>Sedang di QSS?</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>Tunjukkan QR untuk dapat cap</div>
          </div>
          <Button size="sm" onClick={(e) => { e.stopPropagation(); go("qr"); }}>Buka QR</Button>
        </Card>

        {/* upcoming booking */}
        {tier.booking && (
          <div>
            <SectionTitle action={nextBooking ? "Semua" : null} onAction={() => go("book")}>Kunjungan berikutnya</SectionTitle>
            {nextBooking
              ? <BookingCard booking={nextBooking} compact />
              : <Card style={{ padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div><div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>Belum ada kunjungan</div><div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>Pesan slot, lewati antrean</div></div>
                  <Button size="sm" variant="subtle" iconRight="arrowRight" onClick={() => go("book")}>Pesan</Button>
                </Card>}
          </div>
        )}

        {/* promo */}
        <div>
          <SectionTitle action="Lihat semua" onAction={() => go("promos")}>Bulan ini di QSS</SectionTitle>
          <PromoCard promo={window.QSS.PROMOS[0]} onOpen={() => go("promos")} />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, sub, onClick, primary }) {
  return (
    <button onClick={onClick} style={{
      textAlign: "left", padding: 16, borderRadius: "var(--r)",
      background: primary ? "var(--accent)" : "var(--surface)",
      color: primary ? "var(--accent-ink)" : "var(--text)",
      border: primary ? "none" : "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: 10, minHeight: 104,
      boxShadow: primary ? "0 12px 28px -14px var(--accent)" : "none",
    }}>
      <Icon name={icon} size={26} stroke={2.3} />
      <div>
        <div className="h-display" style={{ fontSize: 16.5, fontWeight: 800 }}>{label}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, opacity: primary ? .8 : .6 }}>{sub}</div>
      </div>
    </button>
  );
}

/* ============ STAMPS ============ */
function StampsScreen({ user, actions, go }) {
  const toGo = STAMP_GOAL - user.stamps;
  const reached = user.stamps >= STAMP_GOAL;
  return (
    <div className="app-scroll">
      <TopBar title="Kartu loyalti" subtitle="Cap" right={<button onClick={() => go("qr")} style={{ background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 800, fontSize: 13, padding: "10px 14px", borderRadius: 99, fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="qr" size={16} stroke={2.2} /> QR saya</button>} />
      <div style={{ padding: "4px 18px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* card */}
        <Card glow style={{ padding: 22, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "var(--accent-soft)" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".06em", color: "var(--text-mute)" }}>KARTU CAP QSS</div>
              <div className="h-display" style={{ fontSize: 22, fontWeight: 900, marginTop: 2 }}>10 cuci = 1 gratis</div>
            </div>
            <Logo size={24} />
          </div>
          <StampGrid stamps={Math.min(user.stamps, STAMP_GOAL)} goal={STAMP_GOAL} />
          <div style={{ marginTop: 18, height: 8, borderRadius: 99, background: "var(--surface-2)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(user.stamps / STAMP_GOAL, 1) * 100}%`, background: "var(--accent)", borderRadius: 99, transition: "width .5s cubic-bezier(.2,.9,.3,1)" }} />
          </div>
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: "var(--text-dim)", textAlign: "center" }}>
            {reached ? "🎉 Kamu dapat cuci gratis!" : <><span style={{ color: "var(--accent)" }}>{toGo} cuci lagi</span> menuju cuci gratis</>}
          </div>
        </Card>

        {/* free wash bank */}
        <Card style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, borderColor: user.freeWashes ? "var(--accent)" : "var(--line)" }}>
          <span style={{ width: 46, height: 46, borderRadius: 13, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="gift" size={24} /></span>
          <div style={{ flex: 1 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>Cuci gratis</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>{user.freeWashes ? `${user.freeWashes} siap ditukar` : "Penuhi kartu untuk dapat satu"}</div>
          </div>
          <Button size="sm" disabled={!user.freeWashes} variant={user.freeWashes ? "primary" : "dark"} onClick={actions.redeem}>Tukar</Button>
        </Card>

        {/* history */}
        <div>
          <SectionTitle>Cap terbaru</SectionTitle>
          <Card style={{ padding: 6 }}>
            {window.QSS.STAMP_HISTORY.map((h, i) => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 12px", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--surface-2)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="wash" size={19} fill /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700 }}>{h.label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-mute)", fontWeight: 600 }}>{fmtDate(h.date)}</div>
                </div>
                <span className="h-display" style={{ fontSize: 15, fontWeight: 800, color: "var(--accent)" }}>+{h.stamps}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============ TIERS / UPGRADE ============ */
function TiersScreen({ user, actions, go }) {
  const [confirm, setConfirm] = React.useState(null);
  return (
    <div className="app-scroll">
      <TopBar title="Membership" subtitle="Upgrade" onBack={() => go("home")} />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: "0 2px 4px", fontSize: 15, color: "var(--text-dim)", fontWeight: 500, lineHeight: 1.5 }}>
          Lebih dari sekadar cap. Member lewati antrean dengan booking prioritas dan nikmati detailing, pembersihan kaca, serta minuman gratis tiap kunjungan.
        </p>
        {TIER_ORDER.map((id) => (
          <TierCard key={id} tier={TIERS[id]} current={user.tier === id} onSelect={(t) => t.id !== user.tier && setConfirm(t)} />
        ))}
        <div style={{ height: 4 }} />
      </div>

      <Sheet open={!!confirm} onClose={() => setConfirm(null)} title={confirm ? `Pindah ke ${confirm.name}?` : ""}>
        {confirm && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--surface-2)", borderRadius: "var(--r-sm)", marginBottom: 14 }}>
              <span style={{ fontWeight: 700, color: "var(--text-dim)" }}>{confirm.id === "basic" ? "Paket" : "Ditagih per tahun"}</span>
              <span className="h-display" style={{ fontSize: 20, fontWeight: 900 }}>{confirm.priceLabel}<span style={{ fontSize: 13, color: "var(--text-dim)" }}>{confirm.period}</span></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
              {confirm.perks.slice(0, 4).map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 14, fontWeight: 600 }}>
                  <Icon name="check" size={18} stroke={2.6} style={{ color: "var(--accent)" }} /> {p.text}
                </div>
              ))}
            </div>
            <Button size="lg" full onClick={() => { actions.upgrade(confirm.id); setConfirm(null); go("home"); }}>
              {confirm.id === "basic" ? "Konfirmasi turun paket" : `Konfirmasi — ${confirm.priceLabel}${confirm.period}`}
            </Button>
            <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--text-mute)", marginTop: 12, fontWeight: 600 }}>Hanya demo — tidak ada pembayaran nyata.</div>
          </div>
        )}
      </Sheet>
    </div>
  );
}

/* ============ PROMOS ============ */
function PromosScreen({ go }) {
  const [open, setOpen] = React.useState(null);

  // Merge officer-published announcements with hardcoded promos
  const dynamicPromos = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("qss_announcements_v1");
      if (!raw) return [];
      return JSON.parse(raw)
        .filter((a) => a.active)
        .map((a) => ({ id: a.id, month: "JUNI", badge: a.badge || "Info", title: a.title, desc: a.message, tag: a.category || "promo", hue: a.hue ?? 200 }));
    } catch (e) { return []; }
  }, []);

  const allPromos = [...dynamicPromos, ...window.QSS.PROMOS];

  return (
    <div className="app-scroll">
      <TopBar title="Promo" subtitle="Juni 2026" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {allPromos.map((p) => <PromoCard key={p.id} promo={p} onOpen={setOpen} />)}
        <div style={{ height: 4 }} />
      </div>
      <Sheet open={!!open} onClose={() => setOpen(null)} title={open ? open.title : ""}>
        {open && (
          <div>
            <Pill tone="accent" style={{ marginBottom: 12 }}>{open.badge} · {open.tag}</Pill>
            <p style={{ fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.55, fontWeight: 500, margin: "0 0 18px" }}>{open.desc}</p>
            <Button size="lg" full iconRight="arrowRight" onClick={() => { setOpen(null); go("book"); }}>Pesan untuk pakai ini</Button>
          </div>
        )}
      </Sheet>
    </div>
  );
}

/* ============ PROFILE ============ */
function ProfileScreen({ user, actions, go }) {
  const tier = TIERS[user.tier];
  const [edit, setEdit] = React.useState(false);
  const [form, setForm] = React.useState(user);
  React.useEffect(() => { setForm(user); }, [user]);
  const rows = [
    { icon: "phone", label: "HP", value: user.phone || "—" },
    { icon: "mail", label: "Email", value: user.email || "—" },
    { icon: "car", label: "Mobil", value: user.carModel ? `${user.carModel} · ${user.carColor}` : "—" },
    { icon: "shield", label: "Pelat", value: user.plate || "—" },
  ];
  return (
    <div className="app-scroll">
      <TopBar title="Profil" right={<button onClick={() => setEdit(true)} style={{ width: 44, height: 44, borderRadius: 99, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--text)" }}><Icon name="edit" size={19} /></button>} />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 70, height: 70, borderRadius: 22, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 30, flex: "none" }}>
            {(user.name || "Q")[0].toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 className="h-display" style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>{user.name || "Member QSS"}</h2>
            <div style={{ marginTop: 6 }}><Pill tone={user.tier === "luxury" ? "chrome" : "accent"}><Icon name={user.tier === "premium" ? "crown" : user.tier === "luxury" ? "star" : "car"} size={14} /> Member {tier.name}</Pill></div>
          </div>
        </div>

        {/* QR pass shortcut */}
        <Card onClick={() => go("qr")} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="qr" size={22} stroke={2} /></span>
          <div style={{ flex: 1 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>Kartu member QR</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>{user.memberId || "QSS-000000"}</div>
          </div>
          <Icon name="chevron" size={20} style={{ color: "var(--text-mute)" }} />
        </Card>

        {/* membership manage */}
        <Card onClick={() => go("tiers")} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "none" }}><Icon name="crown" size={22} /></span>
          <div style={{ flex: 1 }}>
            <div className="h-display" style={{ fontSize: 16, fontWeight: 800 }}>Kelola membership</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>{user.tier === "premium" ? "Kamu di paket tertinggi" : "Upgrade untuk perk lebih"}</div>
          </div>
          <Icon name="chevron" size={20} style={{ color: "var(--text-mute)" }} />
        </Card>

        {/* info */}
        <div>
          <SectionTitle action="Ubah" onAction={() => setEdit(true)}>Info pribadi</SectionTitle>
          <Card style={{ padding: 6 }}>
            {rows.map((r, i) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 12px", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <Icon name={r.icon} size={19} style={{ color: "var(--text-mute)" }} />
                <span style={{ fontSize: 13.5, color: "var(--text-mute)", fontWeight: 700, width: 56 }}>{r.label}</span>
                <span style={{ fontSize: 14.5, fontWeight: 700, marginLeft: "auto", textAlign: "right" }}>{r.value}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* settings */}
        <div>
          <SectionTitle>Preferensi</SectionTitle>
          <Card style={{ padding: 6 }}>
            <ToggleRow icon="bell" label="Notifikasi promo" defaultOn />
            <ToggleRow icon="calendar" label="Pengingat booking" defaultOn />
            <ToggleRow icon="mail" label="Newsletter bulanan" />
          </Card>
        </div>

        <button onClick={actions.signOut} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: "var(--r-sm)", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--text-dim)", fontWeight: 800, fontSize: 15, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
          <Icon name="logout" size={19} /> Keluar
        </button>
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-mute)", fontWeight: 600, paddingBottom: 4 }}>QSS Car Wash · Member sejak 2026</div>
      </div>

      {/* edit sheet */}
      <Sheet open={edit} onClose={() => setEdit(false)} title="Ubah profil">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Nama lengkap" icon="user" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Nomor HP" icon="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Email" icon="mail" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Model mobil" icon="car" value={form.carModel} onChange={(v) => setForm({ ...form, carModel: v })} />
          <Field label="Pelat nomor" icon="shield" value={form.plate} onChange={(v) => setForm({ ...form, plate: v.toUpperCase() })} />
          <Button size="lg" full onClick={() => { actions.updateUser(form); setEdit(false); }}>Simpan perubahan</Button>
        </div>
      </Sheet>
    </div>
  );
}

function ToggleRow({ icon, label, defaultOn }) {
  const [on, setOn] = React.useState(!!defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 12px" }}>
      <Icon name={icon} size={19} style={{ color: "var(--text-mute)" }} />
      <span style={{ fontSize: 14.5, fontWeight: 700, flex: 1 }}>{label}</span>
      <button onClick={() => setOn(!on)} style={{ width: 48, height: 28, borderRadius: 99, background: on ? "var(--accent)" : "var(--surface-3)", position: "relative", transition: "background .2s", flex: "none" }}>
        <span style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 99, background: "#fff", transition: "left .2s cubic-bezier(.2,.9,.3,1.3)", boxShadow: "0 2px 6px rgba(0,0,0,.3)" }} />
      </button>
    </div>
  );
}

Object.assign(window, { HomeScreen, StampsScreen, TiersScreen, PromosScreen, ProfileScreen });
