"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import PieChartDonut from "@/components/features/PieChartDonut";
import BarChartMultiple from "@/components/features/BarChartMultiple";

// Sample Data
const summaryData = [
  { title: "Total Calls", value: "2,546", change: "+15%" },
  { title: "Answered Calls", value: "1,920", change: "+10%" },
  { title: "Missed Calls", value: "420", change: "-5%" },
  { title: "Low Rated Calls", value: "120", change: "+8%" },
];


export default function CallsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Calls Performance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <TrendingUp className="inline-block h-4 w-4 mr-1" />
              {item.change} this month
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <PieChartDonut />

        {/* Bar Chart */}
        <BarChartMultiple />

       
      </div>
    </div>
  );
}
