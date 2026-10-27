// UI шатанд ашиглах түр өгөгдөл. Backend холбогдоход API-аар солигдоно.

export type ContentStatus = "published" | "draft" | "scheduled" | "archived";

export const movies = [
  { id: 1, title: "Тэнгэрийн хаалга", type: "Кино", genre: "Драм", year: 2025, duration: "2ц 14м", views: 128400, rating: 4.7, status: "published" as ContentStatus },
  { id: 2, title: "Нүүдэлчдийн домог", type: "Цуврал", genre: "Түүхэн", year: 2024, duration: "12 анги", views: 98200, rating: 4.8, status: "published" as ContentStatus },
  { id: 3, title: "Хотын гэрэл", type: "Кино", genre: "Романтик", year: 2025, duration: "1ц 52м", views: 76500, rating: 4.3, status: "published" as ContentStatus },
  { id: 4, title: "Шөнийн анчин", type: "Кино", genre: "Триллер", year: 2026, duration: "2ц 03м", views: 0, rating: 0, status: "scheduled" as ContentStatus },
  { id: 5, title: "Говийн нууц", type: "Баримтат", genre: "Баримтат", year: 2023, duration: "1ц 28м", views: 41200, rating: 4.5, status: "published" as ContentStatus },
  { id: 6, title: "Сүүлчийн тоглолт", type: "Кино", genre: "Спорт", year: 2024, duration: "1ц 47м", views: 35800, rating: 4.1, status: "published" as ContentStatus },
  { id: 7, title: "Од эрхэс", type: "Цуврал", genre: "Шинжлэх ухаан", year: 2026, duration: "8 анги", views: 0, rating: 0, status: "draft" as ContentStatus },
  { id: 8, title: "Хүүхэд насны зун", type: "Кино", genre: "Гэр бүл", year: 2022, duration: "1ц 35м", views: 22100, rating: 3.9, status: "archived" as ContentStatus },
  { id: 9, title: "Мөнгөн хөндий", type: "Кино", genre: "Адал явдал", year: 2025, duration: "2ц 20м", views: 64300, rating: 4.4, status: "published" as ContentStatus },
  { id: 10, title: "Инээдийн цаг", type: "Шоу", genre: "Инээдмийн", year: 2026, duration: "24 анги", views: 51900, rating: 4.2, status: "published" as ContentStatus },
];

export type UserPlan = "Premium" | "Standard" | "Basic" | "Free";
export type UserStatus = "active" | "suspended" | "pending";

export const users = [
  { id: 1, name: "Бат-Эрдэнэ Ганбаатар", email: "bat@example.com", plan: "Premium" as UserPlan, status: "active" as UserStatus, joined: "2025-03-12", watchHours: 312 },
  { id: 2, name: "Сарангэрэл Дорж", email: "saraa@example.com", plan: "Standard" as UserPlan, status: "active" as UserStatus, joined: "2025-06-02", watchHours: 154 },
  { id: 3, name: "Тэмүүлэн Болд", email: "temuulen@example.com", plan: "Basic" as UserPlan, status: "pending" as UserStatus, joined: "2026-10-20", watchHours: 3 },
  { id: 4, name: "Номин-Эрдэнэ Пүрэв", email: "nomin@example.com", plan: "Premium" as UserPlan, status: "active" as UserStatus, joined: "2024-11-30", watchHours: 540 },
  { id: 5, name: "Ганзориг Цэрэн", email: "ganzo@example.com", plan: "Free" as UserPlan, status: "suspended" as UserStatus, joined: "2025-01-18", watchHours: 27 },
  { id: 6, name: "Анужин Мөнх", email: "anujin@example.com", plan: "Standard" as UserPlan, status: "active" as UserStatus, joined: "2025-09-07", watchHours: 98 },
  { id: 7, name: "Энхжин Сүх", email: "enkhjin@example.com", plan: "Free" as UserPlan, status: "active" as UserStatus, joined: "2026-08-14", watchHours: 12 },
  { id: 8, name: "Билгүүн Отгон", email: "bilguun@example.com", plan: "Premium" as UserPlan, status: "active" as UserStatus, joined: "2024-05-21", watchHours: 721 },
];

