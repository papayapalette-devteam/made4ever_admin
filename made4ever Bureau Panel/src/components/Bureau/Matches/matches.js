import React, { useEffect, useState } from "react";
import {
  Heart,
  Users,
  CheckCircle,
  Eye,
  MapPin,
  Briefcase,
  GraduationCap,
  Filter,
  Star,
  TrendingUp,
} from "lucide-react";
import api from "../../../api"; // ✅ your axios instance
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

export default function MatchesPage() {

    const user = JSON.parse(localStorage.getItem("user"));

  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
const [limit] = useState(10);
const [totalPages, setTotalPages] = useState(1);


  // ✅ Fetch accepted matches from backend
const fetchMatches = async (pageNumber = 1) => {
  try {
    setLoading(true);

    const res = await api.get("/api/user/accept-profile", {
      params: {
        page: pageNumber,
        limit: limit,
        bureau: user._id,   // if required
      },
    });

    if (res.status === 200 && Array.isArray(res.data.data)) {
      setMatches(res.data.data);
      setSelectedMatch(res.data.data[0] || null);

      setPage(res.data.page);
      setTotalPages(res.data.totalPages || 1);
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error Fetching Matches",
      text: error.response?.data?.message || "Something went wrong!",
    });
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMatches(page);
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading matches...
      </div>
    );
  }

  const renderProfile = (profile, label) => {
    if (!profile)
      return <p className="text-gray-500 text-center">No {label} Data</p>;

    const { PersonalDetails, EducationDetails, ContactDetails, Upload } =
      profile;

    const image =
      Upload?.ProfilePhoto?.[0] ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
      <Card className="bg-gray-50">
        <CardContent>
          <div className="text-center">
            <Avatar src={image} />
            <h3 className="font-semibold text-lg mt-2">
              {PersonalDetails?.Name || "N/A"}
            </h3>
            <p className="text-gray-600">
              {PersonalDetails?.Age || "--"} yrs •{" "}
              {PersonalDetails?.Gender || "--"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {PersonalDetails?.MaritalStatus || "Unmarried"}
            </p>
          </div>

          <div className="space-y-2 mt-3 text-sm text-gray-600">
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              {EducationDetails?.HighestEducation || "N/A"}
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              {EducationDetails?.Occupation || "N/A"}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {ContactDetails?.City || "--"}, {ContactDetails?.State || "--"}
            </div>
            <p>
              <b>Height:</b> {PersonalDetails?.Height || "--"}
            </p>
            <p>
              <b>Complexion:</b> {PersonalDetails?.Complexion || "--"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">
          Accepted Matches
        </h1>
        <p className="text-gray-600 mb-6">
          View all matched profiles with complete details
        </p>

        {/* ✅ Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Matches"
            value={matches.length}
            description="Accepted profiles"
            icon={<Heart className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Active Profiles"
            value={matches.length}
            description="Currently visible"
            icon={<Users className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Success Rate"
            value="100%"
            description="Filtered accepted profiles"
            icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Credits Used"
            value="N/A"
            description="For viewing profiles"
            icon={<Star className="h-4 w-4 text-gray-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✅ Matches List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">
                  Matched Profiles
                </h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </CardHeader>
              <CardContent>
                {matches.length === 0 ? (
                  <p className="text-gray-600 text-center py-6">
                    No accepted matches found.
                  </p>
                ) : (
                  matches.map((match) => (
                    <div
                      key={match._id}
                      onClick={() => setSelectedMatch(match)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedMatch?._id === match._id
                          ? "bg-red-50 border-red-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={
                            match.MaleProfile?.Upload?.ProfilePhoto?.[0] ||
                            "/default-male.jpg"
                          }
                        />
                        <Avatar
                          src={
                            match.FemaleProfile?.Upload?.ProfilePhoto?.[0] ||
                            "/default-female.jpg"
                          }
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {match.MaleProfile?.PersonalDetails?.Name || "Male"}{" "}
                            ×{" "}
                            {match.FemaleProfile?.PersonalDetails?.Name ||
                              "Female"}
                          </p>
                          <Badge className="bg-green-100 text-green-700">
                            Accepted
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            {/* ✅ Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center mt-6 space-x-2">
    
    {/* Previous */}
    <button
      onClick={() => setPage((prev) => prev - 1)}
      disabled={page === 1}
      className={`px-3 py-1 rounded border text-sm ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    {/* Page Numbers */}
<span className="px-4 py-1 text-sm text-gray-700">
  Page <span className="font-semibold">{page}</span> of{" "}
  <span className="font-semibold">{totalPages}</span>
</span>


    {/* Next */}
    <button
      onClick={() => setPage((prev) => prev + 1)}
      disabled={page === totalPages}
      className={`px-3 py-1 rounded border text-sm ${
        page === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
)}

          </div>

          {/* ✅ Selected Match Details */}
          {selectedMatch && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  {/* Top Badge + Date */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-700 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Accepted
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Matched on{" "}
                      {new Date(selectedMatch.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Centered Names + Percentage */}
                  <div className="flex flex-col items-center justify-center mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedMatch.MaleProfile?.PersonalDetails?.Name} ❤️{" "}
                      {selectedMatch.FemaleProfile?.PersonalDetails?.Name}
                    </h3>

                    <span className="mt-2 inline-block text-sm bg-blue-100 text-blue-800 font-medium px-4 py-1 rounded-full">
                      {selectedMatch.MatchingPercentage || 0}% Match
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderProfile(selectedMatch.MaleProfile, "Male")}
                    {renderProfile(selectedMatch.FemaleProfile, "Female")}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
