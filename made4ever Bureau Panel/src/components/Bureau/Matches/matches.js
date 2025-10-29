import React, { useState } from "react";
import {
  Heart,
  Users,
  MessageCircle,
  CheckCircle,
  X,
  Eye,
  MapPin,
  Briefcase,
  GraduationCap,
  Filter,
  Star,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../../../UI/state_card";
import Card from "../../../UI/card";
import CardHeader from "../../../UI/card_header";
import CardContent from "../../../UI/card_contenet";
import Button from "../../../UI/button";
import Badge from "../../../UI/badge";
import Avatar from "../../../UI/avatar";
import Progress from "../../../UI/progress";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

// ✅ Mock profiles
const mockProfiles = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 28,
    gender: "Male",
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
    gender: "Female",
    occupation: "Doctor",
    education: "MBBS",
    city: "Mumbai",
    state: "Maharashtra",
    income: "₹12 LPA",
    height: "5'5\"",
    isActive: false,
    photos: ["https://randomuser.me/api/portraits/women/2.jpg"]
  },
  {
    id: 3,
    name: "Amit Verma",
    age: 30,
    gender: "Male",
    occupation: "Architect",
    education: "M.Arch",
    city: "Pune",
    state: "Maharashtra",
    income: "₹15 LPA",
    height: "5'10\"",
    isActive: true,
    photos: ["https://randomuser.me/api/portraits/men/3.jpg"]
  },
  {
    id: 4,
    name: "Neha Singh",
    age: 27,
    gender: "Female",
    occupation: "Data Analyst",
    education: "MBA",
    city: "Bangalore",
    state: "Karnataka",
    income: "₹11 LPA",
    height: "5'6\"",
    isActive: true,
    photos: ["https://randomuser.me/api/portraits/women/4.jpg"]
  }
];



// ✅ Mock Matches
const matches = [
  {
    id: "1",
    profile: mockProfiles[0],
    matchedProfile: mockProfiles[1],
    score: 92,
    status: "pending",
    createdAt: "2024-01-25",
    commonInterests: ["Music", "Travel", "Cooking"],
    compatibilityFactors: {
      location: 85,
      education: 95,
      lifestyle: 90,
      family: 88
    }
  },
  {
    id: "2",
    profile: mockProfiles[1],
    matchedProfile: mockProfiles[2],
    score: 87,
    status: "contacted",
    createdAt: "2024-01-24",
    commonInterests: ["Movies", "Reading", "Fitness"],
    compatibilityFactors: {
      location: 90,
      education: 85,
      lifestyle: 88,
      family: 85
    }
  },
  {
    id: "3",
    profile: mockProfiles[2],
    matchedProfile: mockProfiles[3],
    score: 78,
    status: "accepted",
    createdAt: "2024-01-23",
    commonInterests: ["Technology", "Travel"],
    compatibilityFactors: {
      location: 75,
      education: 80,
      lifestyle: 78,
      family: 82
    }
  }
];

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "contacted":
        return "bg-blue-100 text-blue-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "contacted":
        return <MessageCircle className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Header/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Matches</h1>
        <p className="text-gray-600 mb-6">AI-powered matches for your profiles</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Matches"
            value="89"
            description="This month"
            icon={<Heart className="h-4 w-4 text-gray-500" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pending Matches"
            value="23"
            description="Awaiting response"
            icon={<Users className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Success Rate"
            value="78%"
            description="Accepted matches"
            icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Credits Used"
            value="45"
            description="This month"
            icon={<Star className="h-4 w-4 text-gray-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matches List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Recent Matches</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </CardHeader>
              <CardContent>
                {matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMatch.id === match.id
                        ? "bg-red-50 border-red-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar src={match.profile.photos[0]} />
                      <Avatar src={match.matchedProfile.photos[0]} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {match.profile.name} × {match.matchedProfile.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-600">
                            {match.score}% match
                          </p>
                          <Badge className={getStatusColor(match.status)}>
                            {match.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={match.score} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Match Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(selectedMatch.status)}>
                      {getStatusIcon(selectedMatch.status)}
                      <span className="ml-1 capitalize">
                        {selectedMatch.status}
                      </span>
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Created on{" "}
                      {new Date(selectedMatch.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" /> Contact
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[selectedMatch.profile, selectedMatch.matchedProfile].map(
                    (profile) => (
                      <Card key={profile.id} className="bg-gray-50">
                        <CardContent>
                          <div className="text-center">
                            <Avatar src={profile.photos[0]} />
                            <h3 className="font-semibold text-lg mt-2">
                              {profile.name}
                            </h3>
                            <p className="text-gray-600">
                              {profile.age} years • {profile.gender}
                            </p>
                          </div>
                          <div className="space-y-2 mt-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4" />
                              {profile.education}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4" />
                              {profile.occupation}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {profile.city}, {profile.state}
                            </div>
                            <p>
                              <b>Income:</b> {profile.income}
                            </p>
                            <p>
                              <b>Height:</b> {profile.height}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>

                {/* Match Score */}
                <div className="mt-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {selectedMatch.score}%
                  </div>
                  <p className="text-gray-600 mb-3">Overall Compatibility</p>
                  <Progress value={selectedMatch.score} className="max-w-xs mx-auto" />
                </div>

                {/* Compatibility Breakdown */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedMatch.compatibilityFactors).map(
                    ([factor, score]) => (
                      <div key={factor} className="text-center">
                        <div className="text-lg font-semibold text-gray-800">
                          {score}%
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {factor}
                        </div>
                        <Progress value={score} className="h-1 mt-1" />
                      </div>
                    )
                  )}
                </div>

                {/* Common Interests */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Common Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatch.commonInterests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <Button variant="outline" className="flex-1">
                    <X className="h-4 w-4 mr-2" /> Reject Match
                  </Button>
                  <Button className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" /> Accept Match
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    <Footer/>
    </div>
  );
}
