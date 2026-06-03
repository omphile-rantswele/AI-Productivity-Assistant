import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are a professional email writing assistant. Generate a clear, concise, professional email based on the user's brief. Include a subject line. Match the requested tone. Output only the email (Subject + body), nothing else.",
  meeting:
    "You are a meeting notes summarizer. Given raw meeting notes or a transcript, produce: 1) A short TL;DR (2-3 sentences). 2) Key Discussion Points (bulleted). 3) Decisions Made (bulleted). 4) Action Items (bulleted, with owner if mentioned). Use markdown.",
  tasks:
    "You are an AI task planner. Break the user's goal into a prioritized, actionable plan. Output markdown with: a short overview, then a checklist of tasks grouped by priority (High / Medium / Low). Each task should be concrete, with an estimated effort (e.g. 30m, 2h).",
  research:
    "You are an AI research assistant. Provide a structured briefing on the topic: Overview, Key Concepts, Recent Developments (note your training cutoff), Pros/Cons or Considerations, and Suggested Next Steps for deeper research. Use markdown. Be balanced and cite types of sources to consult.",
  chat:
    "You are a helpful, professional workplace productivity assistant. Be concise, use markdown when helpful, and stay on-task.",
};

export const runAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      tool: z.enum(["email", "meeting", "tasks", "research", "chat"]),
      messages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(20000),
          }),
        )
        .min(1)
        .max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.tool] },
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Please try again in a moment.");
    }
    if (res.status === 402) {
      throw new Error(
        "AI credits exhausted. Please add credits to your Lovable workspace.",
      );
    }
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error:", res.status, t);
      throw new Error("AI request failed. Please try again.");
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
