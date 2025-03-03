"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { location: "Andheri W", engagement: 75 },
  { location: "Goregaon", engagement: 68 },
  { location: "Parel", engagement: 55 },
  { location: "Powai", engagement: 50 },
  { location: "Cuffe P.", engagement: 48 },
  { location: "Kharghar", engagement: 42 },
  { location: "Palava", engagement: 38 },
];

const chartConfig = {
  engagement: {
    label: "Engagement (%)",
    color: "hsl(var(--chart-1))",
  },
};

export default function BarChartEngagementByLocation() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Engagement by Location</CardTitle>
        <CardDescription>Comparison of user engagement across locations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="engagement" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 7.8% in engagement <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing engagement metrics across locations
        </div>
      </CardFooter>
    </Card>
  );
}