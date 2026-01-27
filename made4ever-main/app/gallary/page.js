'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import api from '@/api';

export default function Gallary() {
  // ================= STATES =================
  const [imageItems, setImageItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);

  const [imagePage, setImagePage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const [imageTotalPages, setImageTotalPages] = useState(1);
  const [videoTotalPages, setVideoTotalPages] = useState(1);

  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const LIMIT = 6;

  // ================= API CALLS =================
  const fetchImages = async (pageNo) => {
    try {
      setLoadingImages(true);
      const res = await api.get(
        `api/msp/Getmsp-gallary?page=${pageNo}&limit=${LIMIT}`
      );

      setImageItems(res.data.mspGallary || []);
      setImageTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Image fetch error:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const fetchVideos = async (pageNo) => {
    try {
      setLoadingVideos(true);
      const res = await api.get(
        `api/msp/Getmsp-video?page=${pageNo}&limit=${LIMIT}`
      );

      setVideoItems(res.data.mspVideo || []);
      setVideoTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Video fetch error:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  // ================= EFFECTS =================
  useEffect(() => {
    fetchImages(imagePage);
  }, [imagePage]);

  useEffect(() => {
    fetchVideos(videoPage);
  }, [videoPage]);

  // ================= JSX =================

    const [previewImg, setPreviewImg] = useState(null);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* ================= PAGE HEADER ================= */}
      <section className="py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            <span className="text-[#bf5281]">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Explore our photos and videos from Made4ever events & initiatives
          </p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* ================= PHOTO GALLERY ================= */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6">Photo Gallery</h2>

            {loadingImages ? (
              <p className="text-center py-10">Loading images...</p>
            ) : imageItems.length === 0 ? (
              <p className="text-center py-10">No images found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {imageItems.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg overflow-hidden shadow bg-white cursor-pointer"
                    onClick={() => setPreviewImg(item.msp_gallary)}
                  >
                    <img
                      src={item.msp_gallary}
                      alt="Gallery"
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Photo Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={imagePage === 1}
                onClick={() => setImagePage((p) => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(imageTotalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImagePage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    imagePage === i + 1
                      ? 'bg-[#bf5281] text-white'
                      : 'border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={imagePage === imageTotalPages}
                onClick={() => setImagePage((p) => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* ================= VIDEO GALLERY ================= */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Video Gallery</h2>

            {loadingVideos ? (
              <p className="text-center py-10">Loading videos...</p>
            ) : videoItems.length === 0 ? (
              <p className="text-center py-10">No videos found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videoItems.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg overflow-hidden shadow bg-white"
                  >
                    <video
                      src={item.msp_video}
                      controls
                      className="w-full h-56 object-contain bg-black"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Video Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={videoPage === 1}
                onClick={() => setVideoPage((p) => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(videoTotalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVideoPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    videoPage === i + 1
                      ? 'bg-[#bf5281] text-white'
                      : 'border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={videoPage === videoTotalPages}
                onClick={() => setVideoPage((p) => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
{previewImg && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setPreviewImg(null)}
  >
    {/* Close Button */}
    <button
      onClick={() => setPreviewImg(null)}
      className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-60 cursor-pointer"
    >
      &times;
    </button>

    {/* Image */}
    <img
      src={previewImg}
      alt="Preview"
      className="max-h-[90vh] max-w-[90vw] rounded"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
    />
  </div>
)}

        </div>
      </section>

      <Footer />
    </div>
  );
}