export const admins = [
  { id: 1, name: "Админ", email: "admin@example.com", role: "Super Admin", lastActive: "Одоо", twoFA: true },
  { id: 2, name: "Оюун Батсүх", email: "oyun@example.com", role: "Контент менежер", lastActive: "12 мин өмнө", twoFA: true },
  { id: 3, name: "Мөнхбат Ганаа", email: "munkhbat@example.com", role: "Модератор", lastActive: "2 цаг өмнө", twoFA: false },
  { id: 4, name: "Хулан Даваа", email: "khulan@example.com", role: "Санхүү", lastActive: "Өчигдөр", twoFA: true },
  { id: 5, name: "Эрдэнэ Түвшин", email: "erdene@example.com", role: "Дэмжлэг", lastActive: "3 өдрийн өмнө", twoFA: false },
];

export const roles = [
  { name: "Super Admin", description: "Бүх эрх", count: 1 },
  { name: "Контент менежер", description: "Кино, цуврал удирдах", count: 1 },
  { name: "Модератор", description: "Сэтгэгдэл, үнэлгээ хянах", count: 1 },
  { name: "Санхүү", description: "Төлбөр, тайлан харах", count: 1 },
  { name: "Дэмжлэг", description: "Хэрэглэгчийн асуудал шийдэх", count: 1 },
];

export type ReviewStatus = "approved" | "pending" | "flagged";

export const reviews = [
  { id: 1, user: "Номин-Эрдэнэ Пүрэв", movie: "Нүүдэлчдийн домог", rating: 5, text: "Гайхалтай найруулга, жүжигчид маш сайн тоглосон. Дараагийн улирлыг хүлээж байна!", date: "2026-10-26", status: "approved" as ReviewStatus },
  { id: 2, user: "Ганзориг Цэрэн", movie: "Хотын гэрэл", rating: 1, text: "Энэ спам холбоос дээр дарж үнэгүй үзээрэй...", date: "2026-10-26", status: "flagged" as ReviewStatus },
  { id: 3, user: "Анужин Мөнх", movie: "Тэнгэрийн хаалга", rating: 4, text: "Сэтгэл хөдөлгөм түүх. Төгсгөл нь жаахан хурдан болсон санагдлаа.", date: "2026-10-25", status: "pending" as ReviewStatus },
  { id: 4, user: "Билгүүн Отгон", movie: "Мөнгөн хөндий", rating: 5, text: "Зураг авалт нь үнэхээр үзэсгэлэнтэй, Монгол байгалийг сайхан харуулсан.", date: "2026-10-24", status: "approved" as ReviewStatus },
  { id: 5, user: "Энхжин Сүх", movie: "Инээдийн цаг", rating: 3, text: "Зарим анги нь инээдтэй, заримыг нь давтаад байх шиг.", date: "2026-10-24", status: "pending" as ReviewStatus },
  { id: 6, user: "Сарангэрэл Дорж", movie: "Говийн нууц", rating: 4, text: "Маш их мэдээлэл авлаа, хүүхдүүддээ үзүүлнэ.", date: "2026-10-23", status: "approved" as ReviewStatus },
];

export const plans = [
  { name: "Free", price: 0, subscribers: 18420, features: ["Зар сурталчилгаатай", "SD чанар", "1 төхөөрөмж"] },
  { name: "Basic", price: 9900, subscribers: 7310, features: ["Зар сурталчилгаагүй", "HD чанар", "1 төхөөрөмж"] },
  { name: "Standard", price: 14900, subscribers: 5240, features: ["Full HD", "2 төхөөрөмж", "Татаж үзэх"] },
  { name: "Premium", price: 19900, subscribers: 3680, features: ["4K + HDR", "4 төхөөрөмж", "Шинэ кино эрт үзэх"] },
];

