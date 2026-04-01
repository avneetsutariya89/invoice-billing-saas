import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  Calendar,
  User,
  ArrowRight,
  Calculator,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
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
    likes: 42
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
  },
  {
    id: 10,
    title: "Digital vs Traditional: Modern Bill Splitting Methods",
    excerpt: "Compare apps, spreadsheets, and manual methods for splitting bills. Find the best approach for your group's needs and preferences.",
    author: "Lisa Thompson",
    date: "March 20, 2024",
    readTime: "6 min read",
    category: "Comparison",
    image: "https://picsum.photos/seed/digital-bill-splitting/400/250",
    slug: "digital-traditional-bill-splitting",
    likes: 36
  },
  {
    id: 11,
    title: "Restaurant Bill Splitting: Etiquette and Best Practices",
    excerpt: "Dining out with groups? Master the etiquette of splitting restaurant bills fairly. From separate checks to shared appetizers, handle it like a pro.",
    author: "James Wilson",
    date: "March 18, 2024",
    readTime: "4 min read",
    category: "Dining Out",
    image: "https://picsum.photos/seed/restaurant-bills/400/250",
    slug: "restaurant-bill-splitting-etiquette",
    likes: 29
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Blog & Government Schemes
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Government Schemes
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}Complete Information
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete information about government schemes, bill splitting guides, and smart expense management tools for modern life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105">
                Try Calculator Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2 border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                      Featured
                    </span>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      5 min read
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    PM Awas Yojana 2024: Government Housing Assistance
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    PM Awas Yojana now provides financial assistance up to ₹2.67 lakh for beneficiaries in Gujarat to build their dream homes. Learn how to apply and required documents.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Rajendra Patel</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">March 25, 2024</p>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      <Link href={`/blog/${blogPosts[0].slug}`} className="flex items-center">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden relative">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden relative mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{post.date}</p>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      Read
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get latest updates, guides and benefits of government schemes directly in your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
