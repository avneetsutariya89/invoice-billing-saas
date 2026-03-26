"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Trash2, Calendar, Filter, Clock, TrendingUp, Users, DollarSign, ChevronDown } from "lucide-react";

interface HistoryEntry {
  id: string;
  timestamp: string;
  people: Array<{ name: string; spent: number }>;
  settlements: Array<{ from: string; to: string; amount: number }>;
  totalSpent: number;
  averageShare: number;
}

type FilterType = 'all' | 'today' | 'yesterday' | 'last24hrs' | 'lastWeek' | 'last30days' | 'lastMonth';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchCalculations();
  }, []);

  useEffect(() => {
    applyFilter(selectedFilter);
  }, [history, selectedFilter]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const fetchCalculations = async () => {
    try {
      console.log('📖 History page: Fetching calculations...');
      setLoading(true);
      const response = await fetch('/api/calculations');
      const data = await response.json();
      
      console.log('📊 History page: Response data:', data);
      
      if (data.success) {
        console.log('✅ History page: Setting history data:', data.data);
        setHistory(data.data);
      } else {
        console.error('❌ History page: Failed to fetch:', data.error);
        setError(data.error || 'Failed to fetch history');
      }
    } catch (error) {
      console.error('❌ History page: Network error:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (filter: FilterType) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last24hrs = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    let filtered = [...history];

    switch (filter) {
      case 'today':
        filtered = filtered.filter(entry => new Date(entry.timestamp) >= today);
        break;
      case 'yesterday':
        filtered = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return entryDate >= yesterday && entryDate < today;
        });
        break;
      case 'last24hrs':
        filtered = filtered.filter(entry => new Date(entry.timestamp) >= last24hrs);
        break;
      case 'lastWeek':
        filtered = filtered.filter(entry => new Date(entry.timestamp) >= lastWeek);
        break;
      case 'last30days':
        filtered = filtered.filter(entry => new Date(entry.timestamp) >= last30days);
        break;
      case 'lastMonth':
        filtered = filtered.filter(entry => new Date(entry.timestamp) >= lastMonth);
        break;
      case 'all':
      default:
        // Show all
        break;
    }

    setFilteredHistory(filtered);
  };

  const deleteCalculation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this calculation?')) {
      return;
    }

    try {
      console.log('🗑️ Deleting calculation:', id);
      const response = await fetch(`/api/calculations/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      console.log('📊 Delete response:', result);
      
      if (result.success) {
        console.log('✅ Calculation deleted successfully');
        const updatedHistory = history.filter((entry: HistoryEntry) => entry.id !== id);
        setHistory(updatedHistory);
        // Also update filtered history
        setFilteredHistory(filteredHistory.filter((entry: HistoryEntry) => entry.id !== id));
      } else {
        console.error('❌ Failed to delete:', result.error);
        alert('Failed to delete calculation: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Error deleting calculation:', error);
      alert('Failed to delete calculation. Please try again.');
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const entryDate = new Date(timestamp);
    const diffMs = now.getTime() - entryDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(timestamp);
  };

  const filters: { value: FilterType; label: string; icon: any }[] = [
    { value: 'all', label: 'All Time', icon: Clock },
    { value: 'last24hrs', label: 'Last 24 Hours', icon: Clock },
    { value: 'today', label: 'Today', icon: Calendar },
    { value: 'yesterday', label: 'Yesterday', icon: Calendar },
    { value: 'lastWeek', label: 'Last Week', icon: TrendingUp },
    { value: 'last30days', label: 'Last 30 Days', icon: Calendar },
    { value: 'lastMonth', label: 'Last Month', icon: Calendar },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Loading calculations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <p className="text-xl text-red-600 dark:text-red-400 mb-6">{error}</p>
          <Button onClick={fetchCalculations} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Calculator</span>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-600">
                Calculation History
              </h1>
              <p className="text-gray-600 mt-1">Track and manage your bill splits</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filter Calculations</h2>
              </div>
              
              {/* Dropdown */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  {filters.find(f => f.value === selectedFilter)?.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {filters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => {
                          setSelectedFilter(filter.value);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 transition-colors ${
                          selectedFilter === filter.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        <filter.icon className="w-4 h-4" />
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredHistory.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{history.length}</span> calculations
              </p>
              {selectedFilter !== 'all' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-2">{filteredHistory.length}</div>
              <p className="text-blue-100">Calculations</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ₹{filteredHistory.reduce((sum: number, entry: HistoryEntry) => sum + entry.totalSpent, 0).toFixed(0)}
              </div>
              <p className="text-blue-100">Total Amount</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-400 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-2">
                {filteredHistory.reduce((sum: number, entry: HistoryEntry) => sum + entry.settlements.length, 0)}
              </div>
              <p className="text-blue-100">Transactions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-300 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-2">
                {filteredHistory.reduce((sum: number, entry: HistoryEntry) => sum + entry.people.length, 0)}
              </div>
              <p className="text-blue-100">Total People</p>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <Calculator className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                {selectedFilter === 'all' ? 'No Calculations Yet' : 'No Calculations Found'}
              </h2>
              <p className="text-gray-500 mb-8">
                {selectedFilter === 'all' 
                  ? 'Your calculation history will appear here once you start using the calculator.'
                  : 'No calculations found for the selected time period.'
                }
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Start Calculating
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHistory.map((entry: HistoryEntry) => (
              <Card key={entry.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                        {formatDate(entry.timestamp)}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTimeAgo(entry.timestamp)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {entry.people.map((p: any) => p.name).join(', ')}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCalculation(entry.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium mb-1">Total</div>
                      <div className="text-lg font-bold text-blue-700">
                        ₹{entry.totalSpent.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium mb-1">Average</div>
                      <div className="text-lg font-bold text-blue-700">
                        ₹{entry.averageShare.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {entry.settlements.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {entry.settlements.length} Transaction{entry.settlements.length !== 1 ? 's' : ''}
                        </h4>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {entry.settlements.map((settlement: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs">
                            <span className="text-gray-700 font-medium">
                              {settlement.from} → {settlement.to}
                            </span>
                            <span className="font-bold text-blue-600">
                              ₹{settlement.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
