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
    title: "How to Split Bills Fairly: A Complete Guide",
    excerpt: "Learn the best practices for splitting bills in groups, from simple dinners to complex trips. Discover fair methods that keep everyone happy.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Guide",
    image: "https://picsum.photos/seed/bill-splitting-guide/400/250",
    slug: "how-to-split-bills-fairly"
  },
  {
    id: 2,
    title: "5 Common Bill Splitting Mistakes to Avoid",
    excerpt: "Don't let money ruin your friendships. Learn about the most common mistakes people make when splitting bills and how to avoid them.",
    author: "Mike Chen",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Tips",
    image: "https://picsum.photos/seed/bill-mistakes/400/250",
    slug: "common-bill-splitting-mistakes"
  },
  {
    id: 3,
    title: "The Mathematics Behind Fair Bill Splitting",
    excerpt: "Ever wondered how our calculator determines who owes whom? Dive into the math behind optimal debt settlement algorithms.",
    author: "Dr. Emily Brown",
    date: "March 5, 2024",
    readTime: "8 min read",
    category: "Technical",
    image: "https://picsum.photos/seed/math-bill-splitting/400/250",
    slug: "mathematics-behind-bill-splitting"
  },
  {
    id: 4,
    title: "Group Travel Budget: How to Plan and Split Expenses",
    excerpt: "Planning a group trip? Learn how to budget effectively and split expenses fairly among travelers for a stress-free vacation.",
    author: "Alex Rivera",
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "Travel",
    image: "https://picsum.photos/seed/travel-budget/400/250",
    slug: "group-travel-budget"
  },
  {
    id: 5,
    title: "Roommate Expenses: The Ultimate Guide to Fair Splitting",
    excerpt: "Living with roommates? Master the art of splitting household bills, groceries, and shared expenses without conflicts.",
    author: "Jordan Taylor",
    date: "February 20, 2024",
    readTime: "7 min read",
    category: "Living",
    image: "https://picsum.photos/seed/roommate-expenses/400/250",
    slug: "roommate-expenses-guide"
  },
  {
    id: 6,
    title: "Digital Tools vs Traditional Methods for Bill Splitting",
    excerpt: "Compare digital bill splitting tools with traditional methods like spreadsheets and manual calculations. Find the best approach for your group.",
    author: "Sam Wilson",
    date: "February 15, 2024",
    readTime: "5 min read",
    category: "Comparison",
    image: "https://picsum.photos/seed/digital-traditional-splitting/400/250",
    slug: "digital-vs-traditional-bill-splitting"
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
            Blog & Resources
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Tips & Guides for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}Bill Splitting
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn the best practices, avoid common mistakes, and master the art of fair bill splitting in any situation.
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
                    How to Split Bills Fairly: A Complete Guide
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Learn the best practices for splitting bills in groups, from simple dinners to complex trips. Discover fair methods that keep everyone happy and avoid awkward money conversations.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">March 15, 2024</p>
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
                Get the latest tips, guides, and updates about bill splitting delivered to your inbox.
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
