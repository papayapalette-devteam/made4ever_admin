'use client';

import React, { useEffect, useState } from 'react';
import { Search, Calendar, User, ArrowRight, TrendingUp, Heart, Users, Star } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import api from '@/api'

// Mock data for blog posts
// const mockBlogPosts = [
//   {
//     id: 1,
//     title: 'How Technology is Changing Matchmaking',
//     excerpt: 'Discover how AI and digital tools are transforming traditional marriage bureaus.',
//     image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=format&fit=crop&w=800&q=80',
//     author: 'Riya Sharma',
//     publishedAt: '2025-01-01',
//     category: 'Technology',
//     tags: ['matchmaking', 'technology']
//   },
//   {
//     id: 2,
//     title: 'Top 5 Tips for Successful Matches',
//     excerpt: 'Learn the key strategies to create more meaningful connections for your clients.',
//     image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=format&fit=crop&w=800&q=80',
//     author: 'Amit Verma',
//     publishedAt: '2025-02-10',
//     category: 'Tips & Advice',
//     tags: ['tips', 'profiles']
//   },
//   // Add more posts as needed
// ];

// const categories = [
//   { name: 'Tips & Advice', count: 15 },
//   { name: 'Industry Insights', count: 8 },
//   { name: 'Success Stories', count: 12 },
//   { name: 'Technology', count: 6 },
//   { name: 'Business Growth', count: 9 }
// ];

// const popularTags = [
//   'matchmaking', 'profiles', 'tips', 'technology', 'business',
//   'success', 'growth', 'digital', 'matrimony', 'bureaus'
// ];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
   const [mockBlogPosts,setmockBlogPosts]=useState([])

  // const filteredPosts = mockBlogPosts.filter(post =>
  //   post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

 
  const get_all_blogs=async()=>
  {
    try {
      const resp=await api.get('api/blog/all-blogs')
      console.log(resp);
      setmockBlogPosts(resp.data.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    get_all_blogs()

  },[])

  return (
    <div className="min-h-screen bg-white">
        <Header/>
      {/* Header */}
      {/* <div className="bg-red-600 text-white py-6 text-center font-bold text-2xl mt-10">
        Made4Ever Blog
      </div> */}
            <section className="py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            <span className="text-[#bf5281]">Made4Ever Blog</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-10 py-3 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {mockBlogPosts.map(post => (
              <div key={post.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
             
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {new Date(post.createdAt).toDateString()}
                    </div>
                    <Link
                      href="#"
                      className="text-[#bf5281] font-semibold flex items-center gap-1"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Categories */}
            {/* <div className="border rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.name} className="flex justify-between items-center">
                    <span>{cat.name}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Popular Tags */}
            {/* <div className="border rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <span
                    key={tag}
                    className="border rounded px-2 py-1 text-sm cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div> */}

            {/* Quick Stats */}
            <div className="border rounded-lg p-6 shadow space-y-4">
              <h3 className="font-bold text-lg mb-2">Quick Stats</h3>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">500K+</div>
                  <div className="text-sm text-gray-500">Monthly readers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-semibold">50K+</div>
                  <div className="text-sm text-gray-500">Successful matches</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-semibold">10K+</div>
                  <div className="text-sm text-gray-500">Active bureaus</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-100 py-6 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Made4Ever. All rights reserved.
      </footer> */}
      <Footer/>
    </div>
  );
}
