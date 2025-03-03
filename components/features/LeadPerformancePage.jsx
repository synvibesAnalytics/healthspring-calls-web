"use client";

import * as React from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample Data
const summaryData = [
  { title: "Total Leads", value: "1,254", change: "+12%" },
  { title: "Conversion Rate", value: "18.4%", change: "+3.2%" },
  { title: "Pending Leads", value: "320", change: "-5%" },
  { title: "Follow-ups Due", value: "102", change: "+8%" },
];

const leadSourcesData = [
  { name: "Organic", value: 450, fill: "hsl(var(--chart-1))" },
  { name: "Paid", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "Referral", value: 250, fill: "hsl(var(--chart-3))" },
  { name: "Social Media", value: 150, fill: "hsl(var(--chart-4))" },
];

const monthlyPerformanceData = [
  { month: "Jan", leads: 120, conversions: 30 },
  { month: "Feb", leads: 150, conversions: 50 },
  { month: "Mar", leads: 180, conversions: 70 },
  { month: "Apr", leads: 200, conversions: 90 },
  { month: "May", leads: 220, conversions: 110 },
  { month: "Jun", leads: 250, conversions: 130 },
];

const leadTrendData = [
  { month: "Jan", leads: 120 },
  { month: "Feb", leads: 150 },
  { month: "Mar", leads: 180 },
  { month: "Apr", leads: 200 },
  { month: "May", leads: 220 },
  { month: "Jun", leads: 250 },
];

export default function LeadPerformancePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Lead Performance</h1>

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
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of leads from various channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={leadSourcesData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Performance</CardTitle>
            <CardDescription>Monthly lead conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={monthlyPerformanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="hsl(var(--chart-1))" />
              <Bar dataKey="conversions" fill="hsl(var(--chart-2))" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Trends</CardTitle>
            <CardDescription>Monthly lead growth</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart width={800} height={300} data={leadTrendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="hsl(var(--chart-3))" strokeWidth={2} />
            </LineChart>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
