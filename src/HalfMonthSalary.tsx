import { useState } from "react";
import { formatToPHP } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export default function HalfMonthSalary() {
  const [hourlySalary, setHourlySalary] = useState<number | null>(null);
  const [halfMonthlySalary, setHalfMonthlySalary] = useState<number | null>(null);
  const [dailySalary, setDailySalary] = useState<number | null>(null);
  const [rateType, setRateType] = useState<string>("daily");
  const [showTooltip, setShowTooltip] = useState(false);
  const calcHalfMonthlySalaryHourlyBased = (hourlySalary: number): number => {
    const workingHours: number = 8;
    const dailySalary = hourlySalary * workingHours;
    setDailySalary(dailySalary);
    const halfMonthlySalary = hourlySalary * workingHours * 10;
    return halfMonthlySalary;
  };

  const calcMonthlySalaryDailyBased = (dailySalary: number): number => {
    const halfMonthlySalary = dailySalary * 10; //Make this dynamic by using Date object
    setHalfMonthlySalary(halfMonthlySalary);
    setDailySalary(dailySalary);
    return halfMonthlySalary;
  };

  const handleCalculate = () => {
    let salary: number;
    if (rateType === "hourly" && hourlySalary !== null) {
      salary = calcHalfMonthlySalaryHourlyBased(hourlySalary);
      setHalfMonthlySalary(salary);
    } else if (rateType === "daily" && dailySalary !== null) {
      console.log("Executing...");
      salary = calcMonthlySalaryDailyBased(dailySalary);
      console.log(`_daily salary: ${dailySalary}`);
      console.log(`_monthly salary: ${halfMonthlySalary}`);
      setHalfMonthlySalary(salary);
      console.log("Done.");
    } else {
      console.log("Nothing");
    }
  };

  const handleRateTypeChange = (value: string) => {
    setRateType(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      if (rateType === "daily") {
        setDailySalary(null);
      } else {
        setHourlySalary(null);
      }
      setTimeout(() => setShowTooltip(false), 100);
    } else {
      if (rateType === "daily") {
        setDailySalary(Number(value));
      } else {
        setHourlySalary(Number(value));
      }
    }
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 5000);
  };
  return (
    <div className="flex items-start justify-start">
      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle className="text-2xl text-gray-500">

            What's your <span className="font-bold text-gray-800">{rateType}</span> salary?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="rate-type" className="text-sm font-medium text-gray-700">
              Based on:
            </Label>
            <Select value={rateType} onValueChange={handleRateTypeChange}>
              <SelectTrigger id="rate-type" className="w-[120px]">
                <SelectValue placeholder="Select rate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="salary_input" className=" text-sm font-medium text-gray-600">
            </Label>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip open={showTooltip}>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <Input id="salary_input" type="number" placeholder={`e.g. ${rateType === "daily" ? formatToPHP(400) : formatToPHP(50)}`} value={rateType === "daily" ? dailySalary ?? "" : hourlySalary ?? ""} onChange={handleInputChange} className="w-full placeholder:text-gray-400" aria-label="Hourly salary input" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{`${rateType.charAt(0).toUpperCase() + rateType.slice(1)} Salary: ${formatToPHP(rateType === "daily" ? dailySalary ?? 0 : hourlySalary ?? 0)}`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full bg-gray-700 text-white hover:bg-gray-800">
            Calculate
          </Button>

          {halfMonthlySalary !== null && dailySalary !== null && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Half Month: {formatToPHP(halfMonthlySalary)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
