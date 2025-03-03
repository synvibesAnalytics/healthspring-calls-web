"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { location: "Andheri West", calls: 520, fill: "hsl(var(--chart-1))" },
  { location: "Goregaon", calls: 430, fill: "hsl(var(--chart-2))" },
  { location: "Parel", calls: 390, fill: "hsl(var(--chart-3))" },
  { location: "Powai", calls: 340, fill: "hsl(var(--chart-4))" },
  { location: "Cuffe Parade", calls: 310, fill: "hsl(var(--chart-5))" },
  { location: "Kharghar", calls: 280, fill: "hsl(var(--chart-1))" },
  { location: "Lodha Palava", calls: 250, fill: "hsl(var(--chart-2))" },
];

export default function PieChartDonut() {
  const totalCalls = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.calls, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>Calls by Location</CardTitle>
        <CardDescription>
          Distribution of calls across different locations
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{ calls: { label: "Calls" } }}
          className="mx-auto"
        >
          <PieChart width={100} height={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="calls"
              nameKey="location"
              innerRadius={60}
              outerRadius={120}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCalls.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Calls
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total calls for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
