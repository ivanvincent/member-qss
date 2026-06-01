// QSS Officer — data layer. Exposed on window.QSS_OFFICER.
(function () {
  const OFFICER_PIN = "1234";
  const ANNOUNCE_KEY = "qss_announcements_v1";
  const QUEUE_KEY = "qss_queue_v1";
  const CHECKIN_KEY = "qss_checkin_log_v1";

  function buildTodayBookings() {
    const today = new Date().toISOString().slice(0, 10);
    let customerBookings = [];
    try {
      const raw = localStorage.getItem("qss_user_v2");
      if (raw) {
        const u = JSON.parse(raw);
        customerBookings = (u.bookings || [])
          .filter((b) => b.dateISO === today && b.status === "upcoming")
          .map((b) => ({
            ...b,
            customerName: u.name || "Member",
            plate: u.plate || "—",
            memberId: u.memberId || "QSS-000000",
            tier: u.tier || "basic",
            source: "app",
          }));
      }
    } catch (e) {}
    const demos = [
      { id: "demo-1", dateISO: today, time: "08:00", washType: "express", customerName: "Budi Santoso", plate: "B 9182 KL", memberId: "QSS-112233", tier: "basic", status: "completed", source: "walkin" },
      { id: "demo-2", dateISO: today, time: "09:00", washType: "premium", customerName: "Sari Dewi", plate: "D 4567 AB", memberId: "QSS-223344", tier: "luxury", status: "arrived", source: "app" },
      { id: "demo-3", dateISO: today, time: "10:00", washType: "detail", customerName: "Hendra Wijaya", plate: "B 1234 XY", memberId: "QSS-334455", tier: "premium", status: "upcoming", source: "app" },
      { id: "demo-4", dateISO: today, time: "11:00", washType: "express", customerName: "Rina Kusuma", plate: "F 8765 CD", memberId: "QSS-445566", tier: "basic", status: "upcoming", source: "app" },
      { id: "demo-5", dateISO: today, time: "13:00", washType: "premium", customerName: "Agus Pramono", plate: "B 3344 MN", memberId: "QSS-556677", tier: "luxury", status: "upcoming", source: "app" },
      { id: "demo-6", dateISO: today, time: "14:00", washType: "express", customerName: "Dewi Rahayu", plate: "D 1122 PQ", memberId: "QSS-667788", tier: "basic", status: "upcoming", source: "walkin" },
    ];
    const customerTimes = new Set(customerBookings.map((b) => b.time));
    return [...demos.filter((d) => !customerTimes.has(d.time)), ...customerBookings]
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  function loadAnnouncements() {
    try {
      const raw = localStorage.getItem(ANNOUNCE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const seed = [
      { id: "ann-seed-1", title: "Perisai Musim Hujan", message: "Gratis pembersihan jamur kaca untuk setiap Cuci Premium. Lawan noda air bulan ini.", badge: "Bulan ini", category: "promo", active: true, hue: 200, createdAt: "2026-06-01" },
      { id: "ann-seed-2", title: "Sabtu Keluarga", message: "Bawa 2 mobil di hari Sabtu, cuci ke-2 diskon 50%. Anak-anak dapat es krim gratis.", badge: "Akhir pekan", category: "promo", active: true, hue: 25, createdAt: "2026-06-01" },
      { id: "ann-seed-3", title: "Selasa Cap Double", message: "Tiap cuci di hari Selasa dapat 2 cap. Penuhi kartu 2× lebih cepat bulan ini.", badge: "Member", category: "promo", active: true, hue: 150, createdAt: "2026-06-01" },
    ];
    localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(seed));
    return seed;
  }

  function saveAnnouncements(list) {
    try { localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function loadQueue() {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  function saveQueue(q) {
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch (e) {}
  }

  function loadCheckinLog() {
    try {
      const raw = localStorage.getItem(CHECKIN_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  function saveCheckinLog(log) {
    try { localStorage.setItem(CHECKIN_KEY, JSON.stringify(log)); } catch (e) {}
  }

  // Look up customer from localStorage (real user) or demo dataset
  function lookupCustomer(rawQuery) {
    const query = rawQuery.trim().toUpperCase().replace(/\s/g, "");
    if (!query) return null;

    // Parse QR payload: QSS-MEMBER|memberId|name|plate|tier|cap:stamps
    if (query.startsWith("QSS-MEMBER|") || rawQuery.trim().startsWith("QSS-MEMBER|")) {
      const parts = rawQuery.trim().split("|");
      if (parts.length >= 5) {
        const [, memberId, name, plate, tier, capPart] = parts;
        const stamps = parseInt((capPart || "cap:0").split(":")[1] || "0");
        return { memberId, name, plate, tier, stamps, freeWashes: 0, fromQR: true };
      }
    }

    // Check real user in localStorage
    try {
      const raw = localStorage.getItem("qss_user_v2");
      if (raw) {
        const u = JSON.parse(raw);
        const mid = (u.memberId || "").toUpperCase().replace(/\s/g, "");
        const plt = (u.plate || "").toUpperCase().replace(/\s/g, "");
        if (mid === query || plt === query || mid.includes(query)) return u;
      }
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
      d.memberId.replace(/-/g, "").includes(query.replace(/-/g, "")) ||
      d.memberId.toUpperCase() === rawQuery.trim().toUpperCase() ||
      d.plate.replace(/\s/g, "").toUpperCase() === query
    ) || null;
  }

  function addStampToCustomer(memberId) {
    try {
      const raw = localStorage.getItem("qss_user_v2");
      if (raw) {
        const u = JSON.parse(raw);
        if ((u.memberId || "").toUpperCase() === memberId.toUpperCase()) {
          let stamps = (u.stamps || 0) + 1;
          let freeWashes = u.freeWashes || 0;
          let earnedFreeWash = false;
          if (stamps >= 10) { stamps -= 10; freeWashes += 1; earnedFreeWash = true; }
          const updated = { ...u, stamps, freeWashes };
          localStorage.setItem("qss_user_v2", JSON.stringify(updated));
          return { success: true, stamps, freeWashes, earnedFreeWash, realUser: true };
        }
      }
    } catch (e) {}
    return { success: true, earnedFreeWash: false, demo: true };
  }

  window.QSS_OFFICER = {
    OFFICER_PIN,
    buildTodayBookings,
    loadAnnouncements, saveAnnouncements,
    loadQueue, saveQueue,
    loadCheckinLog, saveCheckinLog,
    lookupCustomer,
    addStampToCustomer,
  };
})();
