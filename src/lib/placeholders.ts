// Backend-тэй холбогдоогүй хэсгүүдийн хоосон өгөгдөл.
// Хэсэг бүрийг MongoDB-тэй холбоход эндээс хасаж, src/lib/data/ доторх функцээр солино.

export type ContentStatus = "published" | "draft" | "scheduled" | "archived";
export type UserPlan = "Premium" | "Standard" | "Basic" | "Free";
export type UserStatus = "active" | "suspended" | "pending";
export type ReviewStatus = "approved" | "pending" | "flagged";
export type TxStatus = "paid" | "failed" | "refunded";
export type RefundStatus = "approved" | "pending" | "rejected";
export type CampaignStatus = "sent" | "scheduled" | "draft";
export type TicketStatus = "open" | "in_progress" | "resolved";
export type Priority = "high" | "medium" | "low";

type Point = { label: string; value: number };

export const movies: {
  id: number;
  title: string;
  type: string;
  genre: string;
  year: number;
  duration: string;
  views: number;
  rating: number;
  status: ContentStatus;
}[] = [];

export const series: { id: number; title: string; seasons: { n: number; episodes: number }[]; status: ContentStatus; genre: string }[] = [];
export const episodes: { n: number; title: string; duration: string; views: number; status: ContentStatus }[] = [];
export const genres: { name: string; slug: string; count: number; visible: boolean }[] = [];
export const categories: { name: string; count: number }[] = [];
export const cast: { id: number; name: string; role: string; works: number; born: number }[] = [];
export const trailers: { id: number; title: string; movie: string; duration: string; views: number; status: ContentStatus }[] = [];
export const mediaFiles: { name: string; type: string; size: string; uploaded: string; status: string }[] = [];
export const collections: { id: number; name: string; type: string; items: number; placement: string; active: boolean }[] = [];

export const users: { id: number; name: string; email: string; plan: UserPlan; status: UserStatus; joined: string; watchHours: number }[] = [];
export const devices: { user: string; profiles: string[]; device: string; os: string; lastSeen: string }[] = [];
export const blockedUsers: { id: number; name: string; email: string; reason: string; blockedAt: string; by: string; until: string }[] = [];

export const reviews: { id: number; user: string; movie: string; rating: number; text: string; date: string; status: ReviewStatus }[] = [];

export const plans: { name: string; price: number; subscribers: number; features: string[] }[] = [];
export const transactions: { id: string; user: string; plan: string; amount: number; method: string; date: string; status: TxStatus }[] = [];
export const promos: { code: string; discount: string; type: string; used: number; limit: number; expires: string; active: boolean }[] = [];
export const refunds: { id: string; tx: string; user: string; amount: number; reason: string; date: string; status: RefundStatus }[] = [];

export const monthlyViews: Point[] = [];
export const monthlyRevenue: Point[] = [];
export const genreShare: Point[] = [];
export const deviceShare: Point[] = [];
export const recoCtr: Point[] = [];
export const retentionCohorts: { cohort: string; users: number; months: number[] }[] = [];

export const activity: { who: string; what: string; when: string }[] = [];
export const nowWatching: { user: string; title: string; device: string; progress: number }[] = [];

export const pushCampaigns: { id: number; title: string; audience: string; sent: number; opened: number; date: string; status: CampaignStatus }[] = [];
export const emailCampaigns: { id: number; name: string; subject: string; audience: string; sent: number; openRate: number; clickRate: number; status: CampaignStatus }[] = [];

export const tickets: { id: string; subject: string; user: string; category: string; priority: Priority; status: TicketStatus; updated: string }[] = [];
export const faqs: { q: string; a: string; category: string; views: number }[] = [];

export const auditLog: { who: string; action: string; target: string; ip: string; time: string }[] = [];
