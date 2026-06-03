import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";

import { ToolPage } from "@/components/tool-page";
import { PromptTool } from "@/components/prompt-tool";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Worksmith AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");

  return (
    <ToolPage title="AI Task Planner" description="Turn a goal into a prioritized, actionable plan." icon={ListChecks}>
      <PromptTool
        tool="tasks"
        ctaLabel="Build Plan"
        buildPrompt={() =>
          goal.trim()
            ? `Goal: ${goal}\nDeadline: ${deadline || "Not specified"}\nContext / constraints:\n${context || "None"}`
            : null
        }
        formFields={
          <>
            <div className="space-y-2">
              <Label htmlFor="goal">Goal *</Label>
              <Input
                id="goal"
                placeholder="e.g. Launch the Q3 product page"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (optional)</Label>
              <Input
                id="deadline"
                placeholder="e.g. in 2 weeks, Friday EOD"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Context / constraints</Label>
              <Textarea
                id="context"
                placeholder="Team size, tools, blockers, dependencies..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </>
        }
      />
    </ToolPage>
  );
}
