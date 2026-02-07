import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Normal imports (load immediately)
import SignIn from "./components/other component/signin";
import ProtectedRoute from "./components/other component/protected_route";

// Lazy loaded pages (code splitting)
const Dashboard = lazy(() =>
  import("./components/Bureau/Dashboard")
);

const ProfilesPage = lazy(() =>
  import("./components/Bureau/Profiles/profile")
);

const NewProfileForm = lazy(() =>
  import("./components/Bureau/Profiles/add_new_profile")
);

const MatchesPage = lazy(() =>
  import("./components/Bureau/Matches/matches")
);

const BillingPage = lazy(() =>
  import("./components/Bureau/Billing/billing")
);

const UserProfile = lazy(() =>
  import("./components/Bureau/Profiles/view_profile")
);

const MatchingProfiles = lazy(() =>
  import("./components/Bureau/Profiles/matched_profile")
);

const MatchDetailsPage = lazy(() =>
  import("./components/Bureau/Profiles/full_view_matched_profile")
);

const TermsAndConditions = lazy(() =>
  import("./components/Bureau/Profiles/terms")
);

// Professional Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-lg font-semibold animate-pulse">
      Loading...
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Public Route */}
          <Route path="/" element={<SignIn />} />

          {/* Protected Area */}
          <Route element={<ProtectedRoute />}>
            <Route path="/buerau-dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/view-profiles" element={<UserProfile />} />
            <Route path="/matched-profile" element={<MatchingProfiles />} />
            <Route path="/match-details" element={<MatchDetailsPage />} />
            <Route path="/add-new-profile" element={<NewProfileForm />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
