import React from "react";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SponsorSection from "@/components/Sponsors";

const PACKAGE_URL = "/sponsorship-package-2026.pdf";
const CONTACT_EMAIL = "contact@ubcfab.com";

const SponsorsPage = () => {
  return (
    <div className="min-h-screen bg-ubc-blue">
      <Header />

      {/* Hero */}
      <section className="pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-aldrich mb-6 text-ubc-mint glow">
            Sponsors
          </h1>
          <p className="text-lg md:text-xl text-ubc-mint/80 max-w-2xl mx-auto">
            We are building open-source chip fabrication tools from scratch.
            Our sponsors make that possible by funding equipment, materials,
            and the students doing the work.
          </p>
        </div>
      </section>

      {/* Sponsorship package highlight */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 relative bg-[#001a38] border border-ubc-slate/30 rounded-lg p-8">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-ubc-mint/40 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-ubc-mint/40 pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-ubc-slate/20 rounded-lg">
                <FileText className="w-6 h-6 text-ubc-slate" />
              </div>
              <span className="text-xs tracking-widest text-ubc-mint/70">
                2026–2027
              </span>
            </div>

            <h2 className="text-3xl font-aldrich text-ubc-mint mb-4">
              Sponsorship Package
            </h2>
            <p className="text-ubc-mint/80 leading-relaxed mb-8">
              Learn who we are, the tools we are building, our roadmap and
              budget, and the sponsorship tiers available for partners who
              want to support accessible microfabrication.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={PACKAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ubc-slate hover:bg-ubc-slate/90 text-ubc-blue font-medium rounded-md transition-colors"
              >
                View Package
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={PACKAGE_URL}
                download="Vancouver-HackerFab-Sponsorship-Package-2026.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-ubc-mint/60 text-ubc-mint font-medium rounded-md hover:bg-ubc-mint/10 transition-colors"
              >
                Download PDF
                <Download className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20Inquiry`}
                className="inline-flex items-center justify-center gap-2 text-sm text-ubc-mint/70 hover:text-ubc-mint transition-colors mt-2"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-lg p-2 hidden md:block">
            <object
              data={`${PACKAGE_URL}#view=FitH`}
              type="application/pdf"
              className="w-full h-[640px] rounded-md"
              aria-label="Sponsorship package preview"
            >
              <div className="h-[640px] flex items-center justify-center text-ubc-mint/70 text-center px-6">
                Preview unavailable in this browser —{" "}
                <a href={PACKAGE_URL} className="underline ml-1">
                  open the PDF
                </a>
                .
              </div>
            </object>
          </div>
        </div>
      </section>

      <SponsorSection />

      <Footer />
    </div>
  );
};

export default SponsorsPage;
