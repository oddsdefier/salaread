import React, { useState } from "react";
import { formatToPHP } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DailySalary() {
	const [hourlySalary, setHourlySalary] = useState<number | null>(null);
	const [monthlySalary, setMonthlySalary] = useState<number | null>(null);
	const [dailySalary, setDailySalary] = useState<number | null>(null);

	const calcDailySalary = (hourlySalary: number): number => {
		const workingHours: number = 8;
		const dailySalary: number = hourlySalary * workingHours;
		setHourlySalary(hourlySalary);
		setDailySalary(dailySalary);
		calcMonthlySalary(dailySalary);
		return dailySalary;
	};

	const calcMonthlySalary = (dailySalary: number): number => {
		const monthlySalary = dailySalary * 22; //Make this dynamic by using Date object
		setMonthlySalary(monthlySalary);
		return monthlySalary;
	};

	const handleCalculate = () => {
		if (hourlySalary !== null) {
			const salary = calcDailySalary(hourlySalary);
			setDailySalary(salary);
		}
	};

	return (
		<div className="min-h-screen flex items-start justify-start">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-gray-800">Daily Salary</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="salary_input" className="text-sm font-medium text-gray-700">
								What's your hourly salary?
							</Label>
							<div className="flex items-center space-x-2">
								<Input
									id="salary_input"
									type="number"
									placeholder="Enter hourly salary"
									value={hourlySalary === null ? "" : hourlySalary}
									onChange={(e) => {
										const value = e.target.value;
										if (value === "") {
											setHourlySalary(null);
										} else {
											setHourlySalary(Number(e.target.value));
										}
									}}
									className="flex-grow"
								/>
							</div>
						</div>
						{hourlySalary !== null && <p className="text-lg font-semibold text-gray-700">{formatToPHP(hourlySalary)}</p>}
						<Button onClick={handleCalculate} className="w-full bg-gray-700 text-white hover:bg-gray-800">
							Calculate
						</Button>
						{monthlySalary !== null && dailySalary !== null && (
							<div className="space-y-2 bg-gray-50 p-4 rounded-md">
								<p className="text-lg font-semibold text-gray-700">Daily Salary: {formatToPHP(dailySalary)}</p>
								<p className="text-lg font-semibold text-gray-700">Monthly Salary: {formatToPHP(monthlySalary)}</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
