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
import { Trash2 } from "lucide-react";
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
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import { useNavigate } from "react-router-dom";

export default function MatchesPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch accepted matches from backend
 const fetchMatches = async (pageNumber = 1) => {
  try {
    setLoading(true);

    const res = await api.get(
      `/api/user/accept-profile?page=${pageNumber}&limit=10`
    );

    if (res.status === 200 && Array.isArray(res.data.data)) {
      setMatches(res.data.data);
      setSelectedMatch(res.data.data[0] || null);
      setTotalPages(res.data.totalPages || 1);
      setPage(pageNumber);
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
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading matches...
      </div>
    );
  }

const handleDeleteMatch = async (id) => {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this match!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "small-swal-popup",
      confirmButton: "my-swal-button",
      cancelButton: "my-swal-cancel-button",
    },
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`api/user/delete-accept-profile/${id}`);

    await Swal.fire({
      title: "Deleted!",
      text: "Match has been deleted successfully.",
      icon: "success",
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    }).then(()=>
    {
      window.location.reload()
    });

  } catch (error) {
    console.log(error);

    await Swal.fire({
      title: "Error!",
      text: "Something went wrong while deleting.",
      icon: "error",
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    });
  }
};


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
            <h3
              className="font-semibold text-lg mt-2 cursor-pointer"
              onClick={() =>
                navigate("/user-profile", { state: { id: profile?._id } })
              }
            >
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
    <div>
      <Adminheader />
      <div className="layout">
        <Adminsidebar />

        <div className="content-wrapper p-4">
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
                  <h4 className="font-semibold text-gray-800">
                    Matched Profiles
                  </h4>
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
                        className={`p-4 mt-2 rounded-lg border cursor-pointer transition-colors ${
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
                              {match.MaleProfile?.PersonalDetails?.Name ||
                                "Male"}{" "}
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

              <div className="flex justify-center items-center gap-4 mt-6">

  <button
    disabled={page === 1}
    onClick={() => fetchMatches(page - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => fetchMatches(page + 1)}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>

</div>

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
                    <div className="flex items-center justify-between mt-4">
                      {/* Left Side (Names + Match %) */}
                      <div className="text-center flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {selectedMatch.MaleProfile?.PersonalDetails?.Name} ❤️{" "}
                          {selectedMatch.FemaleProfile?.PersonalDetails?.Name}
                        </h3>

                        <span className="mt-2 inline-block text-sm bg-blue-100 text-blue-800 font-medium px-4 py-1 rounded-full">
                          {selectedMatch.MatchingPercentage || 0}% Match
                        </span>
                      </div>

                      {/* 🔴 Right Side Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMatch(selectedMatch?._id);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </button>
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
      </div>
    </div>
  );
}
