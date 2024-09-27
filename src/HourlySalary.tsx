import { useState } from "react";
import { formatToPHP } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export default function HourlySalary() {
	const [monthlySalary, setMonthlySalary] = useState<number | null>(null);
	const [dailySalary, setDailySalary] = useState<number | null>(null);
	const [hourlySalary, setHourlySalary] = useState<number | null>(null);
	const [showTooltip, setShowTooltip] = useState(false);
	//I don't know what's going on but it works

	const calcDailySalary = (monthlySalary: number): number => {
		const nonWorkingDays: number = 8;
		const workingHours: number = 8;
		const hourlySalary: number = monthlySalary / (30 - nonWorkingDays) / workingHours;
		const dailySalary: number = hourlySalary * workingHours;
		setDailySalary(dailySalary);
		return hourlySalary;
	};

	const handleCalculate = () => {
		if (monthlySalary !== null) {
			const salary: number = calcDailySalary(monthlySalary);
			setHourlySalary(salary);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			setMonthlySalary(null);
			setTimeout(() => setShowTooltip(false), 100);
		} else {
			setMonthlySalary(Number(value));
		}
		setShowTooltip(true);
		setTimeout(() => setShowTooltip(false), 5000);
	};
	return (
		<div className="min-h-screen flex items-start justify-start">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-gray-800">Hourly</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="space-y-2">
						<Label htmlFor="salary_input" className="text-sm font-medium text-gray-700">
							What's your <span className="font-bold">monthly </span>salary?
						</Label>
						<div className="flex items-center space-x-2">
							<TooltipProvider>
								<Tooltip open={showTooltip}>
									<TooltipTrigger asChild>
										<div className="w-full">
											<Input id="salary_input" type="number" placeholder={`e.g. ${formatToPHP(10000)}`} value={monthlySalary === null ? "" : monthlySalary} onChange={handleInputChange} className="w-full placeholder:text-gray-400" aria-label="Hourly salary input" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>Monthly Salary: {monthlySalary ? formatToPHP(monthlySalary) : "No value"}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>

					<Button onClick={handleCalculate} className="w-full bg-gray-700 text-white hover:bg-gray-800">
						Calculate
					</Button>

					{hourlySalary !== null && dailySalary !== null && (
						<div className="bg-gray-50 p-4 rounded-md space-y-2">
							<p className="text-lg font-semibold text-gray-700">Hourly: {formatToPHP(hourlySalary)}</p>
							<p className="text-lg font-semibold text-gray-700">Daily: {formatToPHP(dailySalary)}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
