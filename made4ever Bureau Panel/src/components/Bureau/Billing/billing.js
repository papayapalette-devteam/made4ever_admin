import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Star,
  Calendar,
  Download,
  TrendingUp,
  Wallet,
  Clock,
  Zap,
} from "lucide-react";
import StatsCard from "../../../UI/state_card";
import Card from "../../../UI/card";
import CardHeader from "../../../UI/card_header";
import CardContent from "../../../UI/card_contenet";
import CardTitle from "../../../UI/card_title";
import CardDescription from "../../../UI/card_description";
import Button from "../../../UI/button";
import Badge from "../../../UI/badge";
import Progress from "../../../UI/progress";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import api from '../../../api'



// Example mock data (you can import it if you already have mockPlans.js)
const mockPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 500,
    credits: 10,
    features: ["Access basic tools", "Email support", "Monthly updates"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 2000,
    credits: 50,
    features: ["Everything in Basic", "Priority support", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 3000,
    credits: 100,
    features: ["Dedicated account manager", "Custom integrations", "24/7 support"],
  },
];

const transactions = [
  {
    id: "1",
    date: "2024-01-20",
    description: "Premium Plan Purchase",
    credits: 150,
    amount: 7999,
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-15",
    description: "Basic Plan Purchase",
    credits: 50,
    amount: 2999,
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-10",
    description: "Enterprise Plan Purchase",
    credits: 500,
    amount: 19999,
    status: "completed",
  },
];

export default function BillingPage() {


  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);
  
  

  


  const [selectedPlan, setSelectedPlan] = useState("premium");

 

const handlePurchase = async () => {
  try {
    const selected = mockPlans.find((p) => p.id === selectedPlan);

    if (!selected) {
      console.error("No plan selected");
      return;
    }

      // 💰 Price calculations
    const basePrice = selected.price;
    const gstAmount = Math.round(basePrice * 0.18);
    const totalPrice = basePrice + gstAmount;

    const payload = {
      plan_id: selected.id,
      plan_name: selected.name,
      price: totalPrice,
      credits: selected.credits,
      validity: selected.validity,

      user_id: user._id,
      name: user.name,
      email: user.email,
      phone: user.mobile_number,
      address: user.address,
      business_name: user.registered_business_name,
    };

    // 🚀 IMPORTANT
    const response = await api.post("api/payu/start-payment", payload);

    const html = response.data;  // Backend gives HTML

    // 🚀 Render the HTML so the form auto-submits
    const newWindow = window.open("", "_self");
    newWindow.document.write(html);
    newWindow.document.close();

  } catch (error) {
    console.error("Payment Error:", error.message);
  }
};






  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and purchase credits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Current Plan"
            value={user?.current_plan}
            description="Active subscription"
            icon={<Star className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Credits Remaining"
            value={user?.credits}
            description={`remaining credits`}
            icon={<Wallet className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Days Left"
            value={ 0}
            description="Until renewal"
            icon={<Clock className="h-4 w-4 text-gray-500" />}
          />
          <StatsCard
            title="Usage This Month"
            value="45"
            description="Credits used"
            icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
            trend={{ value: 0, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Plans Section */}
          <div className="lg:col-span-2">
            {/* Current Subscription */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Your active plan and usage details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {user?.current_plan} Plan
                      </h3>
                      <p className="text-sm text-gray-600">
                        Expires on{" "}
                        {/* {new Date(currentSubscription.expiryDate).toLocaleDateString()} */}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credits Used</span>
                      <span>
                        {/* {currentSubscription.creditsUsed}/{currentSubscription.creditsTotal} */}
                      </span>
                    </div>
                    <Progress
                      value={
                        (user?.creditsUsed /
                          user?.creditsTotal) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Usage History
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Available Plans</CardTitle>
                <CardDescription>Choose the perfect plan for your bureau</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${plan.id === "premium" ? "ring-2 ring-red-200" : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.id === "premium" && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600">
                          Most Popular
                        </Badge>
                      )}

                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">
                            ₹{plan.price.toLocaleString()}
                          </span>
                          <span className="text-gray-600">/{plan.validity} days</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {plan.credits} Credits
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full mt-4 ${
                          selectedPlan === plan.id
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                        disabled={plan.id === "premium"}
                      >
                        {plan.id === "premium" ? "Current Plan" : "Select Plan"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Selected Plan:</span>
                    <span className="font-medium capitalize">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits:</span>
                    <span className="font-medium">
                      {mockPlans.find((p) => p.id === selectedPlan)?.credits}
                    </span>
                  </div>
   <div className="flex justify-between">
  <span>GST (18%):</span>
  <span className="font-medium">
    ₹{Math.round(
      (mockPlans.find((p) => p.id === selectedPlan)?.price || 0) * 0.18
    ).toLocaleString()}
  </span>
</div>

                  <hr />
        <div className="flex justify-between text-lg font-bold">
  <span>Total:</span>
  <span>
    ₹{Math.round(
      (mockPlans.find((p) => p.id === selectedPlan)?.price || 0) * 1.18
    ).toLocaleString()}
  </span>
</div>

                  <Button onClick={handlePurchase} className="w-full bg-red-600 hover:bg-red-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Purchase Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₹{transaction.amount.toLocaleString()}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          +{transaction.credits} credits
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our billing support team is here to help you with any questions.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
