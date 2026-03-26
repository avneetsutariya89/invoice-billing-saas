"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Calculator, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

interface PersonSpent {
  name: string;
  spent: number;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export default function ExamplePage() {
  const [showResult, setShowResult] = useState(false);
  
  // Example data for a dinner scenario
  const examplePeople: PersonSpent[] = [
    { name: "Rahul", spent: 1200 },
    { name: "Priya", spent: 800 },
    { name: "Amit", spent: 1500 },
    { name: "Neha", spent: 600 }
  ];

  const exampleSettlements: Settlement[] = [
    { from: "Neha", to: "Amit", amount: 275 },
    { from: "Priya", to: "Amit", amount: 75 },
    { from: "Priya", to: "Rahul", amount: 125 },
    { from: "Neha", to: "Rahul", amount: 125 }
  ];

  const totalSpent = examplePeople.reduce((sum, person) => sum + person.spent, 0);
  const averageShare = totalSpent / examplePeople.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Calculator</span>
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">
              Example Calculation
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Scenario Description */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🍕 Dinner Split Example
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four friends went out for dinner. Let's see how to fairly split the bill when everyone paid different amounts.
            </p>
          </div>

          {/* People and Amounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {examplePeople.map((person, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{person.name}</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{person.spent}</p>
                  <p className="text-sm text-gray-600 mt-1">Paid</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-600 mb-2">Total Bill</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalSpent}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Average Share</p>
                <p className="text-3xl font-bold text-blue-600">₹{averageShare}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Number of People</p>
                <p className="text-3xl font-bold text-gray-900">{examplePeople.length}</p>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowResult(!showResult)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-xl text-lg"
            >
              {showResult ? "Hide Settlement" : "Calculate Settlement"}
              <Calculator className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Settlement Results */}
          {showResult && (
            <div className="animate-fadeIn">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-green-800">Fair Settlement Plan</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Each person should pay ₹{averageShare.toFixed(0)}. Here's who needs to pay whom:
                </p>

                <div className="space-y-4">
                  {exampleSettlements.map((settlement, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">-</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{settlement.from}</p>
                          <p className="text-sm text-gray-600">pays</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-blue-600">₹{settlement.amount}</div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-semibold text-gray-900">{settlement.to}</p>
                          <p className="text-sm text-gray-600">receives</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">+</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  <TrendingUp className="w-6 h-6 inline mr-2" />
                  How It Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Before Calculation:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Rahul paid ₹1200 (should pay ₹1025)</li>
                      <li>• Priya paid ₹800 (should pay ₹1025)</li>
                      <li>• Amit paid ₹1500 (should pay ₹1025)</li>
                      <li>• Neha paid ₹600 (should pay ₹1025)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">After Calculation:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Rahul gets back ₹175 from Priya + ₹175 from Neha</li>
                      <li>• Priya pays ₹75 to Amit + ₹125 to Rahul</li>
                      <li>• Amit gets back ₹75 from Priya + ₹275 from Neha</li>
                      <li>• Neha pays ₹275 to Amit + ₹125 to Rahul</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Try It Yourself */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Try It Yourself?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Use our calculator to split your own bills fairly and transparently.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-xl text-lg">
              Go to Calculator
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
