import { NextResponse } from "next/server";

const contactBar = {
  contactItems: [
    {
      type: "email",
      label: "taimour448@gmail.com",
      icon: "/images/icon/mail-icon.svg",
      link: "mailto:taimour448@gmail.com",
    },
    {
      type: "phone",
      label: "0313 0922988",
      icon: "/images/icon/call-icon.svg",
      link: "tel:+923130922988",
    },
    {
      type: "website",
      label: "Portfolio",
      icon: "/images/icon/web-icon.svg",
      link: "/",
    },
  ],
  socialItems: [
    {
      platform: "github",
      icon: "/images/icon/github-icon.svg",
      link: "https://github.com/ShahTaimoor",
    },
    {
      platform: "linkedin",
      icon: "/images/icon/linkedin-icon.svg",
      link: "https://www.linkedin.com/in/shah-taimoor-bin-khalid-b86191268/",
    },
  ],
};

const educationData = {
  education: [
    {
      title: "Bachelor of Software Engineering (2022 - 2026)",
      description: "Islamia College University - undergraduate studies.",
    },
    {
      title: "FSc in Computer Science (2020 - 2022)",
      description: "Govt College Peshawar.",
    },
  ],
  skills: [
    {
      name: "MERN & PERN Stack",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
    {
      name: "React.js, Next.js & Redux Toolkit",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
    {
      name: "Node.js & Express.js",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
    {
      name: "MongoDB, PostgreSQL, and MySQL",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
    {
      name: "REST APIs & JWT Auth",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
    {
      name: "Deployment & Linux Servers",
      icon: "/images/icon/web-icon.svg",
      rating: 5,
    },
  ],
};

const contactLinks = {
  socialLinks: [
    {
      title: "GitHub",
      href: "https://github.com/ShahTaimoor",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/shah-taimoor-bin-khalid-b86191268/",
    },
  ],
  contactInfo: [
    {
      type: "email",
      label: "taimour448@gmail.com",
      link: "mailto:taimour448@gmail.com",
    },
    {
      type: "phone",
      label: "0313 0922988",
      link: "tel:+923130922988",
    },
  ],
};

export const GET = async () => {
  return NextResponse.json({
    contactBar,
    educationData,
    contactLinks,
  });
};
