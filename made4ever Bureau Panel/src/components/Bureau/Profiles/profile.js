import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Blocks,
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

// Mock data (replace with your API data)
const mockProfiles = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 28,
    gender: "male",
    occupation: "Software Engineer",
    education: "B.Tech",
    city: "Delhi",
    state: "Delhi",
    income: "₹10 LPA",
    height: "5'9\"",
    isActive: true,
    photos: ["https://randomuser.me/api/portraits/men/1.jpg"],
  },
  {
    id: 2,
    name: "Priya Mehta",
    age: 25,
    gender: "female",
    occupation: "Doctor",
    education: "MBBS",
    city: "Mumbai",
    state: "Maharashtra",
    income: "₹12 LPA",
    height: "5'5\"",
    isActive: false,
    photos: ["https://randomuser.me/api/portraits/women/2.jpg"],
  },
];

export default function ProfilesPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(6); // items per page
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [all_profile, setall_profile] = useState([]);

  const get_all_profile = async () => {
    try {
      setLoading(true);
      const resp = await api.get(
        `api/user/get-all-profile?bureau=${user.id}&page=${page}&limit=${limit}`
      );
      setall_profile(resp.data.data);
      setTotal(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_all_profile();
  }, [page, limit]);

  // pagination

  // calculate total pages
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleLimitChange = (e) => {
    setlimit(Number(e.target.value));
    setPage(1); // reset to first page when limit changes
  };

  // delete user

  const delete_user_profile = async (_id) => {
  try {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-confirm-btn",
      },
    });

    // If user cancels, stop here
    if (!confirmDelete.isConfirmed) return;

    setLoading(true);
    const resp = await api.delete(`api/user/delete-user/${_id}`);

    if (resp.status === 200) {
      await Swal.fire({
        icon: "success",
        title: "Profile Deleted!",
        text: resp.data.message || "User profile deleted successfully.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-confirm-btn",
        },
      });

      // Refresh after confirmation closes
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error.response?.data?.error ||
        "Something went wrong! Please try again.",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "swal-confirm-btn",
      },
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profiles</h1>
            <p className="text-gray-600">
              Manage your bureau's member profiles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end items-center w-full mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/add-new-profile")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Profile
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search profiles by name or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-100">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">
              {all_profile.length}
            </div>
            <p className="text-sm text-gray-600">Total Profiles</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockProfiles.filter((p) => p.isActive).length}
            </div>
            <p className="text-sm text-gray-600">Active Profiles</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">
              {Array.isArray(all_profile)
                ? all_profile.filter(
                    (p) => p?.PersonalDetails?.Gender === "Male"
                  ).length
                : 0}
            </div>
            <p className="text-sm text-gray-600">Male Profiles</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">
              {Array.isArray(all_profile)
                ? all_profile.filter(
                    (p) => p?.PersonalDetails?.Gender === "Female"
                  ).length
                : 0}
            </div>
            <p className="text-sm text-gray-600">Female Profiles</p>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="w-full">
          {/* Loading Spinner */}
          {loading ? (
            <div className="w-full flex flex-wrap justify-center gap-6">
              {[...Array(limit)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-lg shadow p-4 w-80 h-64"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-300 mr-3" />
                    <div className="flex flex-col space-y-2 w-2/3">
                      <div className="h-3 bg-gray-300 rounded w-3/4" />
                      <div className="h-3 bg-gray-300 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full" />
                    <div className="h-3 bg-gray-300 rounded w-5/6" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {all_profile?.map((profile) => (
                <div
                  key={profile._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profile?.Upload?.ProfilePhoto?.[0]}
                        alt={profile?.PersonalDetails?.Name || ""}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {profile?.PersonalDetails?.Name || ""}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {profile?.PersonalDetails?.Age || 0} years •{" "}
                          {profile.gender}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        profile.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {profile.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      {profile?.EducationDetails?.HighestEducation || ""}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {profile?.EducationDetails?.Occupation || ""}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {profile?.ContactDetails?.City || ""},{" "}
                      {profile?.ContactDetails?.State || ""}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-sm font-medium text-gray-900">
                    <span>
                      Income:{" "}
                      {profile?.EducationDetails?.AnnualFamilyIncome || ""}{" "}
                      Lakh/Month
                    </span>
                    <span>
                      Height: {profile?.PersonalDetails?.Height || ""}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        navigate("/view-profiles", {
                          state: { id: profile._id },
                        })
                      }
                      className="border border-gray-300 rounded-md py-2 flex-1 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate("/matched-profile", {
                          state: { profileId: profile._id },
                        })
                      }
                      className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex-1 flex items-center justify-center"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Find Match
                    </button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        navigate("/add-new-profile", { state: { id: profile } })
                      }
                      className="border border-gray-300 rounded-md py-2 flex-1 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => delete_user_profile(profile._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex-1 flex items-center justify-center"
                    >
                      <Blocks className="mr-2 h-4 w-4" />
                      Block
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
              {/* Limit Dropdown */}
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="limit" className="text-gray-700">
                  Show:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
                <span className="text-gray-600">per page</span>
              </div>

              {/* Page Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-md border ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Prev
                </button>

                <span className="text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md border ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {all_profile.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No profiles found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || genderFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "Get started by adding your first profile"}
            </p>
            {!searchTerm &&
              genderFilter === "all" &&
              statusFilter === "all" && (
                <a href="/profiles/new">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center mx-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Profile
                  </button>
                </a>
              )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