export type TxStatus = "paid" | "failed" | "refunded";

export const transactions = [
  { id: "TX-10482", user: "Билгүүн Отгон", plan: "Premium", amount: 19900, method: "QPay", date: "2026-10-27", status: "paid" as TxStatus },
  { id: "TX-10481", user: "Сарангэрэл Дорж", plan: "Standard", amount: 14900, method: "SocialPay", date: "2026-10-27", status: "paid" as TxStatus },
  { id: "TX-10480", user: "Тэмүүлэн Болд", plan: "Basic", amount: 9900, method: "Карт", date: "2026-10-26", status: "failed" as TxStatus },
  { id: "TX-10479", user: "Номин-Эрдэнэ Пүрэв", plan: "Premium", amount: 19900, method: "QPay", date: "2026-10-26", status: "paid" as TxStatus },
  { id: "TX-10478", user: "Ганзориг Цэрэн", plan: "Standard", amount: 14900, method: "Карт", date: "2026-10-25", status: "refunded" as TxStatus },
  { id: "TX-10477", user: "Анужин Мөнх", plan: "Standard", amount: 14900, method: "QPay", date: "2026-10-25", status: "paid" as TxStatus },
];

export const monthlyViews = [
  { label: "5-р", value: 182000 },
  { label: "6-р", value: 205000 },
  { label: "7-р", value: 248000 },
  { label: "8-р", value: 231000 },
  { label: "9-р", value: 276000 },
  { label: "10-р", value: 312000 },
];

export const monthlyRevenue = [
  { label: "5-р", value: 312 },
  { label: "6-р", value: 338 },
  { label: "7-р", value: 361 },
  { label: "8-р", value: 355 },
  { label: "9-р", value: 389 },
  { label: "10-р", value: 421 },
];

export const genreShare = [
  { label: "Драм", value: 32 },
  { label: "Түүхэн", value: 21 },
  { label: "Инээдмийн", value: 17 },
  { label: "Триллер", value: 14 },
  { label: "Баримтат", value: 9 },
  { label: "Бусад", value: 7 },
];

export const deviceShare = [
  { label: "Ухаалаг ТВ", value: 41 },
  { label: "Гар утас", value: 35 },
  { label: "Компьютер", value: 18 },
  { label: "Таблет", value: 6 },
];

export const activity = [
  { who: "Оюун Батсүх", what: "\"Шөнийн анчин\" киног 11/01-нд нийтлэхээр товлолоо", when: "12 мин" },
  { who: "Мөнхбат Ганаа", what: "Спам сэтгэгдэл 3-ыг устгалаа", when: "1 цаг" },
  { who: "Систем", what: "Сарын төлбөрийн тайлан бэлэн боллоо", when: "3 цаг" },
  { who: "Хулан Даваа", what: "TX-10478 гүйлгээг буцаан олголоо", when: "5 цаг" },
  { who: "Админ", what: "Шинэ админ Эрдэнэ Түвшинг нэмлээ", when: "Өчигдөр" },
];

export function formatMNT(n: number) {
  return `₮${n.toLocaleString("en-US")}`;
}

export function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ── Контент ────────────────────────────────────────────

export const series = [
  { id: 1, title: "Нүүдэлчдийн домог", seasons: [{ n: 1, episodes: 10 }, { n: 2, episodes: 12 }], status: "published" as ContentStatus, genre: "Түүхэн" },
  { id: 2, title: "Од эрхэс", seasons: [{ n: 1, episodes: 8 }], status: "draft" as ContentStatus, genre: "Шинжлэх ухаан" },
  { id: 3, title: "Инээдийн цаг", seasons: [{ n: 1, episodes: 12 }, { n: 2, episodes: 12 }, { n: 3, episodes: 6 }], status: "published" as ContentStatus, genre: "Инээдмийн" },
  { id: 4, title: "Хотын шөнө", seasons: [{ n: 1, episodes: 10 }], status: "scheduled" as ContentStatus, genre: "Триллер" },
];

