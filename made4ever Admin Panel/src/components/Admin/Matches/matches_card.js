import Slider from "react-slick";
import { FaPhoneAlt, FaHeart, FaUser, FaCity } from "react-icons/fa";
import { MdWork, MdCastForEducation } from "react-icons/md";
import { MapPin, Briefcase, GraduationCap, Heart,
        Building2, Mail, Phone } from "lucide-react";




const MatchCard = ({ matches }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
  {matches.map((m, i) => (
    <div
      key={i}
      className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      {/* Profile Photo */}
      <div className="relative">
        <img
          src={m.candidateId?.Upload?.ProfilePhoto?.[0] || "/no-image.jpg"}
          className="w-full h-64 object-cover"
          alt="Profile"
        />

        <div className="absolute top-2 left-2 bg-pink-600 text-white text-sm px-3 py-1 rounded-full shadow">
          {m.matchPercentage}% Match
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5">
        {/* Name + Age */}
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          {m.candidateId?.PersonalDetails?.Name}
        </h2>

        <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-600" />
          Age {m.candidateId?.PersonalDetails?.Age} •{" "}
          {m.candidateId?.PersonalDetails?.Gender} •{" "}
          {m.candidateId.PersonalDetails?.Height}
        </p>

        {/* City */}
        <p className="text-gray-600 mt-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-700" />
          {m.candidateId?.ContactDetails?.City},{" "}
          {m.candidateId?.ContactDetails?.State}
        </p>

        {/* Religion - Caste */}
        <p className="text-gray-600 flex items-center gap-2 mt-1">
          <Heart className="w-4 h-4 text-red-500" />
          {m.candidateId?.ReligiousDetails?.Religion} •{" "}
          {m.candidateId?.ReligiousDetails?.Caste}
        </p>

        {/* Occupation + Education Box */}
        <div className="mt-3 bg-gray-50 p-3 rounded-xl space-y-2">

          <p className="text-gray-700 text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-700" />
            <span className="font-semibold">Profession:</span>{" "}
            {m.candidateId?.EducationDetails?.Occupation || "Not Provided"}
          </p>

          <p className="text-gray-700 text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-700" />
            <span className="font-semibold">Education:</span>{" "}
            {m.candidateId?.EducationDetails?.HighestEducation}
          </p>

        </div>

       {/* Bureau Details */}
<div className="mt-4 bg-gray-50 p-3 rounded-xl space-y-2">

  {/* Bureau Name */}
  <div className="flex items-center gap-2 text-gray-700 text-sm">
    <Building2 className="w-4 h-4 text-gray-700" />
    <span className="font-semibold">Added By:</span>
    {m.candidateId?.Bureau?.name || "Not Provided"}
  </div>

  {/* Bureau Email */}
  <div className="flex items-center gap-2 text-gray-700 text-sm">
    <Mail className="w-4 h-4 text-gray-700" />
    {m.candidateId?.Bureau?.email || "No Email Available"}
  </div>

  {/* Bureau Phone */}
  <div className="flex items-center gap-2 text-gray-700 text-sm">
    <Phone className="w-4 h-4 text-gray-700" />
    {m.candidateId?.Bureau?.mobile_number || "Not Provided"}
  </div>

    {/* Bureau Address */}
  <div className="flex items-center gap-2 text-gray-700 text-sm">
    <MapPin  className="w-4 h-4 text-gray-700" />
    {m.candidateId?.Bureau?.address || "Not Provided"}
  </div>

</div>


        {/* Buttons */}
        {/* <div className="mt-5 flex items-center gap-3">
          <button className="flex-1 bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition">
            View Profile
          </button>

          <button className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
            Connect
          </button>
        </div> */}
      </div>
    </div>
  ))}
</div>


  );
};

export default MatchCard;
