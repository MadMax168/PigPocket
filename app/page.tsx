"use client"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { PiggyBank, TrendingUp, FileText } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push(`/signpage`);
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-gray-100 shadow-sm px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-bold text-gray-800">Pig Pocket</h1>
        </header>
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center max-w-2xl px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Simplify Your Budget with Pig Pocket
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Pig Pocket helps you track your income and expenses effortlessly,
              giving you insights into your financial habits. Start managing
              your money today!
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleGetStartedClick}
                className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 px-4 max-w-5xl">
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <PiggyBank className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h3>
              <p className="text-sm text-gray-600">
                Intuitive interface to add and review transactions in seconds.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">
                Get insights into your spending and saving habits with clear
                charts.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <FileText className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Organized</h3>
              <p className="text-sm text-gray-600">
                Categorize your transactions to keep everything organized and
                accessible.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
