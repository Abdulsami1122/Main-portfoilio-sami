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
    title: "Wiser Consulting Website (MERN)",
    client: "Global visa assistance, documentation, and user-friendly portal",
    slug: "https://wiserconsulting.info/",
  },
];

export const GET = async () => {
  return NextResponse.json({
    workData,
  });
};
