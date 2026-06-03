import { Info } from "lucide-react";

export function AIDisclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        AI-generated content may be inaccurate or biased. Always review and edit outputs before sharing, and avoid
        submitting confidential or personally identifying information.
      </p>
    </div>
  );
}
