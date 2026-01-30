'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import api from '@/api';

export default function BlogDetailsPage() {
  const { id } = useParams(); // get _id from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogDetails = async () => {
    try {
      const resp = await api.get(`api/blog/blog-by-id/${id}`);
      setBlog(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getBlogDetails();
  }, [id]);


  

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12 mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <Calendar className="h-4 w-4" />
          {new Date(blog.createdAt).toDateString()}
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

<div
  className="prose max-w-none"
  dangerouslySetInnerHTML={{
    __html: (blog.content || blog.description)
      ?.replace(/<span[^>]*class="[^"]*visually-hidden[^"]*"[^>]*>.*?<\/span>/gi, ""),
  }}
/>


      </div>

      <Footer />
    </div>
  );
}
