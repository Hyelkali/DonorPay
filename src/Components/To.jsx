"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home as HomeIcon,
  Info,
  Mail,
  LogIn,
  UserPlus,
  Heart,
  DollarSign,
  Shield,
  Globe
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CardContent from "@/components/ui/Card";
import CardHeader from "@/components/ui/Card";
import Sheet from "@/components/ui/Sheet";
import SheetContent from "@/components/ui/Sheet";
import SheetTrigger from "@/components/ui/Sheet";

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 960);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navItems = [
    { name: "Home", icon: <HomeIcon className="w-4 h-4 mr-2" />, to: "/" },
    { name: "About", icon: <Info className="w-4 h-4 mr-2" />, to: "/about" },
    {
      name: "Contact",
      icon: <Mail className="w-4 h-4 mr-2" />,
      to: "/contact"
    },
    { name: "Log In", icon: <LogIn className="w-4 h-4 mr-2" />, to: "/login" },
    {
      name: "Sign Up",
      icon: <UserPlus className="w-4 h-4 mr-2" />,
      to: "/register"
    }
  ];

  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white transition-all duration-500 flex flex-col">
    <header className="flex bg-white shadow-sm py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">DonorPay</h1>
        {isLargeScreen ? (
          <nav className="flex space-x-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                asChild
              >
                <Link to={item.to} className="text-white no-underline">
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border border-gray-300"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start px-4 py-2 border-b border-gray-200 text-gray-600 hover:bg-gray-100"
                    asChild
                  >
                    <Link to={item.to} className="flex items-center">
                      {item.icon}
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>

    <main className="container mx-auto px-6 py-12 flex-grow">
      <section className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-blue-600 transition-transform duration-300 hover:scale-105">
          Empower Change with Every Donation
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Join our global community of givers and make a difference today.
        </p>
      </section>
      <section className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-blue-600 transition-transform duration-300 hover:scale-105">
          Empower Change with Every Donation
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Join our global community of givers and make a difference today.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Why Choose DonorPay?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Trusted Platform",
              icon: <Heart className="w-8 h-8 mb-4 text-blue-500" />
            },
            {
              title: "Easy Transfers",
              icon: <DollarSign className="w-8 h-8 mb-4 text-green-500" />
            },
            {
              title: "Secure Payments",
              icon: <Shield className="w-8 h-8 mb-4 text-red-500" />
            }
          ].map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg"
            >
              <CardHeader className="p-6">
                <div className="flex flex-col items-center">
                  {item.icon}
                  <h4 className="text-xl font-semibold text-gray-700 mt-4">
                    {item.title}
                  </h4>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-center text-gray-600">
                  {item.title === "Trusted Platform"
                    ? "Join millions of donors who trust us to connect them with verified causes worldwide."
                    : item.title === "Easy Transfers"
                    ? "Send donations quickly and securely with just a few clicks."
                    : "Your financial information is protected with state-of-the-art encryption."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Ready to Make a Difference?
        </h3>
        <Button
          size="lg"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Link to="/register">Get Started</Link>
        </Button>
      </section>
    </main>

    <footer className="bg-gray-100 py-8 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          "About DonorPay",
          "For Donors",
          "For Fundraisers",
          "Connect With Us"
        ].map((section, index) => (
          <div key={index}>
            <h4 className="font-semibold mb-4 text-gray-700">{section}</h4>
            <ul className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {index === 0
                      ? ["Our Story", "How It Works", "Testimonials"][i]
                      : index === 1
                      ? ["Find Causes", "Giving Guide", "Tax Deductions"][i]
                      : index === 2
                      ? [
                          "Start a Campaign",
                          "Fundraising Tips",
                          "Success Stories"
                        ][i]
                      : ["Contact Support", "Facebook", "Twitter"][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 DonorPay. All rights reserved.</p>
      </div>
    </footer>
  </div>;
};
export default Home;
