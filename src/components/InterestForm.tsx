import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

/**
 * InterestCTA – pared‑down call‑to‑action that keeps the original heading
 * and description text but replaces the full form with a single button
 * linking to a Google Form. All magnetic / intersection‑observer effects
 * and decorative SVGs have been removed for simplicity.
 */

const InterestCTA: React.FC = () => {
  return (
    <section id="interest" className="pt-20 pb-40 px-8 bg-transparent">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ubc-mint">
          Interested in joining the team?
        </h2>

        {/* Short description */}
        <p className="text-lg md:text-xl text-ubc-mint/80 mb-10">
          We want passionate individuals to help us build the tools needed for
          semiconductor fabrication and tape out chips with them. Based on this
          quick interest form, we will reach out to you with the next steps.
          This shouldn't take more than 10 minutes.
        </p>

        {/* CTA button – update the href with your live Google Form link */}
        <a
          href="https://app.youform.com/forms/mevgeqbt" // ← replace this
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="group relative bg-ubc-slate hover:bg-ubc-slate/90 text-ubc-blue font-medium py-6 text-lg flex items-center justify-center gap-2">
            <span>Apply</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default InterestCTA;