export const episodes = [
  { n: 1, title: "Эхлэл", duration: "48м", views: 22100, status: "published" as ContentStatus },
  { n: 2, title: "Тал нутгийн салхи", duration: "51м", views: 19800, status: "published" as ContentStatus },
  { n: 3, title: "Андын тангараг", duration: "46м", views: 18200, status: "published" as ContentStatus },
  { n: 4, title: "Хаан ширээ", duration: "52м", views: 16900, status: "published" as ContentStatus },
  { n: 5, title: "Урвагч", duration: "49м", views: 0, status: "scheduled" as ContentStatus },
  { n: 6, title: "Төгсгөлийн тулаан", duration: "58м", views: 0, status: "draft" as ContentStatus },
];

export const genres = [
  { name: "Драм", slug: "drama", count: 142, visible: true },
  { name: "Инээдмийн", slug: "comedy", count: 98, visible: true },
  { name: "Триллер", slug: "thriller", count: 76, visible: true },
  { name: "Түүхэн", slug: "historical", count: 41, visible: true },
  { name: "Романтик", slug: "romance", count: 63, visible: true },
  { name: "Адал явдал", slug: "adventure", count: 55, visible: true },
  { name: "Баримтат", slug: "documentary", count: 37, visible: true },
  { name: "Хүүхэд", slug: "kids", count: 29, visible: false },
];

export const categories = [
  { name: "Монгол кино", count: 86 },
  { name: "Шинээр нэмэгдсэн", count: 24 },
  { name: "Шагналт бүтээл", count: 18 },
  { name: "Гэр бүлээрээ", count: 47 },
];

export const cast = [
  { id: 1, name: "Батбаяр Нямдорж", role: "Жүжигчин", works: 14, born: 1986 },
  { id: 2, name: "Оюунчимэг Дашдаваа", role: "Жүжигчин", works: 22, born: 1979 },
  { id: 3, name: "Төмөрбаатар Ганболд", role: "Найруулагч", works: 9, born: 1975 },
  { id: 4, name: "Наранцэцэг Баяр", role: "Жүжигчин", works: 7, born: 1995 },
  { id: 5, name: "Энхтайван Лхагва", role: "Зохиолч", works: 11, born: 1982 },
  { id: 6, name: "Мөнх-Очир Сэргэлэн", role: "Продюсер", works: 16, born: 1980 },
];

export const trailers = [
  { id: 1, title: "Шөнийн анчин — Албан ёсны трейлер", movie: "Шөнийн анчин", duration: "2:14", views: 48200, status: "published" as ContentStatus },
  { id: 2, title: "Од эрхэс — Тизер", movie: "Од эрхэс", duration: "0:58", views: 12100, status: "published" as ContentStatus },
  { id: 3, title: "Мөнгөн хөндий — Трейлер 2", movie: "Мөнгөн хөндий", duration: "2:31", views: 30400, status: "published" as ContentStatus },
  { id: 4, title: "Хотын шөнө — Анхны харагдац", movie: "Хотын шөнө", duration: "1:12", views: 0, status: "draft" as ContentStatus },
];

export const mediaFiles = [
  { name: "tengeriin_haalga_4k.mp4", type: "video", size: "18.4 GB", uploaded: "2026-10-24", status: "ready" },
  { name: "shuniin_anchin_master.mov", type: "video", size: "42.1 GB", uploaded: "2026-10-26", status: "processing" },
  { name: "nuudelchid_s2e5.mp4", type: "video", size: "6.2 GB", uploaded: "2026-10-25", status: "ready" },
  { name: "poster_mungun_hundii.jpg", type: "image", size: "2.4 MB", uploaded: "2026-10-22", status: "ready" },
  { name: "banner_halloween.png", type: "image", size: "3.1 MB", uploaded: "2026-10-20", status: "ready" },
  { name: "od_erhes_mn.srt", type: "subtitle", size: "84 KB", uploaded: "2026-10-19", status: "ready" },
  { name: "hotiin_shunu_ep1.mp4", type: "video", size: "5.8 GB", uploaded: "2026-10-27", status: "failed" },
];

