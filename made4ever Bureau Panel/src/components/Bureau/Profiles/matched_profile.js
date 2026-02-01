import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
import api from '../../../api'

export default function MatchingProfiles() {

  const navigate=useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const profileId = location.state?.profileId;

  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch matching data
const [page, setPage] = useState(1);
const [limit] = useState(10); // fixed or changeable
const [totalPages, setTotalPages] = useState(1);

const fetchMatches = async (pageNumber = page) => {
  try {
    setLoading(true);

    // 🔄 Show loader
    Swal.fire({
      title: "Loading matches...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const resp = await api.get(
      `api/user/matching-profile/${profileId}`,
      {
        params: {
          page: pageNumber,
          limit: limit,
          bureau:user._id
        },
      }
    );

    const results = resp.data.matches || [];

    setMatches(results);
    setSelectedMatch(results?.[0] || null);
    setTotalPages(resp.data.totalPages);
    setPage(pageNumber);

    Swal.close(); // ✅ close loader

  } catch (err) {
    Swal.close(); // ❌ close loader on error

    Swal.fire({
      icon: "error",
      title: "Failed to load matches",
      text:
        err?.response?.data?.message ||
        "Something went wrong. Please try again.",
      showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn",
          },
    });

    console.error("Error fetching matches:", err);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  if (profileId) {
    fetchMatches(1); // reset to page 1 when profile changes
  }
}, [profileId]);


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


// accept matches




const acceptProfile = async () => {
  try {
    const userId = selectedMatch.userprofile._id;
    const candidateId = selectedMatch.candidateId._id;
    const MatchingPercentage=selectedMatch.matchPercentage

    const res = await api.post("/api/user/accept-profile", {
      userId,
      candidateId,
      MatchingPercentage
    });

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Profile Accepted!",
        text: res.data.message || "Match saved successfully!",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "swal-confirm-btn",
          },
      }).then(()=>
      (
        navigate('/matches')
      ));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Unexpected Response",
        text: res.data.message || "Something went wrong.",
        customClass: {
            confirmButton: "swal-confirm-btn",
          },
      });
    }

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to accept profile. Please try again.",
      customClass: {
            confirmButton: "swal-confirm-btn",
          },
    });
  }
};





  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Matches</h1>
        <p className="text-gray-600 mb-6">AI-powered matches for your profile</p>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No matches found for this profile.
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Matches"
                value={matches.length}
                description="Found profiles"
                icon={<Heart className="h-4 w-4 text-gray-500" />}
              />
              <StatsCard
                title="Accepted Matches"
                value={matches.filter((m) => m.status === "accepted").length}
                description="Successful matches"
                icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
              />
              <StatsCard
                title="Pending"
                value={matches.filter((m) => m.status === "pending").length}
                description="Awaiting response"
                icon={<Users className="h-4 w-4 text-gray-500" />}
              />
              <StatsCard
                title="Contacted"
                value={matches.filter((m) => m.status === "contacted").length}
                description="Reached out"
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
                    {matches.map((match, idx) => {
                        const userPhoto =
                        match?.userprofile?.Upload?.ProfilePhoto?.[0] ||
                        "https://via.placeholder.com/50";
                        const candidatePhoto =
                        match?.candidateId?.Upload?.ProfilePhoto?.[0] ||
                        "https://via.placeholder.com/50";

                        const userName = match?.userprofile?.PersonalDetails?.Name || "Unknown User";
                        const candidateName =
                        match?.candidateId?.PersonalDetails?.Name || "Unknown Candidate";

                        return (
                        <div
                            key={idx}
                            onClick={() => setSelectedMatch(match)}
                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedMatch?._id === match._id
                                ? "bg-red-50 border-red-200"
                                : "hover:bg-gray-50"
                            }`}
                        >
                            {/* Profile Avatars */}
                            <div className="flex items-center space-x-3">
                            <Avatar src={userPhoto} />
                            <Avatar src={candidatePhoto} />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                {userName} × {candidateName}
                                </p>
                                <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-600">
                                    {match.matchPercentage || 0}% match
                                </p>
                                <Badge className={getStatusColor(match.status || "pending")}>
                                    {match.status || "pending"}
                                </Badge>
                                </div>
                            </div>
                            </div>

                            {/* Match Progress */}
                            <div className="mt-2">
                            <Progress value={match.matchPercentage || 0} />
                            </div>
                        </div>
                        );
                    })}
                    </CardContent>

                </Card>
                {totalPages > 1 && (
  <div className="flex items-center justify-between mt-4 border-t pt-3">
    <Button
      variant="outline"
      size="sm"
      disabled={page === 1 || loading}
      onClick={() => fetchMatches(page - 1)}
    >
      Prev
    </Button>

    <span className="text-sm text-gray-600">
      Page <b>{page}</b> of <b>{totalPages}</b>
    </span>

    <Button
      variant="outline"
      size="sm"
      disabled={page === totalPages || loading}
      onClick={() => fetchMatches(page + 1)}
    >
      Next
    </Button>
  </div>
)}

              </div>

              {/* Match Details */}
           {selectedMatch && (
  <div className="lg:col-span-2">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(selectedMatch.status || "pending")}>
            {getStatusIcon(selectedMatch.status || "pending")}
            <span className="ml-1 capitalize">
              {selectedMatch.status || "pending"}
            </span>
          </Badge>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() =>
                    navigate("/match-details", {
                    state: {
                        user: selectedMatch.userprofile,
                        candidate: selectedMatch.candidateId,
                        },
                    })
                    }
                >
              <Eye className="h-4 w-4 mr-2" /> View
            </Button>
            <Button size="sm">
              <MessageCircle className="h-4 w-4 mr-2" /> Contact
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Two Profiles Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[selectedMatch.userprofile, selectedMatch.candidateId].map(
            (profile, idx) => {
              const photo =
                profile?.Upload?.ProfilePhoto?.[0] ||
                "https://via.placeholder.com/100";
              const name = profile?.PersonalDetails?.Name || "Unknown";
              const age = profile?.PersonalDetails?.Age || "-";
              const gender = profile?.PersonalDetails?.Gender || "-";
              const city = profile?.ContactDetails?.City || "-";
              const state = profile?.ContactDetails?.State || "-";
              const education =
                profile?.EducationDetails?.HighestEducation || "-";
              const occupation =
                profile?.EducationDetails?.Occupation || "-";
              const income =
                profile?.EducationDetails?.AnnualFamilyIncome || "-";
              const height = profile?.PersonalDetails?.Height || "-";
              const religion =
                profile?.ReligiousDetails?.Religion || "-";
              const caste = profile?.ReligiousDetails?.Caste || "-";
              const Bureau = profile?.Bureau?.name || "-";

              return (
                <Card key={idx} className="bg-gray-50">
                  <CardContent>
                    <div className="text-center">
                      <Avatar src={photo} />
                      <h3 className="font-semibold text-lg mt-2">{name}</h3>
                      <p className="text-gray-600">
                        {age} years • {gender}
                      </p>
                      <p className="text-gray-500 mt-1">
                        {city}, {state}
                      </p>
                    </div>

                    <div className="space-y-2 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {education}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        {occupation}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {religion} • {caste}
                      </div>
                      <p>
                        <b>Income:</b> {income} LPA
                      </p>
                      <p>
                        <b>Height:</b> {height}
                      </p>
                        <p>
                        <b>Buerau Name:</b> {Bureau}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        {/* Overall Compatibility */}
        <div className="mt-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">
            {selectedMatch.matchPercentage || 0}%
          </div>
          <p className="text-gray-600 mb-3">Overall Compatibility</p>
          <Progress
            value={selectedMatch.matchPercentage || 0}
            className="max-w-xs mx-auto"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" className="flex-1">
            <X className="h-4 w-4 mr-2" /> Reject Match
          </Button>
          <Button className="flex-1" onClick={acceptProfile}>
            <CheckCircle className="h-4 w-4 mr-2" /> Accept Match
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)}

            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
