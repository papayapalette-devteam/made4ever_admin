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
  const [mockBlogPosts, setmockBlogPosts] = useState([])

  const router = useRouter();


  const [page, setPage] = useState(1);
  const [limit] = useState(10); // fixed or changeable
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setloading] = useState(false);
  const get_all_blogs = async () => {
    try {
      setloading(true)
      const resp = await api.get('api/blog/all-blogs', {
        params: {
          page: page,
          limit: limit,
        },
      })
      console.log(resp);
      setmockBlogPosts(resp.data.data)
      setTotalPages(resp.data.totalPages)

    } catch (error) {
      console.log(error);

    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    get_all_blogs()

  }, [page])

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
  {loading ? (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bf5281]"></div>
    </div>
  ) : mockBlogPosts.length === 0 ? (
    <p className="text-center text-gray-500">No blogs found.</p>
  ) : (
    mockBlogPosts.map(post => (
      <div key={post.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toDateString()}
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
    ))
  )}
</div>




          {/* Sidebar */}
          <div className="space-y-6">



            {/* Quick Stats */}
            <div className="border rounded-lg p-6 shadow space-y-4">
              <h3 className="font-bold text-lg mb-2">Quick Stats</h3>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">5K+</div>
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 border-t pt-3">
            <button className='cursor-pointer'
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
              className='cursor-pointer'
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
}
