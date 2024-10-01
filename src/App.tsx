import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DailySalary from "./DailySalary";
import HourlySalary from "./HourlySalary";
import HalfMonthSalary from "./HalfMonthSalary";
import MonthlySalary from "./MonthlySalary";
import Footer from "./Footer";

export default function App() {
  const [selectedView, setSelectedView] = useState("daily");

  const handleSelectionChange = (value: string) => {
    setSelectedView(value);
  };

  return (
    <div className="flex min-h-screen font-inter flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="container mx-auto max-w-3xl flex flex-col justify-between gap-16 px-6 py-6 flex-grow">
        <div className="">
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">Salaread</h1>
            <h1 className="text-md font-normal tracking-tight text-neutral-400 dark:text-neutral-200">Config</h1>
          </div>
          <div className="mb-6 flex flex-col sm:flex-row items-start gap-4">
            <Select value={selectedView} onValueChange={handleSelectionChange}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="half_month">Half Month</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 rounded-lg transition-all duration-300 ease-in-out">
            {selectedView === "daily" && <DailySalary />}
            {selectedView === "hourly" && <HourlySalary />}
            {selectedView === "half_month" && <HalfMonthSalary />}
            {selectedView === "monthly" && <MonthlySalary />}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
      <Analytics />
    </div >
  );
}
