"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Camera,
  ChevronRight,
  Copy,
  Download,
  Eye,
  Flag,
  FolderOpen,
  Image,
  LayoutDashboard,
  Send,
  Settings,
  Sparkles,
  Star,
  Upload,
  Users,
  X,
} from "lucide-react";
import { DevNote } from "@/components/DevNote";
import { ToastContainer, useToast } from "@/components/demo/Toast";
import {
  activityFeed,
  burstGroups,
  chartData,
  galleryPhotos,
  GALLERY_LINK,
  monthlyStats,
  samplePhotos,
  weddings,
  type Photo,
  type Wedding,
} from "@/lib/mock-data";

type Tab =
  | "dashboard"
  | "ingest"
  | "culling"
  | "bursts"
  | "faces"
  | "gallery"
  | "export";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ingest", label: "RAW Ingest", icon: Upload },
  { id: "culling", label: "AI Culling", icon: Sparkles },
  { id: "bursts", label: "Burst Groups", icon: Copy },
  { id: "faces", label: "Face Analysis", icon: Eye },
  { id: "gallery", label: "Client Gallery", icon: Image },
  { id: "export", label: "Catalog Export", icon: Download },
];

export function DemoApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [selectedWedding, setSelectedWedding] = useState<Wedding>(weddings[0]);
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [filterStars, setFilterStars] = useState<number | "all" | "flagged">("all");
  const [bursts, setBursts] = useState(burstGroups);
  const [ingestProgress, setIngestProgress] = useState(0);
  const [ingestRunning, setIngestRunning] = useState(false);
  const [cullProgress, setCullProgress] = useState(100);
  const [galleryGenerated, setGalleryGenerated] = useState(true);
  const [galleryLink, setGalleryLink] = useState(GALLERY_LINK);
  const [exportFormat, setExportFormat] = useState<"lightroom" | "captureone">("lightroom");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState<Photo | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [faceThreshold, setFaceThreshold] = useState(70);
  const { toasts, showToast, dismissToast } = useToast();

  const filteredPhotos = photos.filter((p) => {
    if (filterStars === "flagged") return p.flagged;
    if (filterStars === "all") return true;
    return p.stars === filterStars;
  });

  const handleIngest = () => {
    setIngestRunning(true);
    setIngestProgress(0);
    const interval = setInterval(() => {
      setIngestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIngestRunning(false);
          showToast("Ingest complete — 4,201 CR3 files queued for AI culling");
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleStartCull = () => {
    setCullProgress(0);
    const interval = setInterval(() => {
      setCullProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          showToast("AI culling complete — 412 selects rated and flagged");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const setPhotoStars = (id: string, stars: number) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stars } : p))
    );
    showToast(`Rating updated to ${stars} stars`, "info");
  };

  const toggleFlag = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, flagged: !p.flagged } : p))
    );
  };

  const toggleReject = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rejected: !p.rejected } : p))
    );
    showToast("Photo rejection toggled", "info");
  };

  const selectBestBurst = (groupId: string, photoId: string) => {
    setBursts((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              bestId: photoId,
              photos: g.photos.map((p) => ({
                ...p,
                isBestInBurst: p.id === photoId,
              })),
            }
          : g
      )
    );
    showToast("Best frame selected for burst group");
  };

  const generateGallery = () => {
    setGalleryGenerated(true);
    setGalleryLink(
      `https://gallery.cullflow.app/mitchell/${selectedWedding.couple.toLowerCase().replace(/[^a-z]+/g, "-")}`
    );
    showToast("Client gallery generated and uploaded to CDN");
  };

  const sendGalleryLink = () => {
    showToast(`Gallery link emailed to client via SendGrid`);
  };

  const copyGalleryLink = () => {
    navigator.clipboard?.writeText(galleryLink);
    showToast("Gallery link copied to clipboard");
  };

  const handleExport = () => {
    setExportModalOpen(true);
    showToast(
      `${exportFormat === "lightroom" ? "Lightroom" : "Capture One"} catalog export started`
    );
  };

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Demo top bar */}
      <div className="border-b border-white/10 bg-surface-800/80">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="rounded bg-brand-600/20 px-2 py-0.5 text-xs font-medium text-brand-300">
              LIVE DEMO
            </span>
            <select
              value={selectedWedding.id}
              onChange={(e) => {
                const w = weddings.find((w) => w.id === e.target.value);
                if (w) {
                  setSelectedWedding(w);
                  showToast(`Switched to ${w.couple}`, "info");
                }
              }}
              className="rounded-lg border border-white/10 bg-surface-700 px-3 py-1.5 text-sm text-gray-200"
            >
              {weddings.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.couple} — {w.date}
                </option>
              ))}
            </select>
            <DevNote note="Wedding selector would load from PostgreSQL. Each wedding is a tenant-scoped project with S3 prefix for RAW storage." />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-500">Sarah Mitchell Studio</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-white/10 p-4 lg:block">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  showToast(`Opened ${tab.label}`, "info");
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand-600/20 text-brand-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-white/10 bg-surface-800 p-3">
            <p className="text-xs text-gray-500 mb-2">This wedding</p>
            <p className="text-sm font-medium">{selectedWedding.couple}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedWedding.venue}</p>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>{selectedWedding.totalRaw.toLocaleString()} RAW files</p>
              <p>{selectedWedding.selected} selects</p>
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                  selectedWedding.status === "delivered"
                    ? "bg-green-500/20 text-green-400"
                    : selectedWedding.status === "culling"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-brand-500/20 text-brand-300"
                }`}
              >
                {selectedWedding.status}
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-white/10 p-2 lg:hidden w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs ${
                activeTab === tab.id
                  ? "bg-brand-600/20 text-brand-300"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <DashboardView
              onNavigate={(tab) => setActiveTab(tab)}
              showToast={showToast}
            />
          )}
          {activeTab === "ingest" && (
            <IngestView
              wedding={selectedWedding}
              progress={ingestProgress}
              running={ingestRunning}
              onIngest={handleIngest}
              onStartCull={() => {
                handleStartCull();
                setActiveTab("culling");
              }}
            />
          )}
          {activeTab === "culling" && (
            <CullingView
              photos={filteredPhotos}
              allPhotos={photos}
              filterStars={filterStars}
              cullProgress={cullProgress}
              onFilterChange={setFilterStars}
              onStar={setPhotoStars}
              onFlag={toggleFlag}
              onReject={toggleReject}
              onPhotoClick={setPhotoModal}
              onStartCull={handleStartCull}
            />
          )}
          {activeTab === "bursts" && (
            <BurstView
              groups={bursts}
              onSelectBest={selectBestBurst}
              onPhotoClick={setPhotoModal}
            />
          )}
          {activeTab === "faces" && (
            <FaceView
              photos={photos}
              threshold={faceThreshold}
              onThresholdChange={setFaceThreshold}
              onPhotoClick={setPhotoModal}
            />
          )}
          {activeTab === "gallery" && (
            <GalleryView
              photos={galleryPhotos}
              generated={galleryGenerated}
              link={galleryLink}
              wedding={selectedWedding}
              onGenerate={generateGallery}
              onSend={sendGalleryLink}
              onCopy={copyGalleryLink}
              onPhotoClick={setPhotoModal}
            />
          )}
          {activeTab === "export" && (
            <ExportView
              format={exportFormat}
              wedding={selectedWedding}
              onFormatChange={setExportFormat}
              onExport={handleExport}
              onDownload={() => showToast("Export archive downloaded")}
            />
          )}
        </div>
      </div>

      {/* Photo detail modal */}
      {photoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPhotoModal(null)}
        >
          <div
            className="card max-w-lg w-full p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{photoModal.filename}</h3>
              <button type="button" onClick={() => setPhotoModal(null)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div
              className={`aspect-video rounded-lg bg-gradient-to-br ${photoModal.thumbnail} mb-4`}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Stars</span>
                <p className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPhotoStars(photoModal.id, s)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          s <= photoModal.stars
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Sharpness</span>
                <p className="font-medium">{photoModal.sharpness}%</p>
              </div>
              <div>
                <span className="text-gray-500">Eyes open</span>
                <p className={photoModal.eyesOpen ? "text-green-400" : "text-red-400"}>
                  {photoModal.eyesOpen ? "Yes" : "Closed"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Faces detected</span>
                <p>{photoModal.faces}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => toggleFlag(photoModal.id)}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm ${
                  photoModal.flagged
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                <Flag className="h-4 w-4" /> Flag
              </button>
              <button
                type="button"
                onClick={() => toggleReject(photoModal.id)}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300"
              >
                {photoModal.rejected ? "Unreject" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export modal */}
      {exportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setExportModalOpen(false)}
        >
          <div
            className="card max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold mb-4">Export in progress</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                Generating{" "}
                {exportFormat === "lightroom"
                  ? "Lightroom Classic catalog (.lrcat)"
                  : "Capture One session (.cosessiondb)"}{" "}
                with {selectedWedding.selected} rated selects...
              </p>
              <div className="h-2 rounded-full bg-surface-600 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-brand-500 animate-pulse" />
              </div>
              <p className="text-xs">XMP sidecars include star ratings and color labels.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setExportModalOpen(false);
                showToast("Export downloaded — open in your editor");
              }}
              className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white"
            >
              Download when ready
            </button>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="card max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Cull preferences</h3>
              <button type="button" onClick={() => setSettingsOpen(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Auto-reject eyes closed</span>
                <input type="checkbox" defaultChecked className="accent-brand-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Min sharpness threshold</span>
                <input
                  type="range"
                  min={50}
                  max={95}
                  defaultValue={70}
                  className="accent-brand-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Target select count</span>
                <select className="rounded border border-white/10 bg-surface-700 px-2 py-1">
                  <option>~400 (recommended)</option>
                  <option>~300 (tight)</option>
                  <option>~500 (generous)</option>
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                setSettingsOpen(false);
                showToast("Preferences saved");
              }}
              className="mt-6 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white"
            >
              Save preferences
            </button>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

function DashboardView({
  onNavigate,
  showToast,
}: {
  onNavigate: (tab: Tab) => void;
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}) {
  const maxProcessed = Math.max(...chartData.map((d) => d.processed));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <DevNote note="Dashboard aggregates metrics from processing pipeline events via EventBridge → DynamoDB. Charts use Recharts in production." />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Weddings this month", value: monthlyStats.weddingsProcessed, icon: Camera },
          { label: "RAW files ingested", value: monthlyStats.rawFilesIngested.toLocaleString(), icon: FolderOpen },
          { label: "Hours saved", value: monthlyStats.hoursSaved, icon: Activity },
          { label: "Galleries delivered", value: monthlyStats.galleriesDelivered, icon: Send },
        ].map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => showToast(`Viewing details for ${stat.label}`, "info")}
            className="card p-4 text-left hover:border-brand-500/30 transition-colors"
          >
            <stat.icon className="h-5 w-5 text-brand-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-400" />
              Monthly throughput
            </h2>
            <DevNote note="Time-series from CloudWatch metrics on Lambda/GPU workers." />
          </div>
          <div className="flex items-end gap-2 h-40">
            {chartData.map((d) => (
              <button
                key={d.month}
                type="button"
                onClick={() => showToast(`${d.month}: ${d.processed} weddings, ${d.saved} hrs saved`, "info")}
                className="flex-1 flex flex-col items-center gap-1 group"
              >
                <div
                  className="w-full rounded-t bg-brand-600/60 group-hover:bg-brand-500 transition-colors"
                  style={{ height: `${(d.processed / maxProcessed) * 100}%` }}
                />
                <span className="text-xs text-gray-500">{d.month}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold mb-4">Recent weddings</h2>
          <div className="space-y-2">
            {weddings.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => showToast(`Selected ${w.couple}`, "info")}
                className="flex w-full items-center justify-between rounded-lg bg-surface-700/50 px-3 py-2 text-sm hover:bg-surface-600/50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium">{w.couple}</p>
                  <p className="text-xs text-gray-500">{w.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{w.selected} selects</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Activity feed</h2>
        <div className="space-y-3">
          {activityFeed.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => showToast(item.message, "info")}
              className="flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-white/5 transition-colors"
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  item.type === "cull"
                    ? "bg-brand-400"
                    : item.type === "gallery"
                      ? "bg-purple-400"
                      : item.type === "export"
                        ? "bg-amber-400"
                        : item.type === "ingest"
                          ? "bg-blue-400"
                          : "bg-gray-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300">{item.message}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tabs.slice(1).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-brand-500/40 hover:text-brand-300 transition-colors"
          >
            <tab.icon className="h-4 w-4" />
            Go to {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function IngestView({
  wedding,
  progress,
  running,
  onIngest,
  onStartCull,
}: {
  wedding: Wedding;
  progress: number;
  running: boolean;
  onIngest: () => void;
  onStartCull: () => void;
}) {
  const files = [
    { card: "SD Card 1 (128GB)", count: 2104, status: "complete" },
    { card: "SD Card 2 (128GB)", count: 1897, status: running ? "uploading" : "pending" },
    { card: "SD Card 3 (64GB)", count: 200, status: "pending" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold">RAW Ingest</h1>
        <DevNote note="Production: multipart upload to S3 via presigned URLs. EXIF/metadata extracted by Lambda on S3 ObjectCreated event. No local disk import required." />
      </div>

      <div className="card p-6 border-dashed border-2 border-white/20 text-center">
        <Upload className="h-12 w-12 text-brand-400 mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">Drop wedding folders here</p>
        <p className="text-sm text-gray-500 mb-4">
          CR3, NEF, ARW, DNG supported — up to 10,000 files per batch
        </p>
        <button
          type="button"
          onClick={onIngest}
          disabled={running}
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-500 disabled:opacity-50"
        >
          {running ? `Uploading… ${progress}%` : "Simulate card upload"}
        </button>
        {running && (
          <div className="mt-4 h-2 rounded-full bg-surface-600 overflow-hidden max-w-md mx-auto">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Ingest queue — {wedding.couple}</h2>
        <div className="space-y-3">
          {files.map((f) => (
            <div
              key={f.card}
              className="flex items-center justify-between rounded-lg bg-surface-700/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-brand-400" />
                <div>
                  <p className="text-sm font-medium">{f.card}</p>
                  <p className="text-xs text-gray-500">{f.count.toLocaleString()} files</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  f.status === "complete"
                    ? "bg-green-500/20 text-green-400"
                    : f.status === "uploading"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onStartCull}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          <Sparkles className="h-4 w-4" />
          Start AI culling
        </button>
        <DevNote note="Triggers Step Functions workflow: thumbnail generation → GPU batch inference → results written to Postgres + S3." />
      </div>
    </div>
  );
}

function CullingView({
  photos,
  allPhotos,
  filterStars,
  cullProgress,
  onFilterChange,
  onStar,
  onFlag,
  onReject,
  onPhotoClick,
  onStartCull,
}: {
  photos: Photo[];
  allPhotos: Photo[];
  filterStars: number | "all" | "flagged";
  cullProgress: number;
  onFilterChange: (f: number | "all" | "flagged") => void;
  onStar: (id: string, stars: number) => void;
  onFlag: (id: string) => void;
  onReject: (id: string) => void;
  onPhotoClick: (p: Photo) => void;
  onStartCull: () => void;
}) {
  const selects = allPhotos.filter((p) => p.stars >= 3 && !p.rejected).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold">AI Culling</h1>
          <DevNote note="CLIP/BLIP + custom wedding-trained model scores composition, exposure, focus. Stars map to Lightroom XMP:Rating. Flags map to color labels." />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{selects} selects</span>
          <span>·</span>
          <span>{allPhotos.length} reviewed</span>
        </div>
      </div>

      {cullProgress < 100 && (
        <div className="card p-4">
          <p className="text-sm mb-2">AI culling in progress… {cullProgress}%</p>
          <div className="h-2 rounded-full bg-surface-600 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${cullProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500 mr-2">Filter:</span>
        {(["all", "flagged", 5, 4, 3, 2, 1, 0] as const).map((f) => (
          <button
            key={String(f)}
            type="button"
            onClick={() => onFilterChange(f)}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              filterStars === f
                ? "bg-brand-600/30 text-brand-300"
                : "bg-surface-700 text-gray-400 hover:text-white"
            }`}
          >
            {f === "all" ? "All" : f === "flagged" ? "Flagged" : `${f}★`}
          </button>
        ))}
        <button
          type="button"
          onClick={onStartCull}
          className="ml-auto rounded-lg bg-brand-600/20 px-3 py-1.5 text-xs text-brand-300"
        >
          Re-run AI cull
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 transition-all ${
              photo.rejected
                ? "ring-red-500/50 opacity-50"
                : photo.flagged
                  ? "ring-red-400/60"
                  : "ring-transparent hover:ring-brand-500/50"
            }`}
          >
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => onPhotoClick(photo)}
            >
              <div className={`h-full w-full bg-gradient-to-br ${photo.thumbnail}`} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 flex items-center justify-between">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStar(photo.id, s);
                    }}
                  >
                    <Star
                      className={`h-3 w-3 ${
                        s <= photo.stars
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlag(photo.id);
                }}
              >
                <Flag
                  className={`h-3 w-3 ${
                    photo.flagged ? "fill-red-400 text-red-400" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
            {!photo.eyesOpen && (
              <span className="absolute top-1 left-1 rounded bg-red-500/80 px-1 text-[10px]">
                blink
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BurstView({
  groups,
  onSelectBest,
  onPhotoClick,
}: {
  groups: typeof burstGroups;
  onSelectBest: (groupId: string, photoId: string) => void;
  onPhotoClick: (p: Photo) => void;
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold">Burst & Duplicate Groups</h1>
        <DevNote note="Temporal clustering via perceptual hash + timestamp proximity. Best-frame selection uses ensemble of sharpness, expression, and composition scores." />
      </div>

      {groups.map((group) => (
        <div key={group.id} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{group.label}</h2>
            <span className="text-xs text-gray-500">
              Best: {group.photos.find((p) => p.id === group.bestId)?.filename ?? "—"}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {group.photos.length > 0 ? (
              group.photos.map((photo) => (
                <div key={photo.id} className="shrink-0 w-28">
                  <button
                    type="button"
                    onClick={() => onPhotoClick(photo)}
                    className={`relative aspect-square w-28 rounded-lg overflow-hidden ring-2 ${
                      photo.id === group.bestId
                        ? "ring-brand-400"
                        : "ring-transparent"
                    }`}
                  >
                    <div className={`h-full w-full bg-gradient-to-br ${photo.thumbnail}`} />
                    {photo.id === group.bestId && (
                      <span className="absolute top-1 right-1 rounded bg-brand-500 px-1 text-[10px] font-medium">
                        BEST
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectBest(group.id, photo.id)}
                    className="mt-1 w-full rounded text-xs py-1 bg-surface-700 hover:bg-brand-600/30 text-gray-400 hover:text-brand-300"
                  >
                    Set best
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No photos in group</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function FaceView({
  photos,
  threshold,
  onThresholdChange,
  onPhotoClick,
}: {
  photos: Photo[];
  threshold: number;
  onThresholdChange: (v: number) => void;
  onPhotoClick: (p: Photo) => void;
}) {
  const sorted = [...photos].sort((a, b) => b.sharpness - a.sharpness);
  const belowThreshold = photos.filter((p) => p.sharpness < threshold || !p.eyesOpen);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold">Face Analysis</h1>
        <DevNote note="AWS Rekognition or custom RetinaFace for detection. Laplacian variance for sharpness per face ROI. Blink detection via eye aspect ratio (EAR) threshold." />
      </div>

      <div className="card p-5 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Min sharpness:</span>
          <input
            type="range"
            min={50}
            max={95}
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="accent-brand-500 w-40"
          />
          <span className="font-medium w-8">{threshold}%</span>
        </label>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-400">
            Eyes closed: <span className="text-red-400">{photos.filter((p) => !p.eyesOpen).length}</span>
          </span>
          <span className="text-gray-400">
            Below threshold: <span className="text-amber-400">{belowThreshold.length}</span>
          </span>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3 text-red-400">Flagged — review recommended</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {belowThreshold.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onPhotoClick(photo)}
              className="relative aspect-square rounded-lg overflow-hidden ring-2 ring-red-500/40"
            >
              <div className={`h-full w-full bg-gradient-to-br ${photo.thumbnail}`} />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-[10px]">
                <p>Sharp: {photo.sharpness}%</p>
                <p className={photo.eyesOpen ? "text-green-400" : "text-red-400"}>
                  {photo.eyesOpen ? "Eyes OK" : "Blink"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3">All faces by sharpness</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-gray-500">
                <th className="p-3">File</th>
                <th className="p-3">Faces</th>
                <th className="p-3">Sharpness</th>
                <th className="p-3">Eyes</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.slice(0, 15).map((photo) => (
                <tr
                  key={photo.id}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                  onClick={() => onPhotoClick(photo)}
                >
                  <td className="p-3 font-mono text-xs">{photo.filename}</td>
                  <td className="p-3">
                    <Users className="h-4 w-4 inline text-gray-400" /> {photo.faces}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-surface-600 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            photo.sharpness >= threshold ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${photo.sharpness}%` }}
                        />
                      </div>
                      {photo.sharpness}%
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={photo.eyesOpen ? "text-green-400" : "text-red-400"}>
                      {photo.eyesOpen ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPhotoClick(photo);
                      }}
                      className="text-brand-400 hover:underline text-xs"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GalleryView({
  photos,
  generated,
  link,
  wedding,
  onGenerate,
  onSend,
  onCopy,
  onPhotoClick,
}: {
  photos: Photo[];
  generated: boolean;
  link: string;
  wedding: Wedding;
  onGenerate: () => void;
  onSend: () => void;
  onCopy: () => void;
  onPhotoClick: (p: Photo) => void;
}) {
  const [previewMode, setPreviewMode] = useState<"grid" | "slideshow">("grid");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-bold">Client Gallery</h1>
        <DevNote note="Selects resized via Sharp/Lambda, uploaded to S3 + CloudFront. Gallery page is SSR Next.js with password protection. SendGrid sends branded email with link." />
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-semibold">{wedding.couple}</h2>
            <p className="text-sm text-gray-500">{wedding.venue}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onGenerate}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white"
            >
              {generated ? "Regenerate gallery" : "Generate gallery"}
            </button>
            <button
              type="button"
              onClick={onSend}
              className="flex items-center gap-1 rounded-lg border border-white/20 px-4 py-2 text-sm"
            >
              <Send className="h-4 w-4" /> Email link
            </button>
          </div>
        </div>

        {generated && (
          <div className="flex items-center gap-2 rounded-lg bg-surface-700/50 p-3">
            <input
              readOnly
              value={link}
              className="flex-1 bg-transparent text-sm text-brand-300 font-mono"
            />
            <button
              type="button"
              onClick={onCopy}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs"
            >
              Copy
            </button>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode("grid")}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              previewMode === "grid" ? "bg-brand-600/30 text-brand-300" : "bg-surface-700 text-gray-400"
            }`}
          >
            Grid view
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("slideshow")}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              previewMode === "slideshow" ? "bg-brand-600/30 text-brand-300" : "bg-surface-700 text-gray-400"
            }`}
          >
            Slideshow
          </button>
        </div>
      </div>

      {previewMode === "grid" ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onPhotoClick(photo)}
              className="aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-brand-500/50"
            >
              <div className={`h-full w-full bg-gradient-to-br ${photo.thumbnail}`} />
            </button>
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className={`mx-auto aspect-video max-w-2xl rounded-lg bg-gradient-to-br ${photos[0]?.thumbnail ?? "from-gray-800 to-gray-900"} mb-4`} />
          <p className="text-sm text-gray-400">Slideshow preview — {photos.length} images</p>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        <div className="card p-4">
          <p className="text-gray-500">Gallery views</p>
          <p className="text-2xl font-bold">47</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-500">Downloads</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-500">Favorites</p>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>
    </div>
  );
}

