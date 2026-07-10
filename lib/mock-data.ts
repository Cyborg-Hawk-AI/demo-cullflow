export interface Wedding {
  id: string;
  couple: string;
  date: string;
  venue: string;
  totalRaw: number;
  culled: number;
  selected: number;
  status: "processing" | "culling" | "review" | "gallery" | "delivered";
  photographer: string;
}

export interface Photo {
  id: string;
  filename: string;
  weddingId: string;
  stars: number;
  flagged: boolean;
  rejected: boolean;
  sharpness: number;
  eyesOpen: boolean;
  burstGroup?: string;
  isBestInBurst?: boolean;
  faces: number;
  thumbnail: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  message: string;
  type: "ingest" | "cull" | "gallery" | "export" | "system";
}

export interface BurstGroup {
  id: string;
  label: string;
  photos: Photo[];
  bestId: string;
}

export const weddings: Wedding[] = [
  {
    id: "w1",
    couple: "Emma & James Chen",
    date: "2026-06-14",
    venue: "The Barn at Willow Creek, Napa Valley",
    totalRaw: 3847,
    culled: 3847,
    selected: 412,
    status: "gallery",
    photographer: "Sarah Mitchell",
  },
  {
    id: "w2",
    couple: "Olivia & Marcus Rivera",
    date: "2026-06-21",
    venue: "Rosewood Miramar, Montecito",
    totalRaw: 2913,
    culled: 1840,
    selected: 0,
    status: "culling",
    photographer: "Sarah Mitchell",
  },
  {
    id: "w3",
    couple: "Priya & David Okonkwo",
    date: "2026-05-31",
    venue: "Brooklyn Botanic Garden, NYC",
    totalRaw: 2156,
    culled: 2156,
    selected: 287,
    status: "delivered",
    photographer: "Sarah Mitchell",
  },
  {
    id: "w4",
    couple: "Hannah & Tyler Brooks",
    date: "2026-07-04",
    venue: "Ocean House, Watch Hill RI",
    totalRaw: 4201,
    culled: 0,
    selected: 0,
    status: "processing",
    photographer: "Sarah Mitchell",
  },
];

const photoColors = [
  "from-rose-900/80 to-amber-900/60",
  "from-slate-800/80 to-blue-900/60",
  "from-emerald-900/80 to-teal-900/60",
  "from-purple-900/80 to-pink-900/60",
  "from-amber-900/80 to-orange-900/60",
  "from-cyan-900/80 to-indigo-900/60",
];

export function makePhotos(weddingId: string, count: number): Photo[] {
  const names = [
    "DSC_2847", "DSC_2848", "DSC_2849", "DSC_2850", "DSC_2851",
    "DSC_2852", "DSC_2853", "DSC_2854", "DSC_2855", "DSC_2856",
    "DSC_2857", "DSC_2858", "DSC_2859", "DSC_2860", "DSC_2861",
    "DSC_2862", "DSC_2863", "DSC_2864", "DSC_2865", "DSC_2866",
    "DSC_2867", "DSC_2868", "DSC_2869", "DSC_2870", "DSC_2871",
    "DSC_2872", "DSC_2873", "DSC_2874", "DSC_2875", "DSC_2876",
  ];
  return names.slice(0, count).map((filename, i) => ({
    id: `${weddingId}-p${i}`,
    filename: `${filename}.CR3`,
    weddingId,
    stars: [0, 0, 1, 2, 3, 4, 5][i % 7],
    flagged: i % 11 === 0,
    rejected: i % 13 === 0,
    sharpness: 55 + (i * 7) % 45,
    eyesOpen: i % 5 !== 0,
    burstGroup: i % 4 === 0 ? `burst-${Math.floor(i / 4)}` : undefined,
    isBestInBurst: i % 4 === 1,
    faces: (i % 4) + 1,
    thumbnail: photoColors[i % photoColors.length],
  }));
}

export const samplePhotos = makePhotos("w1", 30);

export const burstGroups: BurstGroup[] = [
  {
    id: "bg1",
    label: "First Dance — 8 frames",
    photos: samplePhotos.filter((p) => p.burstGroup === "burst-0" || p.id === "w1-p0" || p.id === "w1-p1" || p.id === "w1-p2" || p.id === "w1-p3"),
    bestId: "w1-p1",
  },
  {
    id: "bg2",
    label: "Ceremony Kiss — 6 frames",
    photos: samplePhotos.filter((p) => ["w1-p4", "w1-p5", "w1-p6", "w1-p7", "w1-p8", "w1-p9"].includes(p.id)),
    bestId: "w1-p6",
  },
  {
    id: "bg3",
    label: "Bridal Party Jump — 12 frames",
    photos: samplePhotos.filter((p) => ["w1-p12", "w1-p13", "w1-p14", "w1-p15", "w1-p16", "w1-p17"].includes(p.id)),
    bestId: "w1-p14",
  },
  {
    id: "bg4",
    label: "Golden Hour Couple — 5 frames",
    photos: samplePhotos.filter((p) => ["w1-p20", "w1-p21", "w1-p22", "w1-p23", "w1-p24"].includes(p.id)),
    bestId: "w1-p22",
  },
];

export const activityFeed: ActivityItem[] = [
  { id: "a1", time: "2 min ago", message: "AI culling completed for Emma & James — 412 selects from 3,847 RAWs", type: "cull" },
  { id: "a2", time: "18 min ago", message: "Burst group 'Golden Hour Couple' — best frame auto-selected (DSC_2869.CR3)", type: "cull" },
  { id: "a3", time: "34 min ago", message: "Gallery link sent to emma.chen@gmail.com via SendGrid", type: "gallery" },
  { id: "a4", time: "1 hr ago", message: "Lightroom catalog export ready — 287 selects for Priya & David", type: "export" },
  { id: "a5", time: "2 hr ago", message: "Ingest started: Olivia & Marcus — 2,913 CR3 files from SD card batch", type: "ingest" },
  { id: "a6", time: "3 hr ago", message: "Eyes-closed detection flagged 47 images in burst sequences", type: "cull" },
  { id: "a7", time: "5 hr ago", message: "Stripe subscription renewed — $49.00 Mitchell Photography Studio", type: "system" },
  { id: "a8", time: "Yesterday", message: "Client gallery viewed 23 times — Priya & David Okonkwo", type: "gallery" },
];

export const monthlyStats = {
  weddingsProcessed: 18,
  rawFilesIngested: 48293,
  hoursSaved: 94,
  galleriesDelivered: 16,
  avgCullTime: "22 min",
  avgManualTime: "6.2 hrs",
};

export const chartData = [
  { month: "Jan", processed: 12, saved: 58 },
  { month: "Feb", processed: 14, saved: 67 },
  { month: "Mar", processed: 16, saved: 78 },
  { month: "Apr", processed: 15, saved: 72 },
  { month: "May", processed: 17, saved: 85 },
  { month: "Jun", processed: 18, saved: 94 },
];

export const galleryPhotos = samplePhotos.filter((p) => p.stars >= 3 && !p.rejected).slice(0, 24);

export const GALLERY_LINK = "https://gallery.cullflow.app/mitchell/ema-james-2026";
