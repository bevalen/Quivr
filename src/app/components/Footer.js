import React from 'react';

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold mb-2 md:mb-0">
            Quivr
          </div>
          <div className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Quivr. All rights reserved.
          </div>
          <div className="text-sm">
            Created by <a href="mailto:Ben@BenValentin.me" className="hover:text-gray-400">Ben Valentin</a>
          </div>
        </div>
      </footer>
    );
}