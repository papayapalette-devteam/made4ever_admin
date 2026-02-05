"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Swal from "sweetalert2";
import api from "@/api"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (captchaInput !== captcha) {
      setCaptchaError("Incorrect CAPTCHA");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");

      Swal.fire({
        icon: "error",
        title: "Invalid CAPTCHA",
        text: "Please enter the correct CAPTCHA",
      });
      return;
    }

    // 🔄 Show loader
    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      // Simulate API call
      await api.post("api/contact-us/save-contact-us", formData);
      // ✅ Success
      Swal.fire({
        icon: "success",
        title: "Submitted Successfully!",
        text: "We will contact you shortly.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.response?.data?.message || "Something went wrong",
        timer: 2000,
      });
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team. We&apos;re here to help you grow your marriage bureau business.
          </p>
        </div> */}
        <section className="py-20 text-center">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              <span className="text-[#bf5281]">Contact Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our team. We&apos;re here to help you grow your
              marriage bureau business.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-lg border bg-white shadow p-6 space-y-6">
              <h2 className="text-2xl font-semibold">Get in Touch</h2>
              <p className="text-gray-600">
                Reach out to us through any of these channels
              </p>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-[#bf5281] mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    Pragati Tower, Rajendra Place
                    <br />
                    Delhi 110008, IN
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-[#bf5281] mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 9911126001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-[#bf5281] mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">connect@made4ever.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-[#bf5281] mt-1" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 10 AM - 6 PM
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we&apos;ll get back to you within 24
                hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-medium">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-medium">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-medium">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-medium">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  ></textarea>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Enter the text shown *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-32 bg-gray-200 flex items-center justify-center rounded font-bold tracking-widest">
                      {captcha}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCaptcha(generateCaptcha())}
                      className="text-sm text-[#bf5281]"
                    >
                      Refresh
                    </button>
                  </div>
                  <input
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter CAPTCHA"
                  />
                  {captchaError && (
                    <p className="text-red-500 text-sm">{captchaError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#bf5281] hover:bg-[#c93877] text-white font-semibold py-3 rounded"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <Send className="inline-block mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
