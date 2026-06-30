import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              ScienceLab
            </h2>

            <p className="text-sm leading-6">
              An interactive platform where students can explore
              Physics, Chemistry, and Biology experiments through
              virtual simulations and quizzes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories
            </h3>

            <ul className="space-y-2">
              <li>Physics Experiments</li>
              <li>Chemistry Experiments</li>
              <li>Biology Experiments</li>
              <li>Interactive Quizzes</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-2">
              <li>Ahmedabad, Gujarat</li>
              <li>science@lab.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © 2026 Interactive Science Lab. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;