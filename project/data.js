// QSS Car Wash — data (Bahasa Indonesia). Exposed on window.QSS.
(function () {
  const fmtIDR = (n) => "Rp " + n.toLocaleString("id-ID");

  const TIERS = {
    basic: {
      id: "basic",
      name: "Basic",
      tagline: "Bayar per kunjungan",
      price: 0,
      priceLabel: "Gratis",
      period: "",
      accent: "slate",
      booking: false,
      washesPerMonth: null,
      perks: [
        { icon: "stamp", text: "Kumpulkan cap — 10 cuci = 1 cuci gratis" },
        { icon: "queue", text: "Antrean reguler tanpa booking" },
        { icon: "promo", text: "Akses promo bulanan" },
      ],
    },
    luxury: {
      id: "luxury",
      name: "Luxury",
      tagline: "Tanpa antre",
      price: 999000,
      priceLabel: "Rp 999.000",
      period: "/tahun",
      accent: "chrome",
      booking: true,
      washesPerMonth: 4,
      perks: [
        { icon: "wash", text: "Hingga 4× cuci mobil per bulan" },
        { icon: "glass", text: "1× pembersihan jamur kaca" },
        { icon: "interior", text: "1× pembersihan detail interior" },
        { icon: "drink", text: "Kopi / teh / es krim gratis tiap kunjungan" },
        { icon: "calendar", text: "Booking slot prioritas" },
      ],
    },
    premium: {
      id: "premium",
      name: "Premium",
      tagline: "Perawatan lengkap",
      price: 1499000,
      priceLabel: "Rp 1.499.000",
      period: "/tahun",
      accent: "aqua",
      booking: true,
      washesPerMonth: 10,
      perks: [
        { icon: "wash", text: "Hingga 10× cuci mobil per bulan" },
        { icon: "glass", text: "2× pembersihan jamur kaca per tahun" },
        { icon: "interior", text: "1× detailing eksterior + interior" },
        { icon: "drink", text: "Kopi / teh / es krim gratis tiap kunjungan" },
        { icon: "calendar", text: "Booking slot prioritas" },
      ],
    },
  };

  const PROMOS = [
    {
      id: "p1",
      month: "JUNI",
      badge: "Bulan ini",
      title: "Perisai Musim Hujan",
      desc: "Gratis pembersihan jamur kaca untuk setiap Cuci Premium. Lawan noda air.",
      tag: "Add-on gratis",
      hue: 200,
    },
    {
      id: "p2",
      month: "JUNI",
      badge: "Akhir pekan",
      title: "Sabtu Keluarga",
      desc: "Bawa 2 mobil di hari Sabtu, cuci ke-2 diskon 50%. Anak-anak dapat es krim gratis.",
      tag: "Diskon 50% mobil ke-2",
      hue: 25,
    },
    {
      id: "p3",
      month: "JUNI",
      badge: "Member",
      title: "Selasa Cap Double",
      desc: "Tiap cuci di hari Selasa dapat 2 cap. Penuhi kartu 2× lebih cepat.",
      tag: "2× cap",
      hue: 150,
    },
    {
      id: "p4",
      month: "JUNI",
      badge: "Terbatas",
      title: "Upgrade & Hemat",
      desc: "Naik ke Premium bulan ini dan dapatkan cuci bulan pertama plus detailing gratis.",
      tag: "Detailing gratis",
      hue: 280,
    },
  ];

  const STAMP_HISTORY = [
    { id: "s7", date: "2026-05-28", label: "Cuci Premium", stamps: 1 },
    { id: "s6", date: "2026-05-19", label: "Cuci Kilat", stamps: 1 },
    { id: "s5", date: "2026-05-11", label: "Cuci Premium · Selasa Double", stamps: 2 },
    { id: "s4", date: "2026-04-30", label: "Cuci Kilat", stamps: 1 },
    { id: "s3", date: "2026-04-18", label: "Cuci Premium", stamps: 1 },
    { id: "s2", date: "2026-04-06", label: "Cuci Kilat", stamps: 1 },
    { id: "s1", date: "2026-03-25", label: "Cuci Premium", stamps: 1 },
  ];

  const WASH_TYPES = [
    { id: "express", name: "Cuci Kilat", mins: 25, desc: "Cuci busa eksterior + keringkan", priceLabel: "Rp 50.000" },
    { id: "premium", name: "Cuci Premium", mins: 45, desc: "Eksterior + vakum interior + semir ban", priceLabel: "Rp 95.000" },
    { id: "detail", name: "Detailing", mins: 120, desc: "Detailing interior + eksterior lengkap", priceLabel: "Rp 350.000" },
  ];

  function buildSlots() {
    const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    return times.map((t, i) => ({
      time: t,
      status: [2, 5].includes(i) ? "full" : i === 7 ? "few" : "open",
    }));
  }

  function buildDays() {
    const out = [];
    const base = new Date("2026-06-01T00:00:00");
    const dow = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    for (let i = 0; i < 10; i++) {
      const d = new Date(base.getTime() + i * 86400000);
      out.push({
        iso: d.toISOString().slice(0, 10),
        dow: dow[d.getDay()],
        day: d.getDate(),
        isWeekend: [0, 6].includes(d.getDay()),
      });
    }
    return out;
  }

  const DEFAULT_USER = {
    onboarded: false,
    name: "",
    phone: "",
    email: "",
    plate: "",
    carModel: "",
    carColor: "Silver",
    tier: "basic",
    stamps: 7,
    freeWashes: 0,
    washesUsedThisMonth: 1,
    memberId: "QSS-" + Math.floor(100000 + Math.random() * 899999),
    bookings: [
      {
        id: "b-seed",
        dateISO: "2026-06-03",
        time: "10:00",
        washType: "premium",
        status: "upcoming",
      },
    ],
  };

  window.QSS = {
    fmtIDR,
    TIERS,
    TIER_ORDER: ["basic", "luxury", "premium"],
    PROMOS,
    STAMP_HISTORY,
    WASH_TYPES,
    buildSlots,
    buildDays,
    DEFAULT_USER,
    STAMP_GOAL: 10,
  };
})();
