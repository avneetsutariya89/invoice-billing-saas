"use client";

import { useState } from "react";
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
  Heart,
  Star,
  Zap,
  Sparkles,
  Coffee,
  HelpCircle,
  CheckCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const style = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  
  .animation-delay-600 {
    animation-delay: 0.6s;
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target as HTMLInputElement;
    const checked = (target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xl font-bold">NexyBill</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xl font-bold text-blue-500">
                NexyBill
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up">
            <HelpCircle className="w-4 h-4 mr-2" />
            We're here to help!
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Get in
            <span className="block text-blue-500 mt-2 animate-fade-in-up animation-delay-200">
              Touch With Us
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
            Have questions about bill splitting? Need help with our calculator? 
            We're just a message away and excited to hear from you! 💕
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16 animate-fade-in-up animation-delay-600">
            <div className="bg-white border border-blue-100 rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">Quick Reply</div>
              <div className="text-gray-600 text-sm">Fast responses</div>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">Friendly Help</div>
              <div className="text-gray-600 text-sm">We care about you</div>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">Smart Solutions</div>
              <div className="text-gray-600 text-sm">Easy bill splitting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-blue-100 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600">We'd love to hear from you!</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="bg-white border border-blue-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Quick Contact
                    </h3>
                    <p className="text-gray-600">Reach out anytime!</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-700">
                          hello@nexybill.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Response Time</p>
                        <p className="font-medium text-gray-700">
                          Within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white border border-blue-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Follow Us
                    </h3>
                    <p className="text-gray-600">Stay connected!</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Twitter className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Twitter</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Facebook</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Instagram className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Instagram</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our friendly support team is always here to help you split bills happily and stress-free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                <Calculator className="mr-2 h-5 w-5" />
                Try Calculator Now
              </Button>
            </Link>
            <Link href="mailto:hello@nexybill.com">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
                <Mail className="mr-2 h-5 w-5" />
                Email Us Directly
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
