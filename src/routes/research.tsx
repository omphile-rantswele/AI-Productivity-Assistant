import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

import { ToolPage } from "@/components/tool-page";
import { PromptTool } from "@/components/prompt-tool";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Worksmith AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [angle, setAngle] = useState("");

  return (
    <ToolPage
      title="AI Research Assistant"
      description="Get a structured briefing to kickstart your research."
      icon={Search}
    >
      <PromptTool
        tool="research"
        ctaLabel="Research Topic"
        buildPrompt={() =>
          topic.trim() ? `Topic: ${topic}\nAngle / focus: ${angle || "General overview"}` : null
        }
        formFields={
          <>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g. Retrieval-augmented generation in enterprise"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="angle">Specific angle (optional)</Label>
              <Textarea
                id="angle"
                placeholder="What lens or audience do you want?"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </>
        }
      />
    </ToolPage>
  );
}
