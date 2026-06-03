import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

import { ToolPage } from "@/components/tool-page";
import { PromptTool } from "@/components/prompt-tool";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Worksmith AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("professional");
  const [purpose, setPurpose] = useState("");

  return (
    <ToolPage title="Smart Email Generator" description="Draft polished, professional emails in seconds." icon={Mail}>
      <PromptTool
        tool="email"
        ctaLabel="Generate Email"
        buildPrompt={() =>
          purpose.trim()
            ? `Recipient: ${recipient || "Unspecified"}\nTone: ${tone}\nPurpose / key points:\n${purpose}`
            : null
        }
        formFields={
          <>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. My manager, the client team..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose & key points *</Label>
              <Textarea
                id="purpose"
                placeholder="What does this email need to communicate?"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="min-h-[140px]"
              />
            </div>
          </>
        }
      />
    </ToolPage>
  );
}
