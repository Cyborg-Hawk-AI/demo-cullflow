import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: false },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: false },
  { label: "Price point high enough", passed: false },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: false },
  { label: "< 3 competitors", passed: false },
  { label: "Low-maintenance ops (mailbox money)", passed: false },
];

const painPoints = [
  {
    title: "Aftershoot | Best AI Culling, Editing & Retouching Software",
    persona: "Wedding photographers seeking workflow automation",
    workaround: "Manual culling in Lightroom/Photo Mechanic (4–8 hrs/wedding)",
    frequency: "Every wedding shoot (20–50/year for target segment)",
    wtp: "Flat $49/mo unlimited — matches incumbent pricing",
    source: "https://aftershoot.com/",
  },
  {
    title: "Aftershoot Just Became an Entire AI Photography Workflow",
    persona: "Working wedding photographer testing full workflow",
    workaround: "Multi-app stack: Lightroom + separate gallery service",
    frequency: "Per wedding delivery cycle",
    wtp: "Time savings justify subscription (39+ hrs/month claimed)",
    source: "https://fstoppers.com/software/aftershoot-just-became-entire-ai-photography-workflow-903026",
  },
  {
    title: "AI Photo Culling for Weddings — ON1 Blog",
    persona: "High-volume wedding photographer",
    workaround: "Photo Mechanic (2–4 hrs) or Lightroom (4–8 hrs) manual cull",
    frequency: "2,000–4,000 RAW files per event",
    wtp: "AI tools save 7–10 full days per season",
    source: "https://www.on1.com/blog/ai-photo-culling-for-weddings/",
  },
  {
    title: "Aftershoot is a waste of money",
    persona: "Disappointed Aftershoot subscriber",
    workaround: "Reverted to manual culling after AI accuracy issues",
    frequency: "Every wedding — model accuracy complaints recurring",
    wtp: "Negative WTP signal — churned due to quality",
    source: "https://www.reddit.com/r/WeddingPhotography/comments/1o7hj7l/aftershoot_is_a_waste_of_money/",
  },
  {
    title: "Hands up if culling makes you want to stab your eyes out",
    persona: "Solo wedding photographer on r/WeddingPhotography",
    workaround: "Batch 5-star family/formal shots; manual rest",
    frequency: "Post-every-wedding Sunday night ritual",
    wtp: "Strong engagement — 100+ comments validating pain",
    source: "https://www.reddit.com/r/WeddingPhotography/comments/16wf9c6/hands_up_if_culling_makes_you_want_to_stab_your/",
  },
];

export const metadata = {
  title: "Research — CullFlow",
  description: "How we found the CullFlow idea — validation research and source pain points.",
};

