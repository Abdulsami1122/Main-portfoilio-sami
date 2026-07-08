import { NextResponse } from "next/server";

const workData = [
  {
    image: "/images/work/pos.png",
    title: "POS System (PERN)",
    client:
      "Double-entry accounting, inventory, warehouses & international clients",
    slug: "https://sa.wiserconsulting.info/login",
  },
  {
    image: "/images/work/gultraders1.png",
    title: "Gul Traders Website (MERN)",
    client: "Responsive UI/UX and business-focused design",
    slug: "https://gultraders.com/",
  },
  {
    image: "/images/work/visa-mockup.png",
    title: "Wiser Consulting Website (MERN & Next.js)",
    client: "Global visa assistance, documentation, and user-friendly portal",
    slug: "https://wiserconsulting.info/",
  },
  {
    image: "/images/work/wiser-consulting-software.png",
    title: "Tech Wiser Consulting Software House (MERN & Next.js)",
    client: "A professional software development house specializing in robust web systems and custom enterprise solutions. We leverage MERN and Next.js to automate business processes and drive digital growth.",
    slug: "https://tech.wiserconsulting.info/",
  },
];

export const GET = async () => {
  return NextResponse.json({
    workData,
  });
};
