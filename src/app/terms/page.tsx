"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, FileText, Users, Shield, Scale, AlertCircle } from "lucide-react";

export default function TermsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-blue-100 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-6 h-0.5 bg-white rounded-full mb-1"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-0.5 h-3 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="w-6 h-0.5 bg-white rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
                NexyBill
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { href: "/", label: "Home", icon: ArrowLeft },
                { href: "/calculator", label: "Calculator", icon: Users },
                { href: "/example", label: "Example", icon: FileText },
                { href: "/history", label: "History", icon: FileText },
                { href: "/blog", label: "Blog", icon: FileText },
                { href: "/contact", label: "Contact", icon: FileText },
                { href: "/privacy", label: "Privacy", icon: Shield },
                { href: "/terms", label: "Terms", icon: Lock },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <div className="w-6 h-5 relative flex flex-col justify-center">
                <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
            <nav className="py-4 border-t border-blue-100">
              <div className="flex flex-col space-y-2">
                {[
                  { href: "/", label: "Home", icon: ArrowLeft },
                  { href: "/calculator", label: "Calculator", icon: Users },
                  { href: "/example", label: "Example", icon: FileText },
                  { href: "/history", label: "History", icon: FileText },
                  { href: "/blog", label: "Blog", icon: FileText },
                  { href: "/contact", label: "Contact", icon: FileText },
                  { href: "/privacy", label: "Privacy", icon: Shield },
                  { href: "/terms", label: "Terms", icon: Lock },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to NexyBill - please read our terms carefully
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>By using NexyBill, you agree to these terms:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>You must be at least 18 years old to use this service</li>
                  <li>You are responsible for the accuracy of your bill calculations</li>
                  <li>NexyBill is not liable for any financial disputes between parties</li>
                  <li>You may not use this service for illegal activities</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Service Description
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>NexyBill provides bill splitting calculation services:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Free basic bill splitting calculations</li>
                  <li>Storage of calculation history</li>
                  <li>Settlement recommendations</li>
                  <li>No guarantee of accuracy - verify calculations independently</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3" />
                Limitations
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>NexyBill service limitations:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Not responsible for rounding errors in calculations</li>
                  <li>Service availability depends on internet connection</li>
                  <li>Maximum 100 calculations per free account per month</li>
                  <li>Data retention for 6 months only</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3" />
                Privacy & Data
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Your data and privacy:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>All calculations are stored securely</li>
                  <li>We do not share personal data with third parties</li>
                  <li>You can delete your data at any time</li>
                  <li>Data is encrypted during transmission</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Modifications
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right to modify these terms:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Terms may be updated with reasonable notice</li>
                  <li>Continued use constitutes acceptance of new terms</li>
                  <li>We may suspend accounts for violations</li>
                  <li>Changes are effective immediately upon posting</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3" />
                Disclaimers
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Important disclaimers:</p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Service provided "as is" without warranties</li>
                  <li>Not financial advice - consult professionals</li>
                  <li>We are not responsible for user-generated content</li>
                  <li>Use at your own risk and discretion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                Questions About Terms?
              </h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these terms, please contact our legal team:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Contact Support
                </Link>
                <Link href="mailto:legal@NexyBill.com" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Email Legal Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
