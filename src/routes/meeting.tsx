import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";

import { ToolPage } from "@/components/tool-page";
import { PromptTool } from "@/components/prompt-tool";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/meeting")({
  head: () => ({ meta: [{ title: "Meeting Summarizer — Worksmith AI" }] }),
  component: MeetingPage,
});

function MeetingPage() {
  const [notes, setNotes] = useState("");

  return (
    <ToolPage
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript to get a clean recap with decisions and action items."
      icon={FileText}
    >
      <PromptTool
        tool="meeting"
        ctaLabel="Summarize"
        buildPrompt={() => (notes.trim() ? `Meeting notes / transcript:\n\n${notes}` : null)}
        formFields={
          <div className="space-y-2">
            <Label htmlFor="notes">Meeting notes or transcript *</Label>
            <Textarea
              id="notes"
              placeholder="Paste your meeting notes or transcript here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[320px]"
            />
          </div>
        }
      />
    </ToolPage>
  );
}
