// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-300 mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-slate-700">
          &copy; {new Date().getFullYear()} ITI Job Connect. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
