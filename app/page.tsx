"use client"

import { LocationCard } from "@/components/LocationCard"
import { useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// This would typically come from your API
const dashboardLocations = [
  {
    id: "0",
    name: "Malad",
    address: "Shree Krishna, G Wing - 104 First floor, Opposite Laxmi Industrial Estate, Near Fun Republic, Oshiwara, New Link Rd, Andheri W, Mumbai - 400053",
    phone: "+91 9653484071",
    callsAnswered: 3,
  },
  {
    id: "1",
    name: "Andheri West",
    address: "Shree Krishna, G Wing - 104 First floor, Opposite Laxmi Industrial Estate, Near Fun Republic, Oshiwara, New Link Rd, Andheri W, Mumbai - 400053",
    phone: "+91 8097513005",
  },
  {
    id: "2",
    name: "Goregaon",
    address: "Shop No 1 & 2 , 1st Floor, Onkar Building, General Arun Kumar Vaidya Marg, opp. Oberoi Mall, Malad, Dindoshi, Goregaon, Mumbai - 400097",
    phone: "+91 8097513010",
  },
  {
    id: "3",
    name: "Parel",
    address: "Shop No. 10 & 11, Mehta Mansion, Dr Babasaheb Ambedkar Marg, near Titan Eye Plus, Lal Baug, Parel, Mumbai - 400012",
    phone: "+91 7304990176",
  },
  {
    id: "4",
    name: "Powai",
    address: "321 EntGalleria Shopping Mall, 205,A Wing, 2nd Floor, Opp To KFC, Central Ave, Hiranandani Gardens, Panchkutir Ganesh Nagar, Powai, Mumbai - 400076erprise Blvd, North District, 12345",
    phone: "+91 7304990081",
  },
  {
    id: "5",
    name: "Cuffe Parade",
    address: "Office No 01, Ground Floor, Chawla House, Plot No 60/62, Wodehouse Rd, Colaba, Mumbai - 400005",
    phone: "+91 2222174545",
  },
  {
    id: "6",
    name: "Kharghar",
    address: "Shop No. 3 & 4, Daffodil, Rekhi Sai Daffodil CHS Ltd, Plot No. 17, 18, 19, Central Park Metro Rd, Sector-19, Kharghar - 410210",
    phone: "+91 7208476736",
  },
  {
    id: "7",
    name: "Lodha Palava",
    address: "Lodha Palava, 1st Floor, PCMA Building, Near Ganesh Mandir Casa Rio, Kalyan - Shilphata Rd, Usarghar Gaon, Thane - 421204",
    phone: "+91 7777016942",
  },
]

// Chart data and options
const chartData = {
  labels: dashboardLocations.map((loc) => loc.name),
  datasets: [
    {
      label: "Calls Answered",
      data: dashboardLocations.map((loc) => loc.callsAnswered),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Calls Answered by Location",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};


export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <main className="container mx-auto px-4 lg:px-24 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Calls Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dashboardLocations.map((location) => (
            <LocationCard
              key = {location.id}
              name={location.name}
              phone={location.phone}
              address={location.address}
              // callsAnswered={location.callsAnswered}
              isSelected={selectedLocation === location.id}
              onSelect={() => setSelectedLocation(location.id)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Calls Answered by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Total Calls</h3>
                  <p className="text-3xl font-bold text-primary">9</p>
                  {/* <p className="text-3xl font-bold text-primary">
                    {dashboardLocations.reduce((sum, loc) => sum + loc.callsAnswered, 0)}
                  </p> */}
                </div>
                {/* <div>
                  <h3 className="text-lg font-semibold">Busiest Location</h3>
                  <p className="text-xl font-semibold">
                    {dashboardLocations.reduce((max, loc) => (loc.callsAnswered > max.callsAnswered ? loc : max)).name}
                  </p>
                </div> */}
                <div>
                  <h3 className="text-lg font-semibold">Average Calls per Location</h3>
                  <p className="text-3xl font-bold text-primary">1</p>
                  {/* <p className="text-xl font-semibold">
                    {(dashboardLocations.reduce((sum, loc) => sum + loc.callsAnswered, 0) / dashboardLocations.length).toFixed(2)}
                  </p> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
