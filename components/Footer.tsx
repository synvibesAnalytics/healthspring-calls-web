import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="bg-[#fefeff] z-0 relative border-t-2 border-[#6b6b6b2f]">
        <div className="mx-auto  px-4 pb-6 sm:px-6 lg:px-24 pt-6">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm">
                <Link
                  className="inline-block underline transition text-green-800 hover:text-green-950"
                  href="terms-and-conditions"
                >
                  Terms & Conditions
                </Link>

                <span>&nbsp;&middot;&nbsp;</span>

                <Link
                  className="inline-block underline transition text-green-800 hover:text-green-950"
                  href="privacy-policy"
                >
                  Privacy Policy
                </Link>
              </p>

              <p className="mt-4 text-sm sm:order-first sm:mt-0">
                powered by <Link href="https://synvibes.com" target="_blank" className="font-semibold text-indigo-800 hover:underline">Synvibes</Link>
              </p>
            </div>
    
        </div>
      </footer>
    </div>
  );
};

export default Footer;
