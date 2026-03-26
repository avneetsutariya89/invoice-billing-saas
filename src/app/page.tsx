"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Users, Calculator, Trash2, Plus, History, ArrowRight, DollarSign, TrendingUp, CheckCircle, Gift, HomeIcon, Car, PartyPopper, Heart, Zap, Menu, X, Star, Shield, Clock } from "lucide-react";

interface PersonSpent {
  name: string;
  spent: number;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface HistoryEntry {
  id: string;
  timestamp: string;
  people: PersonSpent[];
  settlements: Settlement[];
  totalSpent: number;
  averageShare: number;
}

export default function HomePage() {
  const [people, setPeople] = useState<PersonSpent[]>([
    { name: "", spent: 0 },
    { name: "", spent: 0 },
    { name: "", spent: 0 },
    { name: "", spent: 0 },
  ]);

  const [results, setResults] = useState<Settlement[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    try {
      const response = await fetch('/api/calculations');
      const data = await response.json();
      
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleCalculateAndSave = async () => {
    await calculateSettlements();
  };

  const updatePerson = (index: number, field: keyof PersonSpent, value: string | number) => {
    const newPeople = [...people];
    newPeople[index] = { ...newPeople[index], [field]: value };
    setPeople(newPeople);
  };

  const addPerson = () => {
    setPeople([...people, { name: "", spent: 0 }]);
  };

  const removePerson = (index: number) => {
    if (people.length > 2) {
      const newPeople = people.filter((_, i) => i !== index);
      setPeople(newPeople);
    }
  };

  const calculateSettlements = async (peopleData?: PersonSpent[]) => {
    try {
      console.log('🔢 Starting calculation...');
      const currentPeople = peopleData || people;
      
      // Validate inputs
      const validPeople = currentPeople.filter(p => p.name.trim() !== "" && p.spent > 0);
      console.log('✅ Valid people:', validPeople);

      if (validPeople.length < 2) {
        setResults([]);
        return;
      }

      // Calculate total spent
      const totalSpent = validPeople.reduce((sum, person) => sum + person.spent, 0);
      
      // Calculate average (equal share)
      const averageShare = totalSpent / validPeople.length;
      console.log('💰 Total:', totalSpent, 'Average:', averageShare);

      // Calculate who owes whom
      const settlements: Settlement[] = [];
      const balances: { [name: string]: number } = {};

      // Calculate each person's balance (positive = gets back, negative = owes)
      validPeople.forEach(person => {
        balances[person.name] = person.spent - averageShare;
      });

      // Create settlements (debtors pay creditors)
      const debtors: PersonSpent[] = [];
      const creditors: PersonSpent[] = [];

      validPeople.forEach(person => {
        const balance = person.spent - averageShare;
        if (balance < 0) {
          debtors.push(person);
        } else if (balance > 0) {
          creditors.push(person);
        }
      });

      console.log('📊 Debtors:', debtors.length, 'Creditors:', creditors.length);

      // Calculate optimal settlements
      let debtorIndex = 0;
      let creditorIndex = 0;

      while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
        const debtor = debtors[debtorIndex];
        const creditor = creditors[creditorIndex];
        
        const debtorOwes = Math.abs(debtor.spent - averageShare);
        const creditorIsOwed = creditor.spent - averageShare;
        
        const settlementAmount = Math.min(debtorOwes, creditorIsOwed);

        if (settlementAmount > 0.01) {
          settlements.push({
            from: debtor.name,
            to: creditor.name,
            amount: Math.round(settlementAmount * 100) / 100,
          });
        }

        // Update person's spent amount to reflect settlement
        if (debtorOwes < creditorIsOwed) {
          // Debtor is fully settled, move to next debtor
          debtorIndex++;
          // Update creditor's amount
          creditors[creditorIndex] = {
            ...creditor,
            spent: creditor.spent - settlementAmount
          };
        } else if (creditorIsOwed < debtorOwes) {
          // Creditor is fully settled, move to next creditor
          creditorIndex++;
          // Update debtor's amount
          debtors[debtorIndex] = {
            ...debtor,
            spent: debtor.spent + settlementAmount
          };
        } else {
          // Both are fully settled
          debtorIndex++;
          creditorIndex++;
        }
      }

      console.log('💸 Settlements calculated:', settlements);
      setResults(settlements);

      // Save to database
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        people: validPeople.map(p => ({ ...p })),
        settlements: [...settlements],
        totalSpent,
        averageShare
      };

      try {
        console.log('💾 Saving to database...');
        const response = await fetch('/api/calculations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(historyEntry),
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('✅ Saved to database:', result);
          // Refresh history from database
          fetchCalculations();
        } else {
          console.error('❌ Failed to save:', result.error);
        }
      } catch (error) {
        console.error('❌ Error saving to database:', error);
      }
    } catch (error) {
      console.error('❌ Error in calculation:', error);
      throw error;
    }
  };

  const resetCalculator = () => {
    setPeople([
      { name: "", spent: 0 },
      { name: "", spent: 0 },
      { name: "", spent: 0 },
      { name: "", spent: 0 },
    ]);
    setResults([]);
  };

  const totalSpent = people.reduce((sum, person) => sum + person.spent, 0);
  const averageShare = people.filter(p => p.name.trim() !== "").length > 0 ? totalSpent / people.filter(p => p.name.trim() !== "").length : 0;

  const stats = {
    calculations: 1250,
    users: 8750,
    money: 2500000
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">BillSplit Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#calculator" className="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
              <a href="#history" className="text-gray-700 hover:text-blue-600 transition-colors">History</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Home</a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Features</a>
                <a href="#calculator" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Calculator</a>
                <a href="#history" className="text-gray-700 hover:text-blue-600 transition-colors py-2">History</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Contact</a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 sm:py-24 md:py-32 bg-gradient-to-br from-blue-50 to-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8 shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              Smart Bill Splitting for Modern Groups
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Fighting Over
              <span className="block text-blue-600 mt-2">
                Who Pays What
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The smartest way to split bills with friends, family, and colleagues. 
              Calculate who owes whom in seconds, not hours. Fair, transparent, and stress-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#calculator">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-xl">
                  Start Calculating
                </Button>
              </a>
              <a href="#features">
                <Button variant="outline" className="border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-xl">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BillSplit Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make bill splitting effortless and fair
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Group Friendly</h3>
              <p className="text-gray-600">Perfect for roommates, trips, dinners, and shared expenses with any group size</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Instant Results</h3>
              <p className="text-gray-600">Get fair settlement calculations in real-time with our smart algorithm</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Track History</h3>
              <p className="text-gray-600">Save and review all your past calculations and settlements</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and never shared with third parties</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Time Saving</h3>
              <p className="text-gray-600">Calculate complex splits in seconds, not hours of manual work</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">User Friendly</h3>
              <p className="text-gray-600">Simple, intuitive interface that anyone can use without training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Try It Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your group expenses and get instant fair settlement calculations
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
              {/* Input Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl font-bold text-blue-600">
                    <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                    Input Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {people.map((person, index) => (
                      <div key={index} className="space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-gray-700">Person {index + 1}</Label>
                          {people.length > 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePerson(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 h-8 w-8 p-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <Input
                          type="text"
                          placeholder="Name"
                          value={person.name}
                          onChange={(e) => updatePerson(index, 'name', e.target.value)}
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={person.spent || ''}
                            onChange={(e) => updatePerson(index, 'spent', parseFloat(e.target.value) || 0)}
                            className="pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={addPerson}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Person
                    </Button>
                    <Button
                      onClick={resetCalculator}
                      className="bg-gray-600 hover:bg-gray-700 text-white w-full sm:w-auto"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Reset Calculator
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl font-bold text-blue-600">
                    <TrendingUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                    Settlement Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {results.length > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-blue-800">Who Pays Whom:</h3>
                          <div className="flex items-center text-blue-600">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            <span className="text-sm font-medium">{results.length} transaction{results.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {results.map((settlement, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                  <span className="text-red-600 font-bold text-xs">-</span>
                                </div>
                                <span className="font-medium text-gray-900">{settlement.from}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <div className="text-xl font-bold text-blue-600">₹{settlement.amount.toFixed(2)}</div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{settlement.to}</span>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <span className="text-green-600 font-bold text-xs">+</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Enter amounts and click calculate to see settlements</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCalculateAndSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg w-full sm:w-auto text-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                <span className="text-sm sm:text-base">Calculate & Save!</span>
              </Button>
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-blue-700">₹{totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-green-600 font-medium mb-1">Average Share</p>
                <p className="text-2xl font-bold text-green-700">₹{averageShare.toFixed(2)}</p>
              </div>
            </div>

            {/* View History Link */}
            {history.length > 0 && (
              <div className="text-center mt-8">
                <Link 
                  href="/history" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <History className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  View All Calculation History
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2024 Bill Split Calculator. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for better group experiences</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
