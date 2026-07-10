import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clock,
  Copy,
  Download,
  Eye,
  Flag,
  FolderOpen,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FolderOpen,
    title: "Batch RAW Ingest",
    description:
      "Drag entire wedding card folders. CullFlow reads CR3, NEF, ARW, and DNG files without importing to disk first.",
  },
  {
    icon: Sparkles,
    title: "AI Culling & Ratings",
    description:
      "ML models assign star ratings and color flags based on composition, focus, and expression — like a second pair of eyes.",
  },
  {
    icon: Copy,
    title: "Duplicate & Burst Grouping",
    description:
      "Sequences from first dances and bouquet tosses are clustered automatically. Pick the best frame in one click.",
  },
  {
    icon: Eye,
    title: "Face Sharpness & Eyes-Open",
    description:
      "Per-face focus scoring and blink detection catch the shots you'd otherwise miss at 2 AM.",
  },
  {
    icon: Users,
    title: "Client Gallery Delivery",
    description:
      "One click generates a branded gallery, uploads selects to CDN, and emails a delivery link to your couple.",
  },
  {
    icon: Download,
    title: "Lightroom & Capture One Export",
    description:
      "Export XMP sidecars or a ready-made catalog with your selects pre-rated — open and edit immediately.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyek0zNiAxNHYySDI0di0yaDEyek0zNiA0djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <Zap className="h-4 w-4" />
              Cull 3,000 RAWs in under 25 minutes
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Stop stabbing your eyes out over{" "}
              <span className="text-gradient">wedding culling</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed sm:text-xl">
              CullFlow is AI culling and client gallery delivery for solo and
              small-studio wedding photographers. Upload a full wedding, get
              rated selects and a delivery link — automatically.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30 hover:bg-brand-500 transition-all hover:scale-[1.02]"
              >
                Try Interactive Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 text-base font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                Read the research
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
              <div>
                <p className="font-display text-3xl font-bold text-white">4–8 hrs</p>
                <p className="mt-1 text-sm text-gray-500">saved per wedding</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">3,847</p>
                <p className="mt-1 text-sm text-gray-500">RAWs per shoot avg</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">22 min</p>
                <p className="mt-1 text-sm text-gray-500">AI cull time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-white/10 bg-surface-800/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Built for photographers shooting{" "}
            <span className="text-gray-300">20–50 weddings/year</span> who
            currently cull in Lightroom or Photo Mechanic
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Everything between shutter and gallery
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Six core features that replace your manual culling marathon with
              an automated pipeline — from card ingest to client delivery.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 hover:border-brand-500/30 transition-colors group"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand-500/10 p-3 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-surface-800/30 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl mb-6">
                Your Sunday night, reclaimed
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Upload RAW batch",
                    desc: "Drop your wedding folder. Serverless pipeline queues GPU inference.",
                  },
                  {
                    step: "02",
                    title: "AI culls & groups",
                    desc: "Stars, flags, burst grouping, and face analysis run in parallel.",
                  },
                  {
                    step: "03",
                    title: "Review & tweak",
                    desc: "Skim AI picks in the grid. Override ratings with keyboard shortcuts.",
                  },
                  {
                    step: "04",
                    title: "Deliver gallery",
                    desc: "One click exports to Lightroom and emails your couple a gallery link.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 font-display text-sm font-bold text-brand-400">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Emma & James Chen</span>
                <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs text-brand-300">
                  Culling complete
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg bg-gradient-to-br ${
                      [
                        "from-rose-900/80 to-amber-900/60",
                        "from-slate-800/80 to-blue-900/60",
                        "from-emerald-900/80 to-teal-900/60",
                        "from-purple-900/80 to-pink-900/60",
                      ][i % 4]
                    } relative`}
                  >
                    {i % 3 === 0 && (
                      <Star className="absolute top-1 right-1 h-3 w-3 fill-amber-400 text-amber-400" />
                    )}
                    {i % 5 === 0 && (
                      <Flag className="absolute top-1 left-1 h-3 w-3 fill-red-400 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <Camera className="h-3 w-3" /> 3,847 RAWs
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> 412 selects
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 19 min
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Simple, predictable pricing
            </h2>
            <p className="mt-4 text-gray-400">
              No per-image fees. No surprise overages. One flat rate.
            </p>
          </div>
          <div className="mx-auto max-w-lg">
            <div className="card relative overflow-hidden p-8 ring-2 ring-brand-500/50">
              <div className="absolute top-0 right-0 rounded-bl-lg bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                Most popular
              </div>
              <h3 className="font-display text-xl font-semibold">Pro Studio</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">$49</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Unlimited images. Unlimited weddings. Cancel anytime.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-300">
                {[
                  "Unlimited RAW ingest & AI culling",
                  "Burst grouping & best-frame selection",
                  "Face sharpness & eyes-open detection",
                  "Client gallery hosting & delivery links",
                  "Lightroom & Capture One catalog export",
                  "Priority GPU processing queue",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-500 transition-colors"
              >
                Start with the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card relative overflow-hidden px-8 py-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 via-transparent to-brand-900/20" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                See CullFlow in action
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                Explore the full interactive demo with realistic wedding data,
                every MVP feature, and developer notes on production architecture.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 font-semibold text-white hover:bg-brand-500 transition-colors"
                >
                  Open Demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 font-medium text-gray-300 hover:bg-white/5 transition-colors"
                >
                  Developer docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
