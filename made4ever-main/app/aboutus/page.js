import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "23+" },
    { label: "States Covered", value: "10" },
    { label: "Active Members", value: "2,700+" },
    { label: "Connected Bureaus", value: "15,000+" },
  ];

  const missions = [
    {
      icon: "💼",
      title: "Empowering Women",
      description:
        "We enable women to pursue self-employment and financial independence through the marriage bureau business model.",
    },
    {
      icon: "🌍",
      title: "Nationwide Growth",
      description:
        "With a growing network across 10 states, Made4Ever is connecting communities and families nationwide.",
    },
    {
      icon: "❤️",
      title: "Building Relationships",
      description:
        "We help families find the right matches, creating long-lasting relationships and social harmony.",
    },
    {
      icon: "📈",
      title: "Social Impact",
      description:
        "Every marriage bureau connected with us contributes to women empowerment and national development.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            About <span className="text-red-600">Made4Ever</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            For over <strong>23 years</strong>, Made4Ever has been a trusted
            name in the matrimonial industry — uniting families, empowering
            women, and strengthening communities across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-4 border rounded-xl hover:shadow-md transition">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {s.value}
              </div>
              <div className="text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Made4Ever started its journey in the early 2000s with a mission to
              connect people through trusted matrimonial networks. Over the
              years, we observed the challenges faced by local bureaus in
              building reliable connections.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In 2016, we launched our digital platform to connect thousands of
              marriage bureaus across India. Today, our network spans{" "}
              <strong>10 states</strong> and supports{" "}
              <strong>2,700+ members</strong>, transforming how people find
              their life partners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We continue to empower bureau owners — especially women — to
              achieve growth, recognition, and self-reliance.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg"
              alt="Our Journey"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-900">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missions.map((m, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
                <p className="text-gray-600">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Founder
          </h2>
          <div className="p-8 border rounded-2xl bg-white shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="w-44 h-44  from-red-600 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                <img src="WhatsApp Image 2025-12-11 at 15.23.47.jpeg" alt=""></img>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Ashish Narang
              </h3>
              <p className="text-red-600 font-semibold mb-2">
                Founder & Visionary
              </p>
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                Ashish Narang, the visionary founder of Made4Ever, believes that
                social change begins when individuals with a clear mission unite
                for a greater purpose. His dedication to empowering women and
                strengthening family values has been the driving force behind
                Made4Ever&apos;s success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Join Our Mission to Empower 33,000 Women
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-red-100">
          Be part of a movement that transforms lives through entrepreneurship
          and community building.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
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
