import React, { useEffect, useState } from "react";
import { ExternalLink, Presentation, X } from "lucide-react";

const DISMISS_KEY = "conferencePosterPopupDismissed";
const POSTER_URL =
  "https://drive.google.com/file/d/1WgmCLoYm5EDYS1e3wlb4RfmbcvPqEoHe/view?usp=sharing";
const MURC_URL =
  "https://events.ubc.ca/event/multidisciplinary-undergraduate-research-conference-2026/";

const ConferencePosterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISS_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    window.localStorage.setItem(DISMISS_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-6 md:w-[420px]">
      <div className="rounded-xl border border-ubc-slate/40 bg-ubc-blue/95 p-4 shadow-2xl backdrop-blur-sm">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-ubc-mint">
            <Presentation className="h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-wide">
              Conference Update
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1 text-ubc-mint/80 hover:bg-ubc-slate/20 hover:text-white transition-colors"
            aria-label="Close conference poster popup"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm text-ubc-mint/90">
          We recently presented a poster at{" "}
          <a
            href={MURC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white transition-colors"
          >
            MURC 2026
          </a>{" "}
          highlighting the milestones from the past year.
        </p>

        <a
          href={POSTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-ubc-slate px-3 py-2 text-sm font-medium text-ubc-blue hover:bg-ubc-slate/90 transition-colors"
        >
          View Poster
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default ConferencePosterPopup;
