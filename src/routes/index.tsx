import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { AIDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Worksmith AI" },
      { name: "description", content: "Your AI workplace productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email" as const,
    title: "Smart Email Generator",
    desc: "Draft professional emails from a short brief.",
    icon: Mail,
  },
  {
    to: "/meeting" as const,
    title: "Meeting Notes Summarizer",
    desc: "Turn raw notes into a clean recap with action items.",
    icon: FileText,
  },
  {
    to: "/tasks" as const,
    title: "AI Task Planner",
    desc: "Break goals into prioritized, actionable plans.",
    icon: ListChecks,
  },
  {
    to: "/research" as const,
    title: "AI Research Assistant",
    desc: "Get structured briefings on any topic.",
    icon: Search,
  },
  {
    to: "/chat" as const,
    title: "AI Chatbot",
    desc: "A general-purpose workplace assistant.",
    icon: MessageSquare,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="rounded-2xl border border-border bg-gradient-to-br from-accent/60 via-background to-background p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Workplace AI Suite
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Get the busywork done, faster.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Five focused AI tools for the everyday workplace — write emails, summarize meetings, plan tasks, research
          topics, and chat with an assistant. All outputs are editable.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <t.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
            <div className="mt-auto flex items-center text-sm font-medium text-primary">
              Open
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <AIDisclaimer />
    </div>
  );
}
