"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Calculator,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  ChevronDown,
  Star,
  Heart,
  Share2,
  Bookmark,
  Search,
  Filter,
  HelpCircle,
  MessageCircle,
  Award,
  Zap,
  Globe,
  Target,
  Sparkles,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "PM Awas Yojana 2024: Government Housing Assistance",
    excerpt: "PM Awas Yojana now provides financial assistance up to ₹2.67 lakh for beneficiaries in Gujarat to build their dream homes. Learn how to apply and required documents.",
    author: "Rajendra Patel",
    date: "March 25, 2024",
    readTime: "6 min read",
    category: "Government Scheme",
    image: "https://picsum.photos/seed/pm-awas-gujarat/400/250",
    slug: "pm-awas-yojana-gujarat-2024",
    likes: 42,
    featured: true
  },
  {
    id: 2,
    title: "Benefits: CM Gautami Yojana Gujarat 2024",
    excerpt: "Gujarat government's Gautami Yojana now provides ₹1 lakh financial assistance and training for rural women's economic empowerment. Complete information and application process.",
    author: "Anita Desai",
    date: "March 22, 2024",
    readTime: "5 min read",
    category: "Women Empowerment",
    image: "https://picsum.photos/seed/gautami-yojana-gujarat/400/250",
    slug: "cm-gautami-yojana-gujarat",
    likes: 38
  },
  {
    id: 3,
    title: "Golden Opportunity for Farmers: PM Kisan Samman Nidhi Yojana",
    excerpt: "PM Kisan Samman Nidhi Yojana now provides direct financial assistance to 12 crore farmers through three installments of ₹6000. Know new updates and benefits.",
    author: "Dilipbhai Mehta",
    date: "March 20, 2024",
    readTime: "7 min read",
    category: "Agriculture Scheme",
    image: "https://picsum.photos/seed/pm-kisan-samman/400/250",
    slug: "pm-kisan-samman-nidhi",
    likes: 55
  },
  {
    id: 4,
    title: "Government Assistance for Education: CM Shri Yojana Gujarat",
    excerpt: "CM Shri Yojana now provides scholarships up to ₹50,000 and coaching fee facilities for higher education of Gujarat students.",
    author: "Priya Shah",
    date: "March 18, 2024",
    readTime: "5 min read",
    category: "Education Scheme",
    image: "https://picsum.photos/seed/cm-shri-yojana-education/400/250",
    slug: "cm-shri-yojana-education",
    likes: 31
  },
  {
    id: 5,
    title: "Employment Generation: CM Gatishakti Yojana Gujarat",
    excerpt: "Gujarat government's Gatishakti Yojana for youth employment now provides ₹20,000 assistance and free training. Complete application process.",
    author: "Rahul Singh",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Employment Scheme",
    image: "https://picsum.photos/seed/cm-gatishakti-yojana/400/250",
    slug: "cm-gatishakti-yojana-gujarat",
    likes: 47
  },
  {
    id: 6,
    title: "How to Split Bills Fairly: Complete Guide 2024",
    excerpt: "Master the art of fair bill splitting with our comprehensive guide. Learn proven methods for group dinners, trips, and shared expenses to keep friendships strong.",
    author: "Sarah Johnson",
    date: "March 28, 2024",
    readTime: "8 min read",
    category: "Bill Splitting",
    image: "https://picsum.photos/seed/bill-splitting-fair/400/250",
    slug: "how-to-split-bills-fairly-guide",
    likes: 63
  },
  {
    id: 7,
    title: "Ultimate Bill Calculator: Split Expenses Like a Pro",
    excerpt: "Discover how our advanced bill calculator takes the stress out of group expenses. Features, tips, and tricks for perfect financial harmony.",
    author: "Mike Chen",
    date: "March 26, 2024",
    readTime: "6 min read",
    category: "Calculator Guide",
    image: "https://picsum.photos/seed/bill-calculator-pro/400/250",
    slug: "ultimate-bill-calculator-guide",
    likes: 51
  },
  {
    id: 8,
    title: "Group Trip Budget Planning: Split Travel Costs Smartly",
    excerpt: "Planning a group vacation? Learn how to budget, track, and split travel expenses fairly. From hotels to meals, we've got you covered.",
    author: "Emily Rodriguez",
    date: "March 24, 2024",
    readTime: "7 min read",
    category: "Travel Finance",
    image: "https://picsum.photos/seed/group-travel-budget/400/250",
    slug: "group-trip-budget-planning",
    likes: 44
  },
  {
    id: 9,
    title: "Roommate Bill Splitting: Avoid Common Conflicts",
    excerpt: "Living with roommates? Essential guide to splitting rent, utilities, and shared expenses without drama. Practical tips for peaceful cohabitation.",
    author: "David Kim",
    date: "March 22, 2024",
    readTime: "5 min read",
    category: "Living Expenses",
    image: "https://picsum.photos/seed/roommate-bills/400/250",
    slug: "roommate-bill-splitting-guide",
    likes: 58
  }
];

