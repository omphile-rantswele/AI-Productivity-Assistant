import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { runAI } from "@/lib/api/ai.functions";
import { Button } from "@/components/ui/button";
import { AIOutput } from "@/components/ai-output";

export function PromptTool({
  tool,
  buildPrompt,
  formFields,
  ctaLabel = "Generate",
}: {
  tool: "email" | "meeting" | "tasks" | "research";
  buildPrompt: () => string | null;
  formFields: ReactNode;
  ctaLabel?: string;
}) {
  const generate = useServerFn(runAI);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const prompt = buildPrompt();
    if (!prompt) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await generate({ data: { tool, messages: [{ role: "user", content: prompt }] } });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Inputs</h2>
        {formFields}
        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          {loading ? "Generating..." : ctaLabel}
        </Button>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <AIOutput value={output} onChange={setOutput} />
      </div>
    </div>
  );
}
