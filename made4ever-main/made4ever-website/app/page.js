import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AiChat } from '@/components/ui/ai-chat';
import {
  Users,
  Heart,
  Shield,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Globe,
  Target,
  BookOpen,
  Calendar,
  User
} from 'lucide-react';

const features = [
  {
    icon: <Users className="h-8 w-8 text-red-500" />,
    title: 'Profile Management',
    description: 'Easily manage unlimited profiles with advanced search and filtering capabilities.'
  },
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: 'Smart Matching',
    description: 'AI-powered matching algorithm that finds compatible matches based on preferences.'
  },
  {
    icon: <Shield className="h-8 w-8 text-red-500" />,
    title: 'Verified Profiles',
    description: 'All profiles are verified to ensure authenticity and build trust.'
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-red-500" />,
    title: 'Analytics Dashboard',
    description: 'Track your bureau performance with detailed analytics and insights.'
  }
];

const mockBlogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for a Successful Marriage Bureau",
    author: "Riya Sharma",
    publishedAt: "2024-09-15T10:00:00Z",
    excerpt:
      "Discover the most effective strategies to grow your marriage bureau, attract genuine clients, and build long-term success with these 10 expert tips.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    category: "Business Growth",
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Matchmaking in 2024",
    author: "Amit Verma",
    publishedAt: "2024-10-02T08:30:00Z",
    excerpt:
      "Artificial Intelligence is transforming how matchmaking platforms find perfect matches. Learn how modern AI tools improve accuracy and compatibility.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    category: "Technology",
  },
  {
    id: 3,
    title: "The Importance of Trust in Modern Relationships",
    author: "Priya Mehta",
    publishedAt: "2024-11-01T14:15:00Z",
    excerpt:
      "Trust is the foundation of any strong relationship. Here’s how couples can build trust and maintain healthy connections in today’s fast-paced world.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    category: "Relationships",
  },
  {
    id: 4,
    title: "How to Grow Your Marriage Bureau with Social Media",
    author: "Rahul Singh",
    publishedAt: "2024-08-25T09:45:00Z",
    excerpt:
      "Learn how to leverage Instagram, Facebook, and LinkedIn to promote your marriage bureau, attract clients, and showcase success stories effectively.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
  },
  {
    id: 5,
    title: "Why Made4Ever is India’s Most Trusted Marriage Bureau Network",
    author: "Team Made4Ever",
    publishedAt: "2024-10-20T16:00:00Z",
    excerpt:
      "With over 22 years of experience and 15,000+ bureaus connected, Made4Ever has become India’s leading platform for marriage professionals.",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    category: "Made4Ever News",
  },
];


const stats = [
  { label: 'Years Experience', value: '22+', icon: <Award className="h-5 w-5 text-red-500" /> },
  { label: 'Connected Bureaus', value: '15,000+', icon: <Globe className="h-5 w-5 text-blue-500" /> },
  { label: 'States Covered', value: '10', icon: <Target className="h-5 w-5 text-green-500" /> },
  { label: 'Active Members', value: '2,600+', icon: <Users className="h-5 w-5 text-purple-500" /> }
];

const testimonials = [
  {
    name: 'Rajesh Sharma',
    bureau: 'Perfect Match Bureau, Delhi',
    content: 'Made4Ever\'s 22+ years of experience shows. We\'ve increased our matches by 300% since joining their network.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
  },
  {
    name: 'Priya Patel',
    bureau: 'Golden Hearts Matrimony, Ahmedabad',
    content: 'Being part of Made4Ever\'s 15,000+ bureau network has opened new opportunities for our business.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'
  },
  {
    name: 'Suresh Kumar',
    bureau: 'Divine Matches, Bangalore',
    content: 'Made4Ever\'s commitment to empowering women entrepreneurs aligns perfectly with our values. Highly recommended!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div 
            className="absolute inset-0 opacity-40" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f87171' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge className="bg-red-100 text-red-700 px-4 py-2 text-sm font-semibold">
                  #1 Marriage Bureau Platform in India
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Grow Your Marriage Bureau with{' '}
                  <span className="text-red-600 relative">
                    Made4Ever
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-200 rounded-full"></div>
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Join India&apos;s largest matrimonial network with <strong>22+ years of experience</strong> and 
                  <strong> 15,000+ marriage bureaus</strong> across 10 states.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center">{stat.icon}</div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg"
                  alt="Indian Wedding Ceremony"
                  className="rounded-2xl shadow-2xl w-full"
                />

                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-3 border-white" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg" alt="" />
                      <img className="w-10 h-10 rounded-full border-3 border-white" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="" />
                      <img className="w-10 h-10 rounded-full border-3 border-white" src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg" alt="" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">50,000+</div>
                      <div className="text-sm text-gray-600">Successful Matches</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-red-100 rounded-full opacity-20"></div>
              <div className="absolute bottom-16 right-16 w-20 h-20 bg-orange-100 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
              22+ Years of Innovation
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Powerful Tools for Marriage Bureaus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With over two decades of experience, we&apos;ve developed cutting-edge features 
              designed specifically for marriage bureaus to streamline operations and increase success rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="mb-4 p-3 bg-red-50 rounded-xl w-fit group-hover:bg-red-100 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-green-100 text-green-700 px-4 py-2">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing designed for bureaus of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: '₹2,999',
                period: '/month',
                features: ['50 Profile Matches', 'Basic Support', 'Mobile App', 'Profile Verification'],
                popular: false,
                color: 'border-gray-200'
              },
              {
                name: 'Premium',
                price: '₹7,999',
                period: '/3 months',
                features: ['150 Profile Matches', 'Priority Support', 'Advanced Filters', 'Analytics Dashboard', 'API Access'],
                popular: true,
                color: 'border-red-500 ring-4 ring-red-100'
              },
              {
                name: 'Enterprise',
                price: '₹19,999',
                period: '/year',
                features: ['500 Profile Matches', '24/7 Support', 'Custom Branding', 'Advanced Analytics', 'Multi-user Access'],
                popular: false,
                color: 'border-gray-200'
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} hover:shadow-2xl transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <span className="text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-3 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}>
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
              Success Stories
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Trusted by 15,000+ Marriage Bureaus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what bureau owners from our pan-India network are saying about Made4Ever
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.bureau}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-orange-100 text-orange-700 px-4 py-2">
              Latest Insights
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              From Our Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice, industry insights, and success stories from the matrimonial world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white">{post.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="px-8 py-4">
                <BookOpen className="mr-2 h-5 w-5" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
              Women Empowerment Initiative
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Join Our Mission to Empower<br />
              <span className="text-red-200">33,000 Women Entrepreneurs</span>
            </h2>
            <p className="text-xl text-red-100 max-w-4xl mx-auto leading-relaxed">
              Be part of Made4Ever&apos;s women empowerment initiative. Join our network of 15,000+
              marriage bureaus and help us create opportunities for women entrepreneurs across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                  JOIN NOW - Empower Women
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                Learn About Our Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AiChat />
    </div>
  );
}