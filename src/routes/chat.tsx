import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageSquare, Send, Loader2, User, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { ToolPage } from "@/components/tool-page";
import { runAI } from "@/lib/api/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — Worksmith AI" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const send = useServerFn(runAI);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your workplace assistant. Ask me anything — drafts, ideas, explanations." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({
        data: {
          tool: "chat",
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
        },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.content }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="AI Chatbot" description="Conversational assistant for everyday workplace questions." icon={MessageSquare}>
      <div className="flex h-[60vh] flex-col rounded-xl border border-border bg-card">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              )}
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          )}
        </div>
        <form onSubmit={submit} className="flex gap-2 border-t border-border p-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything... (Enter to send, Shift+Enter for newline)"
            className="min-h-[44px] flex-1 resize-none"
            rows={1}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </ToolPage>
  );
}
