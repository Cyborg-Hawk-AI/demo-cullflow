import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Copy,
  Download,
  Eye,
  FolderOpen,
  Image,
  Sparkles,
} from "lucide-react";

const features = [
  {
    id: "ingest",
    icon: FolderOpen,
    title: "Batch RAW Ingest",
    location: "Demo → RAW Ingest tab",
    description:
      "Upload entire wedding card folders (CR3, NEF, ARW, DNG) without importing to local disk. Tracks per-card progress and queues files for GPU inference.",
    tryIt: [
      "Click 'Simulate card upload' to run a progress bar",
      "Watch SD card queue statuses update",
      "Click 'Start AI culling' to jump to the culling view",
    ],
    mocked: [
      "File upload is simulated with a progress bar — no actual S3 upload",
      "SD card list is hardcoded sample data",
      "EXIF extraction and thumbnail generation are not performed",
    ],
    production: [
      "Presigned multipart upload to S3 (s3://cullflow-raw/{tenant}/{wedding}/)",
      "Lambda on S3 ObjectCreated extracts EXIF, generates 512px thumbnails",
      "Step Functions orchestrates ingest → cull pipeline",
      "DynamoDB tracks per-file status: pending | processing | complete",
    ],
  },
  {
    id: "culling",
    icon: Sparkles,
    title: "AI Culling with Star/Flag Ratings",
    location: "Demo → AI Culling tab",
    description:
      "ML models score each image for composition, focus, and expression, then assign Lightroom-compatible star ratings (0–5) and color flag labels.",
    tryIt: [
      "Filter by star rating or flagged status using the filter bar",
      "Click stars on any thumbnail to override AI rating",
      "Click flag icon to toggle pick/reject flag",
      "Click a thumbnail to open the detail modal with full metadata",
      "Click 'Re-run AI cull' to simulate batch re-processing",
    ],
    mocked: [
      "Ratings are pre-seeded in mock data, not computed by ML",
      "Re-run cull animates a progress bar only",
      "Thumbnails are CSS gradients, not actual RAW previews",
    ],
    production: [
      "GPU workers (AWS Batch or Modal) run CLIP + custom wedding model",
      "Scores written to PostgreSQL: rating, flag, reject, confidence",
      "XMP sidecars generated with exiftool for Lightroom sync",
      "Photographer overrides stored and fed back as training signal",
    ],
  },
  {
    id: "bursts",
    icon: Copy,
    title: "Duplicate & Burst Grouping",
    location: "Demo → Burst Groups tab",
    description:
      "Sequences from first dances, bouquet tosses, and group shots are clustered by timestamp and perceptual hash. AI picks the best frame; photographer can override.",
    tryIt: [
      "Browse burst groups (First Dance, Ceremony Kiss, etc.)",
      "Click 'Set best' on any frame to change the group winner",
      "Click a thumbnail to inspect in the detail modal",
      "Watch the 'Best:' label update after selection",
    ],
    mocked: [
      "Groups are pre-defined with static photo sets",
      "Clustering algorithm is not executed",
      "Best-frame scoring is manual selection only",
    ],
    production: [
      "pHash + timestamp window (±2s) groups burst sequences",
      "Ensemble model scores sharpness + expression + composition per frame",
      "Non-best frames auto-rejected or down-rated to 1★",
      "Groups stored in Postgres with best_frame_id foreign key",
    ],
  },
  {
    id: "faces",
    icon: Eye,
    title: "Face Sharpness & Eyes-Open Detection",
    location: "Demo → Face Analysis tab",
    description:
      "Per-face focus scoring using Laplacian variance on face ROIs. Blink detection via eye aspect ratio. Images below threshold are flagged for review.",
    tryIt: [
      "Drag the sharpness threshold slider to filter flagged images",
      "Review the 'Flagged' grid of blinks and soft focus",
      "Click table rows to inspect individual files",
      "Watch counts update as threshold changes",
    ],
    mocked: [
      "Sharpness scores and eyes-open booleans are hardcoded",
      "No actual face detection or ROI cropping",
      "Threshold filtering is client-side only",
    ],
    production: [
      "RetinaFace or AWS Rekognition for face bounding boxes",
      "Laplacian variance computed on 256×256 face crops",
      "EAR (eye aspect ratio) < 0.2 flags blink",
      "Results cached in Redis for fast grid rendering",
    ],
  },
  {
    id: "gallery",
    icon: Image,
    title: "Client Gallery Generation & Delivery",
    location: "Demo → Client Gallery tab",
    description:
      "One-click generates a branded client gallery from rated selects, uploads to CDN, and emails a password-protected delivery link via SendGrid.",
    tryIt: [
      "Click 'Generate gallery' to create a delivery link",
      "Click 'Email link' to simulate SendGrid notification",
      "Click 'Copy' to copy the gallery URL",
      "Toggle between Grid and Slideshow preview modes",
      "Click gallery thumbnails to inspect",
    ],
    mocked: [
      "Gallery URL is constructed client-side, not hosted",
      "Email send shows a toast only",
      "View/download/favorite stats are static numbers",
      "No actual image resizing or CDN upload",
    ],
    production: [
      "Lambda + Sharp resizes selects to 2048px and 800px variants",
      "S3 + CloudFront hosts gallery assets",
      "Next.js SSR gallery page with optional password",
      "SendGrid template sends branded email to couple",
      "Stripe metered billing unaffected — flat rate covers all",
    ],
  },
  {
    id: "export",
    icon: Download,
    title: "Lightroom / Capture One Catalog Export",
    location: "Demo → Catalog Export tab",
    description:
      "Export rated selects as a ready-to-open Lightroom catalog or Capture One session, with XMP sidecars preserving star ratings and color labels.",
    tryIt: [
      "Toggle between Lightroom Classic and Capture One format",
      "Click 'Export' to open the progress modal",
      "Click 'Download when ready' in the modal",
      "Browse export history table and click Download rows",
    ],
    mocked: [
      "No actual .lrcat or .cosessiondb file is generated",
      "Export modal shows animated progress only",
      "History table is static sample data",
    ],
    production: [
      "exiftool writes XMP:Rating and xmp:Label per file",
      "Lightroom .lrcat built from SQL template with file paths",
      "Capture One session via COSessionDB import API",
      "Presigned S3 URL for zip download (catalog + XMP + JPEG previews)",
    ],
  },
  {
    id: "dashboard",
    icon: Camera,
    title: "Dashboard & Activity Feed",
    location: "Demo → Dashboard tab",
    description:
      "Overview of monthly throughput, hours saved, recent weddings, and real-time activity feed from the processing pipeline.",
    tryIt: [
      "Click stat cards for detail toasts",
      "Click chart bars for monthly breakdown",
      "Click wedding rows in the recent list",
      "Click activity feed items",
      "Use quick-nav buttons to jump to feature tabs",
    ],
    mocked: [
      "All metrics are hardcoded sample data",
      "Chart is CSS bars, not a real time-series query",
      "Activity feed is static, not websocket-driven",
    ],
    production: [
      "EventBridge events from pipeline → DynamoDB → API",
      "CloudWatch metrics for GPU utilization and queue depth",
      "WebSocket feed for real-time cull progress",
      "Aggregations computed nightly via scheduled Lambda",
    ],
  },
];

