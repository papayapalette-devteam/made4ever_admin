import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function HomePage() {
  const features = [
    {
      icon: "👤",
      title: "Profile Management",
      description:
        "Easily manage unlimited profiles with advanced search and filtering capabilities.",
    },
    {
      icon: "💞",
      title: "Smart Matching",
      description:
        "AI-powered matching algorithm that finds compatible matches based on preferences.",
    },
    {
      icon: "✅",
      title: "Verified Profiles",
      description:
        "All profiles are verified to ensure authenticity and build trust.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description:
        "Track your bureau performance with detailed analytics and insights.",
    },
  ];

  const stats = [
    { label: "Years Experience", value: "23+" },
    { label: "Connected Bureaus", value: "15,000+" },
    { label: "States Covered", value: "10" },
    { label: "Active Members", value: "2,600+" },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      bureau: "Perfect Match Bureau, Delhi",
      content:
        "Made4Ever's 23+ years of experience shows. We've increased our matches by 300% since joining.",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
    {
      name: "Priya Patel",
      bureau: "Golden Hearts Matrimony, Ahmedabad",
      content:
        "Being part of Made4Ever's 15,000+ bureau network has opened new opportunities for our business.",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
    },
    {
      name: "Suresh Kumar",
      bureau: "Divine Matches, Bangalore",
      content:
        "Made4Ever's commitment to empowering women entrepreneurs aligns perfectly with our values.",
      avatar:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Tips for a Successful Marriage Bureau",
      author: "Riya Sharma",
      date: "15 Sep 2024",
      excerpt:
        "Discover the most effective strategies to grow your marriage bureau, attract genuine clients, and build long-term success.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Matchmaking in 2024",
      author: "Amit Verma",
      date: "02 Oct 2024",
      excerpt:
        "Artificial Intelligence is transforming how matchmaking platforms find perfect matches and improve compatibility.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "The Importance of Trust in Modern Relationships",
      author: "Priya Mehta",
      date: "01 Nov 2024",
      excerpt:
        "Trust is the foundation of any strong relationship. Learn how to build and maintain it in modern times.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Grow Your Marriage Bureau with{" "}
            <span className="text-[#bf5281]">Made4Ever</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Join India&apos;s largest matrimonial network with{" "}
            <strong>23+ years of experience</strong> and{" "}
            <strong>15,000+ marriage bureaus</strong> across 10 states.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <button className="bg-[#bf5281] text-white px-8 py-3 rounded-lg hover:bg-[#c93877]">
                Start Free Trial →
              </button>
            </Link>
            <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-100">
              ▶ Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Powerful Tools for Marriage Bureaus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Choose Your Perfect Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "₹500",
                features: [
                  "10 Profile Matches",
                  "Basic Support",
                  "Mobile App",
                  "Profile Verification",
                ],
              },
              {
                name: "Premium",
                price: "₹2000",
                features: [
                  "50 Profile Matches",
                  "Priority Support",
                  "Analytics Dashboard",
                  "Advanced Filters",
                ],
              },
              {
                name: "Enterprise",
                price: "₹3000",
                features: [
                  "100 Profile Matches",
                  "Custom Branding",
                  "24/7 Support",
                  "Multi-user Access",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-[#bf5281] mb-4">
                  {plan.price}
                </p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j}>✔ {f}</li>
                  ))}
                </ul>
                <button className="w-full bg-[#bf5281] text-white py-3 rounded-lg hover:bg-[#c93877]">
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Trusted by 15,000+ Marriage Bureaus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-lg transition"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
                <p className="italic text-gray-700 mb-4">{t.content}</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.bureau}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            From Our Blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {post.author} • {post.date}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <button className="text-[#c93877] font-semibold hover:underline">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#c93877] text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Join Our Mission to Empower Women Entrepreneurs
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-red-100">
          Be part of Made4Ever&apos;s initiative to empower 33,000 women
          entrepreneurs across India.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <button className="bg-white text-[#c93877] px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Join Now →
            </button>
          </Link>
          <button className="bg-transparent border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-600 font-semibold">
            Learn More
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