export const collections = [
  { id: 1, name: "Нүүр баннер", type: "Баннер", items: 5, placement: "Нүүр — дээд", active: true },
  { id: 2, name: "Энэ долоо хоногийн топ 10", type: "Жагсаалт", items: 10, placement: "Нүүр — 1-р мөр", active: true },
  { id: 3, name: "Монгол кино", type: "Жагсаалт", items: 24, placement: "Нүүр — 2-р мөр", active: true },
  { id: 4, name: "Halloween онцлох", type: "Баннер", items: 3, placement: "Нүүр — дээд", active: false },
  { id: 5, name: "Гэр бүлээрээ үзэх", type: "Жагсаалт", items: 18, placement: "Нүүр — 4-р мөр", active: true },
];

// ── Хяналтын самбар ─────────────────────────────────────

export const nowWatching = [
  { user: "Билгүүн Отгон", title: "Нүүдэлчдийн домог · S2E4", device: "Ухаалаг ТВ", progress: 62 },
  { user: "Сарангэрэл Дорж", title: "Хотын гэрэл", device: "Гар утас", progress: 18 },
  { user: "Номин-Эрдэнэ Пүрэв", title: "Мөнгөн хөндий", device: "Компьютер", progress: 87 },
  { user: "Анужин Мөнх", title: "Инээдийн цаг · S3E2", device: "Таблет", progress: 41 },
  { user: "Энхжин Сүх", title: "Тэнгэрийн хаалга", device: "Ухаалаг ТВ", progress: 9 },
];

// ── Хэрэглэгч ──────────────────────────────────────────

export const devices = [
  { user: "Билгүүн Отгон", profiles: ["Билгүүн", "Хүүхдүүд"], device: "Samsung Smart TV", os: "Tizen", lastSeen: "Одоо" },
  { user: "Билгүүн Отгон", profiles: ["Билгүүн"], device: "iPhone 16", os: "iOS 20", lastSeen: "3 цаг өмнө" },
  { user: "Номин-Эрдэнэ Пүрэв", profiles: ["Номин", "Ээж", "Хүүхэд"], device: "Chrome", os: "Windows 11", lastSeen: "Одоо" },
  { user: "Сарангэрэл Дорж", profiles: ["Сараа"], device: "Galaxy S25", os: "Android 16", lastSeen: "Одоо" },
  { user: "Анужин Мөнх", profiles: ["Анужин", "Найз"], device: "iPad Air", os: "iPadOS 20", lastSeen: "Өчигдөр" },
];

export const blockedUsers = [
  { id: 5, name: "Ганзориг Цэрэн", email: "ganzo@example.com", reason: "Спам сэтгэгдэл", blockedAt: "2026-10-26", by: "Мөнхбат Ганаа", until: "Тодорхойгүй" },
  { id: 11, name: "Туяа Батболд", email: "tuyaa@example.com", reason: "Данс хуваалцсан", blockedAt: "2026-10-21", by: "Систем", until: "2026-11-21" },
  { id: 12, name: "Даваа Чулуун", email: "davaa@example.com", reason: "Залилангийн төлбөр", blockedAt: "2026-10-14", by: "Хулан Даваа", until: "Тодорхойгүй" },
];

// ── Төлбөр ─────────────────────────────────────────────

export const promos = [
  { code: "WELCOME50", discount: "50%", type: "Шинэ хэрэглэгч", used: 1240, limit: 5000, expires: "2026-12-31", active: true },
  { code: "TSAGAANSAR", discount: "₮5,000", type: "Бүгд", used: 3800, limit: 3800, expires: "2026-02-28", active: false },
  { code: "PREMIUM3", discount: "3 сар үнэгүй", type: "Premium", used: 210, limit: 500, expires: "2026-11-30", active: true },
  { code: "STUDENT", discount: "30%", type: "Оюутан", used: 960, limit: 0, expires: "—", active: true },
];