export const metadata = {
  title: "Developers — CullFlow",
  description: "Feature documentation for the CullFlow interactive demo.",
};

export default function DevelopersPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">
            Developer Documentation
          </h1>
          <p className="text-gray-400 leading-relaxed">
            This page documents every feature in the{" "}
            <Link href="/demo" className="text-brand-400 hover:underline">
              interactive demo
            </Link>
            : what it does, where to click, what is mocked vs. production, and
            the intended data flow for a real implementation.
          </p>
        </div>

        <div className="mb-12 card p-6">
          <h2 className="font-display text-xl font-semibold mb-4">
            Architecture overview
          </h2>
          <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
            <p>
              CullFlow is designed as a serverless pipeline: upload triggers
              async GPU inference, results populate a review UI, and delivery
              actions (gallery, export, email) are fire-and-forget jobs.
            </p>
            <pre className="rounded-lg bg-surface-900 p-4 text-xs text-gray-300 overflow-x-auto">
{`Photographer → S3 Upload → Lambda (EXIF) → Step Functions
    → GPU Batch (cull + faces + bursts) → PostgreSQL
    → Review UI (Next.js) → Gallery (S3/CF) + Export (S3)
    → SendGrid (email) + Stripe (billing)`}
            </pre>
            <p>
              <strong className="text-gray-300">This demo</strong> is 100%
              client-side React state with hardcoded data. No auth, no database,
              no environment variables. Deploys to Vercel with zero config.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {features.map((feature) => (
            <article key={feature.id} id={feature.id} className="card p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-lg bg-brand-500/10 p-3 text-brand-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-brand-400 mt-1">{feature.location}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    How to try it
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-500">
                    {feature.tryIt.map((item) => (
                      <li key={item} className="flex gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-400/80 mb-2">
                    Mocked in demo
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-500">
                    {feature.mocked.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-amber-500">○</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-400/80 mb-2">
                    Production plan
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-500">
                    {feature.production.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-green-500">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 card p-6">
          <h2 className="font-display text-xl font-semibold mb-4">
            DEV NOTE tooltips
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Throughout the demo, amber info icons (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs">
              i
            </span>
            ) appear beside major controls. Hover or click them for inline
            production architecture notes. These correspond to the &quot;Production
            plan&quot; sections above.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-500 transition-colors"
          >
            Open interactive demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
