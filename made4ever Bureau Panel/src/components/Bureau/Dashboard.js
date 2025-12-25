import React, { useEffect, useState } from "react";
import {
  Users,
  Heart,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  MessageCircle,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useNavigate } from "react-router-dom";
import api from '../../api'

// ✅ Inline StatsCard component (modern design)
const StatsCard = ({ title, value, description, icon, trend }) => {
  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>

      {/* Value */}
      <div className="text-xl font-semibold text-gray-900">{value}</div>

      {/* Description + Trend */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
        {description && <span>{description}</span>}
        {trend && (
          <div
            className={`flex items-center space-x-1 ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {

  const navigate=useNavigate()

  const user = JSON.parse(localStorage.getItem('user'));

    const[total_profile,settotal_profile]=useState([])
    const get_all_profile=async()=>
    {
      try {
  
        const resp=await api.get(`api/user/get-all-profile?bureau=${user._id}`);
        settotal_profile(resp.data.total)
        
      } catch (error) {
        console.log(error);
        
      }
    }

      useEffect(()=>
      {
        get_all_profile()
        
      },[])
  

  const recentMatches = [
    {
      id: "1",
      profileName: "Priya S.",
      matchName: "Amit P.",
      score: 85,
      status: "contacted",
      date: "2024-01-25",
    },
    {
      id: "2",
      profileName: "Rahul K.",
      matchName: "Anita M.",
      score: 92,
      status: "pending",
      date: "2024-01-24",
    },
    {
      id: "3",
      profileName: "Neha R.",
      matchName: "Vikash S.",
      score: 78,
      status: "accepted",
      date: "2024-01-24",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      message: "New profile added: Priya Sharma",
      time: "2 hours ago",
    },
    {
      id: "2",
      message: "New match found for Amit Patel",
      time: "4 hours ago",
    },
    {
      id: "3",
      message: "Profile viewed: Rahul Kumar (15 views today)",
      time: "6 hours ago",
    },
    {
      id: "4",
      message: "Credits purchased: 50 credits added",
      time: "1 day ago",
    },
  ];

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">
          Here's what's happening with your bureau today.
        </p>
      </div>

      {/* Stats Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Profiles"
          value={total_profile}
          description="Active profiles"
          icon={<Users className="h-4 w-4 text-gray-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Matches Found"
          value="89"
          description="This month"
          icon={<Heart className="h-4 w-4 text-gray-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Credits Remaining"
          value="150"
          description="Premium plan"
          icon={<CreditCard className="h-4 w-4 text-gray-500" />}
        />
        <StatsCard
          title="Success Rate"
          value="78%"
          description="Profile matching"
          icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button onClick={()=>navigate('/add-new-profile')} className="w-full h-24 flex flex-col justify-center items-center bg-blue-50 text-blue-600 rounded-xl border border-blue-200 hover:bg-blue-100 transition">
          <Plus className="h-6 w-6 mb-2" />
          Add New Profile
        </button>
        <button onClick={()=>navigate('/matches')} className="w-full h-24 flex flex-col justify-center items-center bg-red-50 text-red-600 rounded-xl border border-red-200 hover:bg-red-100 transition">
          <Heart className="h-6 w-6 mb-2" />
          Find Matches
        </button>
        <button onClick={()=>navigate('/profiles')} className="w-full h-24 flex flex-col justify-center items-center bg-green-50 text-green-600 rounded-xl border border-green-200 hover:bg-green-100 transition">
          <Eye className="h-6 w-6 mb-2" />
          View Profiles
        </button>
        <button onClick={()=>navigate('/billing')} className="w-full h-24 flex flex-col justify-center items-center bg-purple-50 text-purple-600 rounded-xl border border-purple-200 hover:bg-purple-100 transition">
          <CreditCard className="h-6 w-6 mb-2" />
          Buy Credits
        </button>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Matches */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Recent Matches</h2>
              <p className="text-gray-500 text-sm">
                Latest matches found for your profiles
              </p>
            </div>
            <button className="text-sm border rounded-md px-3 py-1 flex items-center hover:bg-gray-100">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {match.profileName}
                    </p>
                    <p className="text-sm text-gray-600">
                      matched with {match.matchName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-sm font-medium">{match.score}%</div>
                    <div className="text-xs text-gray-600">match</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      match.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : match.status === "contacted"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {match.status}
                  </span>
                  <button className="p-2 border rounded-md hover:bg-gray-100">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subscription */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Subscription Status</h3>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            </div>

            <div className="mb-3 text-sm text-gray-600 flex justify-between">
              <span>Credits Used</span>
              <span>100/250</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
              <div className="h-2 bg-green-500 w-[40%]"></div>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              <Calendar className="inline h-4 w-4 mr-1" />
              Expires on June 1, 2024
            </p>
            <button className="w-full py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700">
              Upgrade Plan
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:underline">
              View All Activity
            </button>
          </div>

          {/* Quick Tip */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-semibold">Quick Tip</h3>
            </div>
            <p className="text-sm text-gray-700">
              Profiles with complete information and photos get 3x more matches.
              Make sure all your profiles are fully updated!
            </p>
            <button className="w-full mt-3 border border-yellow-400 text-yellow-700 py-2 rounded-md text-sm hover:bg-yellow-100">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Dashboard;