const faqData = [
  {
    question: "How do I apply for PM Awas Yojana?",
    answer: "You can apply online through the official PMAY portal or visit your nearest Common Service Center. Make sure you have all required documents like Aadhaar card, income certificate, and bank details ready.",
    category: "Government Schemes"
  },
  {
    question: "What is the best method for splitting bills with friends?",
    answer: "The best method depends on your situation. For simple splits, use equal division. For varying consumption, use proportional splitting. Our calculator app automates this process for accuracy.",
    category: "Bill Splitting"
  },
  {
    question: "How does the bill calculator work?",
    answer: "Our calculator uses advanced algorithms to determine who owes whom with minimal transactions. Simply enter who paid what, and it calculates the optimal settlement plan.",
    category: "Calculator"
  },
  {
    question: "Are government schemes available for all states?",
    answer: "Most central government schemes are available nationwide, but state-specific schemes may vary. Check eligibility criteria for your specific state and region.",
    category: "Government Schemes"
  },
  {
    question: "How can I avoid conflicts when splitting bills with roommates?",
    answer: "Establish clear rules upfront, use a tracking system, communicate regularly, and consider creating a shared expense account. Document everything to prevent misunderstandings.",
    category: "Living Expenses"
  },
  {
    question: "What documents are needed for CM Gautami Yojana?",
    answer: "You'll need Aadhaar card, residence proof, income certificate, bank account details, and photographs. Additional documents may be required based on your specific category.",
    category: "Government Schemes"
  }
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [animateStats, setAnimateStats] = useState(false);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const categories = ["All", "Government Scheme", "Bill Splitting", "Calculator Guide", "Travel Finance", "Living Expenses", "Women Empowerment", "Education Scheme", "Employment Scheme", "Agriculture Scheme"];

  const toggleFaq = useCallback((index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  }, [expandedFaq]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center max-w-6xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium mb-6 animate-bounce">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to Our Blog Hub
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-in-up">
              Discover Insights
              <span className="block text-2xl md:text-3xl lg:text-5xl mt-2">& Expert Tips</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Explore comprehensive guides on government schemes, bill splitting strategies, and smart financial management tools designed for modern life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/calculator">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                  Try Calculator Now
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300">
                  Explore Home
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        
        {/* Learning Hub Section */}
        {/* <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Learning Hub
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial Education
                <span className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Learn & Grow</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Master your finances with our comprehensive guides, tutorials, and expert tips.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Budgeting Basics",
                  lessons: 12,
                  duration: "2 hours",
                  level: "Beginner",
                  icon: "📚",
                  color: "from-green-400 to-green-500"
                },
                {
                  title: "Investment 101",
                  lessons: 18,
                  duration: "3 hours",
                  level: "Intermediate",
                  icon: "📈",
                  color: "from-blue-400 to-blue-500"
                },
                {
                  title: "Tax Planning",
                  lessons: 15,
                  duration: "2.5 hours",
                  level: "Advanced",
                  icon: "🧾",
                  color: "from-purple-400 to-purple-500"
                },
                {
                  title: "Debt Management",
                  lessons: 10,
                  duration: "1.5 hours",
                  level: "Intermediate",
                  icon: "💳",
                  color: "from-red-400 to-red-500"
                }
              ].map((course, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{course.icon}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.lessons} lessons • {course.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Search and Filter Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Article</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
              </div>
              <Card className="border-0 shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        6 min read
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {filteredPosts.find(post => post.featured)?.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {filteredPosts.find(post => post.featured)?.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{filteredPosts.find(post => post.featured)?.author}</p>
                          <p className="text-sm text-gray-600">{filteredPosts.find(post => post.featured)?.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white">
                        <Link href={`/blog/${filteredPosts.find(post => post.featured)?.slug}`} className="flex items-center">
                          Read Full Article
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-64 lg:h-auto min-h-[300px]">
                    <Image
                      src={filteredPosts.find(post => post.featured)?.image || ''}
                      alt={filteredPosts.find(post => post.featured)?.title || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                      loading="eager"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.filter(post => !post.featured).map((post, index) => (
                <Card key={post.id} className="border-0 shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-600">{post.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Heart className="w-4 h-4 fill-current" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <Link href={`/blog/${post.slug}`} className="flex-1">
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      
                      <div className="flex items-center space-x-1">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Got Questions?
                <span className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">We Have Answers</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about government schemes, bill splitting, and our calculator tools.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-medium rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <div className={`ml-4 transform transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium mb-4">
                <Users className="w-4 h-4 mr-2" />
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real People, Real Results
                <span className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">See How We've Helped</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how people like you are saving time and money with our smart financial tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "College Student",
                  story: "Split bills with roommates easily. No more arguments about who paid what!",
                  savings: "₹2,400/month",
                  avatar: "👩‍🎓"
                },
                {
                  name: "Raj Patel",
                  role: "Trip Organizer",
                  story: "Organized a 10-person trip and calculated expenses in minutes instead of hours.",
                  savings: "8 hours saved",
                  avatar: "🧑‍💼"
                },
                {
                  name: "Anita Desai",
                  role: "Family Manager",
                  story: "Manage household expenses with my husband. Perfect transparency!",
                  savings: "₹1,800/month",
                  avatar: "👩‍🦰"
                },
                {
                  name: "Mike Chen",
                  role: "Restaurant Owner",
                  story: "Split group checks automatically. Customers love the convenience!",
                  savings: "50% faster checkout",
                  avatar: "👨‍🍳"
                },
                {
                  name: "Sarah Johnson",
                  role: "Event Planner",
                  story: "Budget tracking for events made simple. Clients appreciate detailed breakdowns.",
                  savings: "20% better budgeting",
                  avatar: "👩‍💼"
                },
                {
                  name: "David Kim",
                  role: "Startup Founder",
                  story: "Team lunch expenses sorted instantly. Team happiness increased!",
                  savings: "Zero conflicts",
                  avatar: "🧑‍💻"
                }
              ].map((story, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{story.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{story.name}</h4>
                      <p className="text-sm text-gray-600">{story.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{story.savings}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