function ExportView({
  format,
  wedding,
  onFormatChange,
  onExport,
  onDownload,
}: {
  format: "lightroom" | "captureone";
  wedding: Wedding;
  onFormatChange: (f: "lightroom" | "captureone") => void;
  onExport: () => void;
  onDownload: () => void;
}) {
  const exports = [
    { date: "2026-06-14", wedding: "Emma & James Chen", format: "Lightroom", files: 412, status: "ready" },
    { date: "2026-05-31", wedding: "Priya & David Okonkwo", format: "Capture One", files: 287, status: "ready" },
    { date: "2026-05-18", wedding: "Rachel & Tom Walsh", format: "Lightroom", files: 356, status: "ready" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold">Catalog Export</h1>
        <DevNote note="XMP sidecars written with exiftool. Lightroom .lrcat built via SQL template. Capture One uses COSessionDB import. Files delivered via presigned S3 download." />
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Export {wedding.couple}</h2>
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => onFormatChange("lightroom")}
            className={`rounded-lg px-4 py-2 text-sm ${
              format === "lightroom"
                ? "bg-brand-600/30 text-brand-300 ring-1 ring-brand-500"
                : "bg-surface-700 text-gray-400"
            }`}
          >
            Lightroom Classic
          </button>
          <button
            type="button"
            onClick={() => onFormatChange("captureone")}
            className={`rounded-lg px-4 py-2 text-sm ${
              format === "captureone"
                ? "bg-brand-600/30 text-brand-300 ring-1 ring-brand-500"
                : "bg-surface-700 text-gray-400"
            }`}
          >
            Capture One
          </button>
        </div>
        <ul className="text-sm text-gray-400 space-y-2 mb-4">
          <li>• {wedding.selected} rated selects with XMP sidecars</li>
          <li>• Star ratings and color labels preserved</li>
          <li>• Rejected images excluded</li>
          <li>• Folder structure: YYYY-MM-DD_CoupleName/</li>
        </ul>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          <Download className="h-4 w-4" />
          Export {format === "lightroom" ? "Lightroom catalog" : "Capture One session"}
        </button>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Export history</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-gray-500">
              <th className="p-2">Date</th>
              <th className="p-2">Wedding</th>
              <th className="p-2">Format</th>
              <th className="p-2">Files</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {exports.map((exp) => (
              <tr key={exp.date + exp.wedding} className="border-b border-white/5">
                <td className="p-2 text-gray-400">{exp.date}</td>
                <td className="p-2">{exp.wedding}</td>
                <td className="p-2">{exp.format}</td>
                <td className="p-2">{exp.files}</td>
                <td className="p-2">
                  <button
                    type="button"
                    onClick={onDownload}
                    className="text-brand-400 hover:underline text-xs"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