export type RefundStatus = "approved" | "pending" | "rejected";

export const refunds = [
  { id: "RF-2031", tx: "TX-10478", user: "Ганзориг Цэрэн", amount: 14900, reason: "Давхар төлөгдсөн", date: "2026-10-25", status: "approved" as RefundStatus },
  { id: "RF-2030", tx: "TX-10462", user: "Тэмүүлэн Болд", amount: 9900, reason: "Видео тоглохгүй байна", date: "2026-10-24", status: "pending" as RefundStatus },
  { id: "RF-2029", tx: "TX-10455", user: "Энхжин Сүх", amount: 19900, reason: "Санамсаргүй сунгасан", date: "2026-10-22", status: "pending" as RefundStatus },
  { id: "RF-2028", tx: "TX-10431", user: "Даваа Чулуун", amount: 19900, reason: "Шалтгаангүй", date: "2026-10-18", status: "rejected" as RefundStatus },
];

// ── Аналитик ───────────────────────────────────────────

export const retentionCohorts = [
  { cohort: "5-р сар", users: 2410, months: [100, 72, 61, 55, 51, 48] },
  { cohort: "6-р сар", users: 2680, months: [100, 75, 64, 58, 53] },
  { cohort: "7-р сар", users: 3120, months: [100, 78, 66, 60] },
  { cohort: "8-р сар", users: 2950, months: [100, 74, 63] },
  { cohort: "9-р сар", users: 3340, months: [100, 79] },
  { cohort: "10-р сар", users: 3610, months: [100] },
];

export const recoCtr = [
  { label: "5-р", value: 18.2 },
  { label: "6-р", value: 19.6 },
  { label: "7-р", value: 21.4 },
  { label: "8-р", value: 22.1 },
  { label: "9-р", value: 24.8 },
  { label: "10-р", value: 26.3 },
];

// ── Маркетинг ──────────────────────────────────────────

export type CampaignStatus = "sent" | "scheduled" | "draft";

export const pushCampaigns = [
  { id: 1, title: "Шөнийн анчин 11/01-нд гарна! 🎬", audience: "Бүх хэрэглэгч", sent: 34210, opened: 8120, date: "2026-10-26", status: "sent" as CampaignStatus },
  { id: 2, title: "Таны үзэж байсан цувралын шинэ анги", audience: "Нүүдэлчид үзэгчид", sent: 9840, opened: 4630, date: "2026-10-24", status: "sent" as CampaignStatus },
  { id: 3, title: "Premium 3 сар үнэгүй — зөвхөн энэ сард", audience: "Free хэрэглэгч", sent: 0, opened: 0, date: "2026-10-30", status: "scheduled" as CampaignStatus },
  { id: 4, title: "Халлоуины онцлох кинонууд 🎃", audience: "Бүх хэрэглэгч", sent: 0, opened: 0, date: "—", status: "draft" as CampaignStatus },
];

export const emailCampaigns = [
  { id: 1, name: "10-р сарын шинэ кинонууд", subject: "Энэ сард юу үзэх вэ?", audience: "Бүх захиалагч", sent: 16230, openRate: 38.4, clickRate: 9.1, status: "sent" as CampaignStatus },
  { id: 2, name: "Буцаж ирээрэй", subject: "Бид таныг санаж байна 💔", audience: "Цуцалсан хэрэглэгч", sent: 2140, openRate: 22.7, clickRate: 4.3, status: "sent" as CampaignStatus },
  { id: 3, name: "Төлбөр сануулга", subject: "Таны багц 3 хоногийн дараа дуусна", audience: "Дуусах гэж буй", sent: 0, openRate: 0, clickRate: 0, status: "scheduled" as CampaignStatus },
];

