import { useState } from "react";
import { formatToPHP } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DailySalary() {
  const [hourlySalary, setHourlySalary] = useState<number | null>(null);
  const [monthlySalary, setMonthlySalary] = useState<number | null>(null);
  const [dailySalary, setDailySalary] = useState<number | null>(null);
  const [rateType, setRateType] = useState<string>("daily");

  console.log(`daily salary: ${dailySalary}`);
  console.log(`monthly salary: ${monthlySalary}`);

  const calcMonthlySalaryHourlyBased = (hourlySalary: number): number => {
    const nonWorkingDays: number = 8;
    const workingHours: number = 8;

    const dailySalary = hourlySalary * workingHours;
    setDailySalary(dailySalary);
    const monthlySalary = hourlySalary * workingHours * (30 - nonWorkingDays);

    console.log(`=daily salary: ${dailySalary}`);
    console.log(`=monthly salary: ${monthlySalary}`);
    return monthlySalary;
  };

  const calcMonthlySalaryDailyBased = (dailySalary: number): number => {
    const monthlySalary = dailySalary * 22; //Make this dynamic by using Date object
    setMonthlySalary(monthlySalary);
    setDailySalary(dailySalary);
    console.log(`+monthly salary: ${monthlySalary}`);
    console.log(`+daily salary: ${dailySalary}`);
    return monthlySalary;
  };

  const handleCalculate = () => {
    let salary: number;
    if (rateType === "hourly" && hourlySalary !== null) {
      salary = calcMonthlySalaryHourlyBased(hourlySalary);
      setMonthlySalary(salary);
    } else if (rateType === "daily" && dailySalary !== null) {
      console.log("Executing...");

      salary = calcMonthlySalaryDailyBased(dailySalary);
      console.log(`_daily salary: ${dailySalary}`);
      console.log(`_monthly salary: ${monthlySalary}`);
      setMonthlySalary(salary);
      console.log("Done.");
    } else {
      console.log("Nothing");
    }
  };

  const handleRateTypeChange = (value: string) => {
    setRateType(value);
  };

  return (
    <div className="min-h-screen flex items-start justify-start">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Monthly Salary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="salary_input" className="text-sm font-medium text-gray-700">
              What's your {rateType} salary?
            </Label>
            <Input
              id="salary_input"
              type="number"
              min="20"
              max="1000000"
              placeholder={`Enter your ${rateType} salary`}
              value={rateType === "daily" ? (dailySalary === null ? "" : dailySalary) : hourlySalary === null ? "" : hourlySalary}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  if (rateType === "daily") {
                    setDailySalary(null);
                  } else {
                    setHourlySalary(null);
                  }
                } else {
                  if (rateType === "daily") {
                    setDailySalary(Number(value));
                  } else {
                    setHourlySalary(Number(value));
                  }
                }
              }}
              className="w-full"
            />
          </div>

          {(hourlySalary ?? dailySalary) &&
            (<p className="text-lg font-semibold text-gray-700">{rateType === "daily" ? formatToPHP(dailySalary ?? 0) : formatToPHP(hourlySalary ?? 0)}</p>)
          }
          <Button onClick={handleCalculate} className="w-full bg-gray-700 text-white hover:bg-gray-800">
            Calculate
          </Button>

          {monthlySalary !== null && dailySalary !== null && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Monthly: {formatToPHP(monthlySalary)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
