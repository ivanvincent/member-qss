// QSS Officer — data layer (root, shared with main app). Exposed on window.QSS_OFFICER.
(function () {
  const CREDENTIALS = { staffId: "petugas", password: "qss2026" };
  const ANNOUNCE_KEY = "qss_announcements_v1";
  const QUEUE_KEY = "qss_queue_v1";
  const CHECKIN_KEY = "qss_checkin_log_v1";
  const SESSION_KEY = "qss_officer_session_v1";

  function checkCredentials(id, pw) {
    return id.trim().toLowerCase() === CREDENTIALS.staffId && pw === CREDENTIALS.password;
  }

  function loadSession() {
    try { return localStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
  }
  function saveSession() { try { localStorage.setItem(SESSION_KEY, "1"); } catch (e) {} }
  function clearSession() { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} }

  function buildTodayBookings() {
    const today = new Date().toISOString().slice(0, 10);
    let customerBookings = [];
    try {
      const raw = localStorage.getItem("qss_user_v2");
      if (raw) {
        const u = JSON.parse(raw);
        customerBookings = (u.bookings || [])
          .filter((b) => b.dateISO === today && b.status === "upcoming")
          .map((b) => ({ ...b, customerName: u.name || "Member", plate: u.plate || "—", memberId: u.memberId || "QSS-000000", tier: u.tier || "basic", source: "app" }));
      }
    } catch (e) {}
    const demos = [
      { id: "d1", dateISO: today, time: "08:00", washType: "express", customerName: "Budi Santoso", plate: "B 9182 KL", memberId: "QSS-112233", tier: "basic", status: "completed", source: "walkin" },
      { id: "d2", dateISO: today, time: "09:00", washType: "premium", customerName: "Sari Dewi", plate: "D 4567 AB", memberId: "QSS-223344", tier: "luxury", status: "arrived", source: "app" },
      { id: "d3", dateISO: today, time: "10:00", washType: "detail", customerName: "Hendra Wijaya", plate: "B 1234 XY", memberId: "QSS-334455", tier: "premium", status: "upcoming", source: "app" },
      { id: "d4", dateISO: today, time: "11:00", washType: "express", customerName: "Rina Kusuma", plate: "F 8765 CD", memberId: "QSS-445566", tier: "basic", status: "upcoming", source: "app" },
      { id: "d5", dateISO: today, time: "13:00", washType: "premium", customerName: "Agus Pramono", plate: "B 3344 MN", memberId: "QSS-556677", tier: "luxury", status: "upcoming", source: "app" },
      { id: "d6", dateISO: today, time: "14:00", washType: "express", customerName: "Dewi Rahayu", plate: "D 1122 PQ", memberId: "QSS-667788", tier: "basic", status: "upcoming", source: "walkin" },
    ];
    const taken = new Set(customerBookings.map((b) => b.time));
    return [...demos.filter((d) => !taken.has(d.time)), ...customerBookings].sort((a, b) => a.time.localeCompare(b.time));
  }

  function loadAnnouncements() {
    try { const r = localStorage.getItem(ANNOUNCE_KEY); if (r) return JSON.parse(r); } catch (e) {}
    const seed = [
      { id: "as1", title: "Perisai Musim Hujan", message: "Gratis pembersihan jamur kaca untuk setiap Cuci Premium. Berlaku Juni 2026.", badge: "Bulan ini", category: "promo", active: true, hue: 200, createdAt: "2026-06-01" },
      { id: "as2", title: "Sabtu Keluarga", message: "Bawa 2 mobil di hari Sabtu, cuci ke-2 diskon 50%. Anak-anak dapat es krim gratis.", badge: "Akhir pekan", category: "promo", active: true, hue: 25, createdAt: "2026-06-01" },
      { id: "as3", title: "Selasa Cap Double", message: "Tiap cuci di hari Selasa dapat 2 cap. Penuhi kartu 2× lebih cepat.", badge: "Member", category: "promo", active: true, hue: 150, createdAt: "2026-06-01" },
    ];
    localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(seed));
    return seed;
  }
  function saveAnnouncements(list) { try { localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(list)); } catch (e) {} }

  function loadQueue() { try { const r = localStorage.getItem(QUEUE_KEY); if (r) return JSON.parse(r); } catch (e) {} return []; }
  function saveQueue(q) { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch (e) {} }

  function loadCheckinLog() { try { const r = localStorage.getItem(CHECKIN_KEY); if (r) return JSON.parse(r); } catch (e) {} return []; }
  function saveCheckinLog(l) { try { localStorage.setItem(CHECKIN_KEY, JSON.stringify(l)); } catch (e) {} }

  function lookupCustomer(raw) {
    const q = raw.trim().toUpperCase().replace(/\s/g, "");
    if (!q) return null;
    // Parse QR payload
    const src = raw.trim();
    if (src.startsWith("QSS-MEMBER|")) {
      const p = src.split("|");
      if (p.length >= 5) {
        const [, memberId, name, plate, tier, capPart] = p;
        return { memberId, name, plate, tier, stamps: parseInt((capPart || "cap:0").split(":")[1] || "0"), freeWashes: 0 };
      }
    }
    // Real user
    try {
      const u = JSON.parse(localStorage.getItem("qss_user_v2") || "{}");
      const mid = (u.memberId || "").toUpperCase().replace(/\s/g, "");
      const plt = (u.plate || "").toUpperCase().replace(/\s/g, "");
      if (mid === q || plt === q || mid.replace(/-/g, "") === q.replace(/-/g, "")) return u;
    } catch (e) {}
    // Demo customers
    const demos = [
      { name: "Budi Santoso", plate: "B9182KL", memberId: "QSS-112233", tier: "basic", stamps: 3, freeWashes: 0 },
      { name: "Sari Dewi", plate: "D4567AB", memberId: "QSS-223344", tier: "luxury", stamps: 8, freeWashes: 0 },
      { name: "Hendra Wijaya", plate: "B1234XY", memberId: "QSS-334455", tier: "premium", stamps: 5, freeWashes: 1 },
      { name: "Rina Kusuma", plate: "F8765CD", memberId: "QSS-445566", tier: "basic", stamps: 1, freeWashes: 0 },
      { name: "Agus Pramono", plate: "B3344MN", memberId: "QSS-556677", tier: "luxury", stamps: 6, freeWashes: 0 },
    ];
    return demos.find((d) =>
      d.plate.toUpperCase() === q ||
      d.memberId.toUpperCase().replace(/-/g, "") === q.replace(/-/g, "") ||
      d.memberId.toUpperCase() === raw.trim().toUpperCase()
    ) || null;
  }

  function addStamp(memberId) {
    try {
      const raw = localStorage.getItem("qss_user_v2");
      if (raw) {
        const u = JSON.parse(raw);
        if ((u.memberId || "").toUpperCase() === memberId.toUpperCase()) {
          let stamps = (u.stamps || 0) + 1, freeWashes = u.freeWashes || 0, earned = false;
          if (stamps >= 10) { stamps -= 10; freeWashes++; earned = true; }
          localStorage.setItem("qss_user_v2", JSON.stringify({ ...u, stamps, freeWashes }));
          return { stamps, freeWashes, earnedFreeWash: earned, realUser: true };
        }
      }
    } catch (e) {}
    return { earnedFreeWash: false, demo: true };
  }

  window.QSS_OFFICER = { CREDENTIALS, checkCredentials, loadSession, saveSession, clearSession, buildTodayBookings, loadAnnouncements, saveAnnouncements, loadQueue, saveQueue, loadCheckinLog, saveCheckinLog, lookupCustomer, addStamp };
})();
