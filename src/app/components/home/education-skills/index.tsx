"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { 
  Layers, 
  Atom, 
  Server, 
  Database, 
  Globe, 
  Terminal,
  Code2,
  Cpu
} from "lucide-react";

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("mern") || n.includes("stack")) return <Layers className="w-12 h-12" />;
  if (n.includes("react") || n.includes("next")) return <Atom className="w-12 h-12" />;
  if (n.includes("node") || n.includes("express")) return <Server className="w-12 h-12" />;
  if (n.includes("mongo") || n.includes("postgre") || n.includes("mysql") || n.includes("database")) return <Database className="w-12 h-12" />;
  if (n.includes("api") || n.includes("jwt") || n.includes("auth")) return <Globe className="w-12 h-12" />;
  if (n.includes("deployment") || n.includes("linux") || n.includes("server")) return <Terminal className="w-12 h-12" />;
  return <Code2 className="w-12 h-12" />;
};

const EducationSkills = () => {
  const [educationData, setEductionData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-muted overflow-hidden">
        <div className="container relative z-10">

          <div className="relative z-10 py-16 md:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 xl:mb-16">
              <h2>Education & Skills</h2>
              <p className="text-xl text-primary">
                ( {String(
                  (educationData?.education?.length || 0) + 
                  (educationData?.skills?.length || 0)
                ).padStart(2, "0")} )
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
              <div className="w-full lg:max-w-md flex flex-col gap-0 xl:gap-8">
                {educationData?.education?.map((value: any, index: any) => {
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="no-print mt-2.5 w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center border-black">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h5>{value?.title}</h5>
                        <p className="font-normal">{value?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7 w-full">
                {educationData?.skills?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="p-4 xl:p-6 border border-muted rounded-lg flex flex-col gap-5 sm:gap-10 items-center justify-between"
                    >
                      <div className="flex flex-col items-center gap-5">
                        <div className="text-black mb-2">
                          {getIcon(value?.name)}
                        </div>
                        <p className="text-black font-normal">{value?.name}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="9"
                              height="9"
                              rx="4.5"
                              fill={i < value?.rating ? "#000000" : "#E0E0E0"}
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
