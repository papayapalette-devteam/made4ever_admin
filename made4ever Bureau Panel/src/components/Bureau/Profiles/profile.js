import React, { useState } from "react";
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, 
  Heart, MapPin, Briefcase, GraduationCap, Users 
} from "lucide-react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";


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
    photos: ["https://randomuser.me/api/portraits/men/1.jpg"]
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
    photos: ["https://randomuser.me/api/portraits/women/2.jpg"]
  },
];

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

 

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profiles</h1>
            <p className="text-gray-600">Manage your bureau's member profiles</p>
          </div>
         
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4 sm:mt-0 flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add New Profile
            </button>
         
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
            <div className="text-2xl font-bold text-blue-600">{mockProfiles.length}</div>
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
              {mockProfiles.filter((p) => p.gender === "male").length}
            </div>
            <p className="text-sm text-gray-600">Male Profiles</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-pink-600">
              {mockProfiles.filter((p) => p.gender === "female").length}
            </div>
            <p className="text-sm text-gray-600">Female Profiles</p>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{profile.name}</h2>
                    <p className="text-sm text-gray-500">
                      {profile.age} years • {profile.gender}
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
                  <GraduationCap className="mr-2 h-4 w-4" /> {profile.education}
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" /> {profile.occupation}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> {profile.city}, {profile.state}
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 text-sm font-medium text-gray-900">
                <span>Income: {profile.income}</span>
                <span>Height: {profile.height}</span>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="border border-gray-300 rounded-md py-2 flex-1 flex items-center justify-center hover:bg-gray-50">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex-1 flex items-center justify-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Find Match
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockProfiles.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || genderFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "Get started by adding your first profile"}
            </p>
            {!searchTerm && genderFilter === "all" && statusFilter === "all" && (
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

      <Footer/>
    </div>
  );
}
