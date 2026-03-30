"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  Calculator, 
  Trash2, 
  Plus, 
  History, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Gift, 
  HomeIcon, 
  Car, 
  PartyPopper, 
  Heart, 
  Zap, 
  Menu, 
  X, 
  Star, 
  Shield, 
  Clock, 
  FileText, 
  Mail, 
  MessageSquare, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from "lucide-react";

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
  const [counters, setCounters] = useState({ calculations: 0, users: 0, money: 0 });
  const [isCounting, setIsCounting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  useEffect(() => {
    fetchCalculations();
  }, []);

  // Auto-counting animation
  useEffect(() => {
    const targetValues = { calculations: 2000000, users: 50000, money: 10000000 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      calculations: targetValues.calculations / steps,
      users: targetValues.users / steps,
      money: targetValues.money / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        calculations: Math.min(Math.floor(increment.calculations * currentStep), targetValues.calculations),
        users: Math.min(Math.floor(increment.users * currentStep), targetValues.users),
        money: Math.min(Math.floor(increment.money * currentStep), targetValues.money)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsCounting(false);
      }
    }, duration / steps);

    setIsCounting(true);
    return () => clearInterval(timer);
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
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
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
                Splitly
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { href: "/", label: "Home", icon: HomeIcon },
                { href: "/blog", label: "Blog", icon: FileText },
                { href: "/calculator", label: "Calculator", icon: Calculator },
                { href: "/example", label: "Example", icon: TrendingUp },
                { href: "/history", label: "History", icon: History },
                { href: "/contact", label: "Contact", icon: Heart }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center">
                    <item.icon className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              ))}
            </nav>
            
            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Link href="/calculator">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-5 relative flex flex-col justify-center">
                  <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                  <span className={`h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className={`lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-5 h-0.5 bg-white rounded-full mb-1"></div>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-0.5 h-2 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div className="w-5 h-0.5 bg-white rounded-full mt-1"></div>
                      </div>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      Splitly
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {[
                    { href: "/", label: "Home", icon: HomeIcon },
                    { href: "/calculator", label: "Calculator", icon: Calculator },
                    { href: "/example", label: "Example", icon: TrendingUp },
                    { href: "/history", label: "History", icon: History },
                    { href: "/blog", label: "Blog", icon: FileText },
                    { href: "/contact", label: "Contact", icon: Mail },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-lg">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 sm:py-24 md:py-32 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 mt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-blue-200/[0.1] bg-size-8"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-blue-600 text-sm font-semibold shadow-2xl animate-bounce mb-8">
              <Zap className="w-5 h-5 mr-2 text-blue-500" />
              Smart Bill Splitting for Modern Groups
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight drop-shadow-lg mb-6">
              Stop Fighting Over
              <span className="block text-blue-600 mt-2 drop-shadow-md">
                Who Pays What
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed backdrop-blur-sm mb-12 max-w-3xl mx-auto">
              The smartest way to split bills with friends, family, and colleagues. 
              Calculate who owes whom in seconds, not hours. Fair, transparent, and stress-free.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/calculator">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/40">
                  <Calculator className="mr-3 h-5 w-5" />
                  Start Calculating
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="bg-white/80 text-blue-600 border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 px-8 py-4 rounded-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
                  <FileText className="mr-3 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {isCounting ? (
                    <span className="inline-block">
                      {counters.calculations.toLocaleString()}+
                    </span>
                  ) : (
                    <span className="inline-block">
                      {counters.calculations.toLocaleString()}+
                    </span>
                  )}
                </div>
                <div className="text-gray-700">Calculations Done</div>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {isCounting ? (
                    <span className="inline-block">
                      {counters.users.toLocaleString()}+
                    </span>
                  ) : (
                    <span className="inline-block">
                      {counters.users.toLocaleString()}+
                    </span>
                  )}
                </div>
                <div className="text-gray-700">Happy Users</div>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {isCounting ? (
                    <span className="inline-block">
                      ${counters.money.toLocaleString()}+
                    </span>
                  ) : (
                    <span className="inline-block">
                      ${counters.money.toLocaleString()}+
                    </span>
                  )}
                </div>
                <div className="text-gray-700">Money Split</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 sm:h-24" viewBox="0 0 1440 120" fill="none">
            <path d="M0,64L48,58.7C96,53.3,144,48,192,48C240,48,288,53.3,336,58.7C384,64,432,69.3,480,74.7C528,80,576,85.3,624,90.7C672,96,720,101.3,768,106.7C816,112,864,117.3,912,122.7C960,128,1008,133.3,1056,138.7C1104,144,1152,149.3,1200,154.7C1248,160,1296,165.3,1344,170.7C1392,176,1440,181.3,1440,192L1440,192L0,192Z" fill="white" fillOpacity="0.3"/>
            <path d="M0,96L48,90.7C96,85.3,144,80,192,80C240,80,288,85.3,336,90.7C384,96,432,101.3,480,106.7C528,112,576,117.3,624,122.7C672,128,720,133.3,768,138.7C816,144,864,149.3,912,154.7C960,160,1008,165.3,1056,170.7C1104,176,1152,181.3,1200,186.7C1248,192,1296,197.3,1344,202.7C1392,208,1440,213.3,1440,224L1440,224L0,224Z" fill="white"/>
          </svg>
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

      {/* Testimonials Section with Auto-Scrolling */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have simplified their bill splitting
            </p>
          </div>
          
          {/* Auto-scrolling Testimonials */}
          <div className="relative">
            <div className="flex animate-scroll space-x-6">
              {/* First set of testimonials */}
              {[
                {
                  name: "Rahul P.",
                  location: "Mumbai",
                  rating: 5,
                  review: "This calculator has saved our friend group so many arguments. It's incredibly accurate and easy to use!",
                  avatar: "R"
                },
                {
                  name: "Priya S.",
                  location: "Delhi",
                  rating: 5,
                  review: "Perfect for splitting trip expenses among our group of 8. The settlement suggestions are always fair.",
                  avatar: "P"
                },
                {
                  name: "Amit K.",
                  location: "Bangalore",
                  rating: 5,
                  review: "The history feature is amazing! I can track all our past dinners and trips. Highly recommended!",
                  avatar: "A"
                },
                {
                  name: "Neha M.",
                  location: "Pune",
                  rating: 5,
                  review: "Best bill splitting app I've ever used! The interface is clean and the calculations are instant.",
                  avatar: "N"
                },
                {
                  name: "Vikram S.",
                  location: "Hyderabad",
                  rating: 5,
                  review: "We use this for our office lunch groups. Makes splitting expenses so much easier!",
                  avatar: "V"
                },
                {
                  name: "Kavita R.",
                  location: "Chennai",
                  rating: 5,
                  review: "Love the simplicity and accuracy. No more manual calculations needed!",
                  avatar: "K"
                },
                {
                  name: "Rohit J.",
                  location: "Kolkata",
                  rating: 5,
                  review: "Game changer for our hostel mates! Everyone pays their fair share now.",
                  avatar: "R"
                },
                {
                  name: "Anita D.",
                  location: "Jaipur",
                  rating: 5,
                  review: "The smart algorithm ensures everyone pays exactly what they owe. Brilliant!",
                  avatar: "A"
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.review}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless scrolling */}
              {[
                {
                  name: "Rahul P.",
                  location: "Mumbai",
                  rating: 5,
                  review: "This calculator has saved our friend group so many arguments. It's incredibly accurate and easy to use!",
                  avatar: "R"
                },
                {
                  name: "Priya S.",
                  location: "Delhi",
                  rating: 5,
                  review: "Perfect for splitting trip expenses among our group of 8. The settlement suggestions are always fair.",
                  avatar: "P"
                },
                {
                  name: "Amit K.",
                  location: "Bangalore",
                  rating: 5,
                  review: "The history feature is amazing! I can track all our past dinners and trips. Highly recommended!",
                  avatar: "A"
                },
                {
                  name: "Neha M.",
                  location: "Pune",
                  rating: 5,
                  review: "Best bill splitting app I've ever used! The interface is clean and the calculations are instant.",
                  avatar: "N"
                },
                {
                  name: "Vikram S.",
                  location: "Hyderabad",
                  rating: 5,
                  review: "We use this for our office lunch groups. Makes splitting expenses so much easier!",
                  avatar: "V"
                },
                {
                  name: "Kavita R.",
                  location: "Chennai",
                  rating: 5,
                  review: "Love the simplicity and accuracy. No more manual calculations needed!",
                  avatar: "K"
                },
                {
                  name: "Rohit J.",
                  location: "Kolkata",
                  rating: 5,
                  review: "Game changer for our hostel mates! Everyone pays their fair share now.",
                  avatar: "R"
                },
                {
                  name: "Anita D.",
                  location: "Jaipur",
                  rating: 5,
                  review: "The smart algorithm ensures everyone pays exactly what they owe. Brilliant!",
                  avatar: "A"
                }
              ].map((testimonial, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.review}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>

        {/* Mobile Footer Toggle */}
        <div className="md:hidden relative z-20">
          <button
            onClick={() => setIsFooterOpen(!isFooterOpen)}
            className="w-full bg-blue-800/50 backdrop-blur-sm border-t border-blue-700/50 py-4 flex items-center justify-center space-x-2 hover:bg-blue-800/70 transition-all duration-300"
          >
            <span className="text-sm font-medium">
              {isFooterOpen ? 'Hide Footer' : 'Show Footer'}
            </span>
            <div className={`transform transition-transform duration-300 ${isFooterOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        <div className={`relative z-10 transition-all duration-500 ease-in-out ${isFooterOpen ? 'max-h-screen opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100 overflow-hidden'}`}>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
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
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    Splitly
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  The smartest way to split bills with friends and family. Fair, fast, and stress-free calculations.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700/50 transition-all duration-300 transform hover:scale-110">
                    <Twitter className="w-5 h-5 text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700/50 transition-all duration-300 transform hover:scale-110">
                    <Facebook className="w-5 h-5 text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700/50 transition-all duration-300 transform hover:scale-110">
                    <Instagram className="w-5 h-5 text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700/50 transition-all duration-300 transform hover:scale-110">
                    <Linkedin className="w-5 h-5 text-blue-300" />
                  </a>
                </div>
              </div>
              
              {/* Product Links */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-blue-300 mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/calculator" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <Calculator className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/example" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <FileText className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Example
                    </Link>
                  </li>
                  <li>
                    <Link href="/history" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <History className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      History
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Company Links */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-blue-300 mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <Mail className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <Users className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                      <MessageSquare className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-blue-300 mb-4">Stay Updated</h3>
                <p className="text-gray-300 mb-4">
                  Get the latest updates and bill splitting tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-blue-800/50 border border-blue-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-blue-800/70 transition-all duration-300"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="border-t border-blue-800/50 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-400">
                    © 2024 Splitly. All rights reserved.
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4 mt-2 text-sm text-gray-400">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-blue-500 fill-current animate-pulse" />
                  <span>for better group experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
