import React from "react";
import {
  Cpu,
  Zap,
  Code,
  Wrench,
  Users,
  Target,
  Layers,
  Flame,
  TestTube,
  BarChart,
  TrendingUp,
} from "lucide-react";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Team = () => {
  const teamRoles = [
    {
      title: "Lithography Team",
      description:
        "Building and improving the maskless UV stepper and spin coater. Work on precision motion stages, wafer chucks, enclosures, optical mounts, LED driver circuits, motor drivers, sensors, interlocks, and motion control software.",
      skills: [
        "SolidWorks/Fusion 360",
        "3D printing",
        "CNC machining",
        "Arduino/STM32 motor drivers",
        "KiCad",
        "Python",
        "C++",
        "Optics",
      ],
      icon: Cpu,
    },
    {
      title: "Deposition Team",
      description:
        "Developing the RF sputtering chamber for thin-film deposition. Focus on chamber hardware, target mounts, cooling structures, vacuum sealing, RF power integration, impedance matching circuits, and monitoring electronics.",
      skills: [
        "Fusion 360/Solidworks",
        "machining",
        "metal fabrication",
        "RF circuit design",
        "LTSpice simulation",
        "vacuum hardware familiarity (KF/CF flanges)",
        "LabVIEW/Python for QCM data logging",
      ],
      icon: Layers,
    },
    {
      title: "Etching Team",
      description:
        "Building the plasma/RIE etcher for anisotropic etching. Work on electrode and chamber design, machining fixtures, gas manifolds, RF generator/matching network, bias circuits, and safety interlocks.",
      skills: [
        "COMSOL/Ansys for plasma/e-field modeling",
        "RF power electronics",
        "machining for electrode fixtures",
        "microcontroller programming",
      ],
      icon: Zap,
    },
    {
      title: "Annealing Team",
      description:
        "Constructing and operating the tube furnace for oxidation, diffusion, and thermal processing. Focus on furnace tube supports, gas inlet manifolds, insulation design, heater power electronics, and thermocouple circuits.",
      skills: [
        "Thermal modeling in MATLAB/Simulink",
        "Arduino controllers",
        "PID controllers",
        "SolidWorks/Fusion 360 for furnace assemblies",
        "high-power electronics",
        "MATLAB/Python for temperature logging",
      ],
      icon: Flame,
    },
    {
      title: "Chemical Processing Team",
      description:
        "Handling all wetlab chemistry and chemical safety. Work on wet processing, oxide/nitride etching (e.g. HF), metal wet etchants, cleaning steps, DIY photoresists, spin-coating formulations, and surface treatments.",
      skills: [
        "Standard wetlab techniques",
        "basic formulation work",
        "experience with DIY photoresists",
        "experience with commercial photoresists",
        "familiarity with MSDS documentation",
      ],
      icon: TestTube,
    },
    {
      title: "Metrology & Testing Team",
      description:
        "Creating setups for characterization of films and devices. Work on sample holders, probe stations, profilometry/QCM fixtures, wafer probing circuits, measurement electronics, and automated test rigs.",
      skills: [
        "SEM microscopy",
        "optical microscopy",
        "profilometry",
        "4-point probe electrical measurements",
        "Python (NumPy, matplotlib,pandas)",
        "CAD for probe station fixtures",
        "PCB design for measurement boards",
      ],
      icon: BarChart,
    },
    {
      title: "Funding / Marketing",
      description:
        "Sponsor outreach and grant applications at scale and partnering with UBC faculty for lab space. Managing all people relations in a centralized Customer Relationship Management (CRM) platform and researching potential grant opportunities.",
      skills: [
        "CRM platform management",
        "Grant writing and research",
        "Media design",
        "Relationship building with faculty",
        "Sponsor outreach",
      ],
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-ubc-blue circuit-background">
      <Header />

      {/* Current Members */}
      <section className="pt-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-aldrich text-ubc-mint glow">
              Current Members
            </h2>
            <p className="text-ubc-mint/80 mt-3 max-w-2xl mx-auto">
              Meet the students currently bringing up the Vancouver HackerFab.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-4">
            <img
              src="/images/team-2026.jpg"
              alt="Vancouver HackerFab team, 2026-2027 season"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-3 text-center text-sm tracking-widest text-ubc-mint/70">
              2026-2027 Season
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-aldrich mb-6 text-ubc-mint glow">
            Join Our Teams
          </h1>
          <p className="text-lg md:text-xl text-ubc-mint/80 max-w-2xl mx-auto mt-4">
            We operate lean in terms of team size (10-15 members). Expect to
            have a ton of ownership over your projects and exposure to problems
            across electromechanical design, physics, and software. Use the key
            skills below as a loose guideline for what you'd be learning on the
            job, not hard requirements. If you're excited about the project and
            willing to learn, we encourage you to apply!
          </p>
        </div>
      </section>

      {/* Team Roles Grid */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.title}
                  className="bg-card border border-border rounded-lg p-6 hover:border-ubc-slate/40 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-ubc-slate/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-ubc-slate" />
                    </div>
                    <h3 className="text-xl font-aldrich text-ubc-mint">
                      {role.title}
                    </h3>
                  </div>

                  <p className="text-ubc-mint/80 mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-ubc-mint mb-2">
                      Key Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-ubc-slate/20 text-ubc-mint text-xs rounded-md border border-ubc-slate/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <InterestForm />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Team;
