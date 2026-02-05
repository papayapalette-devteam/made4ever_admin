import React from "react";
import { Mail, Phone, MapPin} from "lucide-react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            {/* Replace with your logo image or text */}
            <h2 className="text-2xl font-bold text-white">Made4Ever</h2>
            <p className="text-gray-300 text-sm">
              India's #1 income-generating and match-making web portal for marriage bureaus.
              Connecting hearts, building futures.
            </p>
      <div className="flex space-x-4">
  <a
    href="https://www.facebook.com/people/Made4ever-Matrimonial/61552581722726/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Facebook className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>

  <a
    href="https://twitter.com/ashish_narang1"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Twitter className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>

  <a
    href="https://www.instagram.com/made4ever_app/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>

  <a
    href="https://www.linkedin.com/in/ashish-narang-5149aa238/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Linkedin className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/channel/UCN6SSrH1jP9UkkCdZvjzUQg/videos"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Youtube className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>

  {/* WordPress */}
  <a
    href="https://made4evermatrimonial.wordpress.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Globe className="h-5 w-5 text-[#bf5281] hover:text-white cursor-pointer" />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://made4ever.in/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="https://made4ever.in/aboutus" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://made4ever.in/contactus" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://made4ever.in/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
             
              <li><a href="https://made4ever.in/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="https://made4ever.in/contactus" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="https://made4ever.in/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="https://made4ever.in/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-gray-300 text-sm">
                  Pragati Tower, Rajendra Place, Delhi 110008, IN
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300 text-sm">+91 9911126001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-300 text-sm">connect@made4ever.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            COPYRIGHT© {new Date().getFullYear()} M/S MADE 4 EVER MATRIMONIAL PRIVATE LIMITED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
