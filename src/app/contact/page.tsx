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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-150 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/60 backdrop-blur-lg border-b border-blue-100 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group">
              <div className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">
                BillSplit Pro
              </span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-blue-600 text-sm font-semibold shadow-2xl animate-bounce mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
            We're here to help you split bills happily!
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Get in
            <span className="block text-blue-600 mt-2">
              Touch With Us
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            Have questions about bill splitting? Need help with our calculator? 
            We're just a message away and excited to hear from you! 💕
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Support Available</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt;1hr</div>
              <div className="text-gray-700">Response Time</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-700">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Send us a Message
                      </h2>
                      <p className="text-gray-600">We'd love to hear from you!</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-800 font-medium flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-blue-500" />
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your lovely name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-gray-800 font-medium flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-gray-800 font-medium flex items-center">
                        <Star className="w-4 h-4 mr-2 text-blue-500" />
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's on your mind?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-gray-800 font-medium flex items-center">
                        <Coffee className="w-4 h-4 mr-2 text-blue-500" />
                        Message *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us everything... we're listening! ☕"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 w-full px-4 py-3 border border-blue-200 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                      />
                      <Label htmlFor="newsletter" className="text-gray-700 text-sm flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-blue-500" />
                        Send me happy bill splitting tips and updates! 🎉
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      <Send className="mr-2 w-5 h-5" />
                      Send Happy Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Quick Contact
                      </h3>
                      <p className="text-gray-600">Reach out anytime!</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">
                          hello@billsplit.pro
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Response Time</p>
                        <p className="font-medium text-gray-800">
                          Super fast! ⚡
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Follow Us
                      </h3>
                      <p className="text-gray-600">Stay connected!</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Twitter className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Twitter</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Facebook</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Instagram className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Instagram</span>
                    </a>
                    <a href="#" className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-blue-600 text-sm font-semibold shadow-2xl mb-6">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
            We're committed to helping you!
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Our friendly support team is always here to help you split bills happily and stress-free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300">
                <Calculator className="mr-3 h-5 w-5" />
                Try Calculator Now
              </Button>
            </Link>
            <Link href="mailto:hello@billsplit.pro">
              <Button variant="outline" className="bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 px-8 py-4 rounded-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
                <Mail className="mr-3 h-5 w-5" />
                Email Us Directly
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