export default function ResearchPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm text-brand-400 mb-2">How we found this idea</p>
          <h1 className="font-display text-4xl font-bold mb-4">
            The research behind CullFlow
          </h1>
          <p className="text-gray-400 leading-relaxed">
            CullFlow was identified through the Idea Miner research pipeline —
            mining Reddit, forums, and industry publications for real pain
            points from wedding photographers. This page documents what we
            found and why we built this demo anyway.
          </p>
        </div>

        {/* Origin story */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Why this exists
          </h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed space-y-4">
            <p>
              The user identified a real and well-documented pain: wedding
              photographers routinely shoot <strong className="text-gray-300">2,000–4,000 RAW files</strong> per
              event and spend <strong className="text-gray-300">4–8 hours culling manually</strong>. Reddit
              threads on r/WeddingPhotography confirm this is a top workflow
              complaint, with posts titled &quot;culling makes you want to stab your
              eyes out&quot; getting strong engagement.
            </p>
            <p>
              However, the evidence gathered simultaneously reveals that{" "}
              <strong className="text-gray-300">Aftershoot already solves this problem end-to-end</strong> —
              culling 2,613 RAW files in 18 minutes, grouping duplicates,
              detecting blink/focus issues, and generating client galleries —
              and has been doing so for years. The opportunity was real; it has
              already been captured.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-surface-700 px-3 py-1 text-gray-400">
              Cluster: user-submitted
            </span>
            <span className="rounded-full bg-surface-700 px-3 py-1 text-gray-400">
              Rubric score: 38/130
            </span>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-300">
              Validation: 3/9 checks passed
            </span>
          </div>
        </section>

        {/* Target customer */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Target customer
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Solo and small-studio wedding photographers shooting{" "}
            <strong className="text-gray-300">20–50 weddings/year</strong> who
            spend <strong className="text-gray-300">4–8 hours per wedding</strong> on
            manual culling in Lightroom or Photo Mechanic.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Unfair advantage: None identified. The user has described
            Aftershoot&apos;s exact product at Aftershoot&apos;s approximate price point
            with no stated differentiation.
          </p>
        </section>

        {/* Competitive landscape */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Competitive landscape
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Aftershoot (dominant, full workflow including editing and galleries),
            Narrative Select, Imagen AI, FilterPixel, ON1 AI Culling — all
            directly solving this problem with established user bases and
            training data advantages.
          </p>
          <p className="text-sm text-gray-500">
            <strong className="text-gray-400">Go-to-market:</strong> Wedding
            photography Facebook groups, r/WeddingPhotography, YouTube tutorial
            sponsorships
          </p>
        </section>

        {/* Automation playbook */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How this business runs itself
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            The goal is passive, low-maintenance recurring revenue: AI is how we
            build and operate the business, not necessarily what it sells.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            After launch, file processing pipelines run serverlessly on upload;
            Stripe handles billing and dunning; SendGrid handles transactional
            email; a support chatbot handles tier-1 questions. However, model
            accuracy complaints (as seen in the &quot;Aftershoot is a waste of
            money&quot; Reddit thread) require ongoing ML tuning and human review
            escalation paths. Realistically 10–15 owner hours/week due to model
            maintenance and customer support around edge cases.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg bg-surface-700/50 p-4">
              <p className="text-sm text-gray-500">Estimated owner time</p>
              <p className="text-2xl font-bold text-white">~12 hrs/week</p>
            </div>
            <div className="rounded-lg bg-surface-700/50 p-4">
              <p className="text-sm text-gray-500">MVP estimate</p>
              <p className="text-lg font-semibold text-white">8–16 weeks</p>
              <p className="text-xs text-gray-500 mt-1">
                Python/Node + GPU inference + React + S3
              </p>
            </div>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Validation checklist (3/9)
          </h2>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                {item.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400/60 shrink-0" />
                )}
                <span className={item.passed ? "text-gray-300" : "text-gray-500"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pain points */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">
            Source pain points
          </h2>
          <div className="space-y-4">
            {painPoints.map((point) => (
              <div key={point.source} className="card p-5">
                <h3 className="font-semibold text-gray-200 mb-3">
                  {point.title}
                </h3>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">Persona</dt>
                    <dd className="text-gray-300">{point.persona}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Workaround</dt>
                    <dd className="text-gray-300">{point.workaround}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Frequency</dt>
                    <dd className="text-gray-300">{point.frequency}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">WTP signal</dt>
                    <dd className="text-gray-300">{point.wtp}</dd>
                  </div>
                </dl>
                <a
                  href={point.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-brand-400 hover:underline"
                >
                  View source <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="mb-12 card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">
            About this program
          </h2>
          <p className="text-gray-400 leading-relaxed">
            This demo was auto-built by the <strong className="text-gray-300">Idea Miner</strong> pipeline:
            a twice-daily research program that mines Reddit, Hacker News, Stack
            Exchange, and GitHub for real people describing real pain, scores the
            opportunities, and automatically ships a working mock of every idea
            that passes validation (≥8/9 checks, momentum not declining, not
            previously built). The bar for every idea: low-maintenance recurring
            revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-4 text-xs text-gray-600">
            Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 23:35 UTC
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-500 transition-colors"
          >
            Try the demo
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/developers"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium text-gray-300 hover:bg-white/5 transition-colors"
          >
            Developer docs
          </Link>
        </div>
      </div>
    </div>
  );
}
