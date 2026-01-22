'use client';

import React, { useEffect, useState } from 'react';
import { Search, Calendar, User, ArrowRight, TrendingUp, Heart, Users, Star } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import api from '@/api'
import { useRouter } from 'next/navigation';





export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
   const [mockBlogPosts,setmockBlogPosts]=useState([])

  const router = useRouter();


 
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
             <button
  onClick={() => router.push(`/blog/${post._id}`)}
  className="text-[#bf5281] font-semibold flex items-center gap-1 cursor-pointer"
>
  Read More <ArrowRight className="h-4 w-4" />
</button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

           

            {/* Quick Stats */}
            <div className="border rounded-lg p-6 shadow space-y-4">
              <h3 className="font-bold text-lg mb-2">Quick Stats</h3>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">10K+</div>
                  <div className="text-sm text-gray-500">Monthly readers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-semibold">90K+</div>
                  <div className="text-sm text-gray-500">Successful matches</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-semibold">3K+</div>
                  <div className="text-sm text-gray-500">Active bureaus</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
  
      <Footer/>
    </div>
  );
}