// ── Тусламж ────────────────────────────────────────────

export type TicketStatus = "open" | "in_progress" | "resolved";
export type Priority = "high" | "medium" | "low";

export const tickets = [
  { id: "#4821", subject: "Видео тасалдаад байна", user: "Сарангэрэл Дорж", category: "Техник", priority: "high" as Priority, status: "open" as TicketStatus, updated: "10 мин" },
  { id: "#4820", subject: "Төлбөр давхар гарсан", user: "Тэмүүлэн Болд", category: "Төлбөр", priority: "high" as Priority, status: "in_progress" as TicketStatus, updated: "1 цаг" },
  { id: "#4819", subject: "Хадмал орчуулга буруу цагтай", user: "Анужин Мөнх", category: "Контент", priority: "medium" as Priority, status: "open" as TicketStatus, updated: "3 цаг" },
  { id: "#4818", subject: "Нууц үг сэргээх имэйл ирэхгүй", user: "Энхжин Сүх", category: "Данс", priority: "medium" as Priority, status: "in_progress" as TicketStatus, updated: "5 цаг" },
  { id: "#4817", subject: "Smart TV дээр апп нээгдэхгүй", user: "Билгүүн Отгон", category: "Техник", priority: "low" as Priority, status: "resolved" as TicketStatus, updated: "Өчигдөр" },
];

export const faqs = [
  { q: "Багцаа хэрхэн солих вэ?", a: "Профайл → Багц хэсэгт орж хүссэн багцаа сонгоно. Шинэ үнэ дараагийн төлбөрийн өдрөөс эхэлнэ.", category: "Төлбөр", views: 4210 },
  { q: "Хэдэн төхөөрөмж дээр зэрэг үзэж болох вэ?", a: "Basic — 1, Standard — 2, Premium — 4 төхөөрөмж дээр зэрэг үзэх боломжтой.", category: "Данс", views: 3180 },
  { q: "Кино татаж аваад офлайн үзэж болох уу?", a: "Standard болон Premium багцад гар утасны апп-аар татаж үзэх боломжтой.", category: "Үзэх", views: 2740 },
  { q: "Хадмал орчуулгыг хэрхэн асаах вэ?", a: "Тоглуулагчийн баруун доод буланд байрлах CC товчийг дарж хэлээ сонгоно.", category: "Үзэх", views: 1960 },
  { q: "Төлбөрөө хэрхэн буцаан авах вэ?", a: "Тусламж хэсэгт хүсэлт илгээнэ үү. 3 ажлын өдөрт шийдвэрлэнэ.", category: "Төлбөр", views: 1520 },
];

// ── Админ ──────────────────────────────────────────────

export const auditLog = [
  { who: "Оюун Батсүх", action: "Контент товлосон", target: "Шөнийн анчин", ip: "202.131.x.x", time: "2026-10-27 14:22" },
  { who: "Мөнхбат Ганаа", action: "Сэтгэгдэл устгасан", target: "Review #8812", ip: "202.131.x.x", time: "2026-10-27 13:05" },
  { who: "Хулан Даваа", action: "Буцаалт зөвшөөрсөн", target: "RF-2031", ip: "103.57.x.x", time: "2026-10-27 09:41" },
  { who: "Админ", action: "Админ нэмсэн", target: "Эрдэнэ Түвшин", ip: "202.131.x.x", time: "2026-10-26 18:10" },
  { who: "Админ", action: "Тохиргоо өөрчилсөн", target: "DRM хамгаалалт", ip: "202.131.x.x", time: "2026-10-26 17:55" },
  { who: "Систем", action: "Хэрэглэгч хаасан", target: "Туяа Батболд", ip: "—", time: "2026-10-21 03:00" },
  { who: "Оюун Батсүх", action: "Баннер идэвхгүй болгосон", target: "Halloween онцлох", ip: "202.131.x.x", time: "2026-10-20 11:30" },
];
