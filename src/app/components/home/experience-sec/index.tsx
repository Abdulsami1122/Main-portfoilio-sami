import React from "react";

const ExperienceSec = () => {
  const experiences = [
    {
      year: "2026 - PRESENT",
      title: "POS Double Accounting (PERN)",
      company: "",
      type: "Full-Stack Development",
      description:
        "Developed a full-stack POS system using PostgreSQL, Express.js, React.js, and Node.js, featuring double-entry accounting, customizable Chart of Accounts, inventory and warehouse management, sales/purchase modules, dropshipping workflow, and investor management, with scalable architecture deployed for clients in Pakistan and China.",
    },
    {
      year: "2025 - 2026",
      title: "Gul Traders Website (MERN)",
      company: "Gul Traders",
      type: "E-commerce Development",
      description:
        "Developed a full-stack MERN e-commerce website with responsive UI/UX, featuring both admin and user panels, optimized for business operations and seamless user experience.",
    },

    {
      year: "2025 - 2026",
      title: "Wiser Consulting Website (MERN & Next.js)",
      company: "Wiser Consulting",
      type: "Full-Stack Development",
      description:
        "Developed a comprehensive visa assessment and consulting website for Wiser Consulting to assist clients with visa documentation and global immigration processes.",
    },
  ];

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 border-b border-foreground/30 pb-7 mb-9 md:mb-16">
            <h2>Experience</h2>
            <p className="text-xl text-primary">
              ( {String(experiences.length).padStart(2, "0")} )
            </p>
          </div>

          <div className="space-y-7 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative"
              >
                <div className="">
                  <h3 className="font-bold mb-2 text-foreground">{exp.year}</h3>
                  <h4 className="text-lg font-normal">{exp.title}</h4>
                </div>

                <div className=" relative">
                  {index < experiences.length && (
                    <div
                      className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? "h-40" : "h-30"} bg-muted`}
                    ></div>
                  )}

                  <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                    <div
                      className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-background flex items-center justify-center ${index === 0 ? "border-primary" : "border-foreground"
                        }`}
                    >
                      {index === 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      )}
                      {index !== 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
                      )}
                    </div>
                  </div>

                  <div className="pl-4 lg:pl-7">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-foreground font-normal">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-base font-normal">{exp.type}</p>
                  </div>
                </div>

                <div className="pl-8 sm:pl-0">
                  <p className="leading-relaxed text-base">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSec;
