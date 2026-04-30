import Logo from "../logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 sm:py-14 flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-1.5 items-center sm:items-start">
          <div className="relative flex items-center w-full">
            <div className="grow h-px bg-black" />
            <div className="mx-4">
              <Logo />
            </div>
            <div className="grow h-px bg-black" />
          </div>
          <p className="text-muted-foreground text-center sm:text-left text-sm sm:text-base mt-4 sm:mt-0">
            2026 © Designed by{" "}
            <Link
              href={"/"}
              className="hover:text-black font-semibold transition-colors"
            >
              Abdul Sami
            </Link>{" "}
            - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
