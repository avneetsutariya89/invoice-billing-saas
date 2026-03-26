"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">
              Bill Split Calculator
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Calculator Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                The calculator functionality is being loaded...
              </p>
              <Link href="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
