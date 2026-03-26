import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
  Calculator,
  Users,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? We're here to help make bill splitting easier for you.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 dark:text-white font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="mt-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-900 dark:text-white font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-900 dark:text-white font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help you?"
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-900 dark:text-white font-medium">
                      Message *
                    </Label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us more about your question or feedback..."
                      className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="newsletter" className="text-gray-600 dark:text-gray-300 text-sm">
                      Send me updates about bill splitting tips and new features
                    </Label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        support@billsplit.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Response Time</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h3>
                
                <div className="space-y-3">
                  <Link href="/calculator" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Calculator className="w-5 h-5" />
                    <span>Try Calculator</span>
                  </Link>
                  
                  <Link href="/example" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Users className="w-5 h-5" />
                    <span>View Example</span>
                  </Link>
                  
                  <Link href="/blog" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>Blog & Tips</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Common Questions
                </h3>
                
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      How does the calculator work?
                    </summary>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 p-2">
                      Enter each person's name and amount spent, then click calculate. Our algorithm determines who owes whom to settle debts fairly.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      Is it free to use?
                    </summary>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 p-2">
                      Yes! Our bill split calculator is completely free to use. No signup required.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      Can I use it for any currency?
                    </summary>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 p-2">
                      Yes! The calculator works with any currency - just enter the numbers without currency symbols.
                    </p>
                  </details>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
