"use client"

import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"


interface LocationCardProps {
  id: string
  name: string
  address: string
  phone: string
  // callsAnswered: number
  isSelected: boolean
  onSelect: () => void
}

export function LocationCard({ id, name, address, phone, isSelected, onSelect }: LocationCardProps) {
  return (
    <Card
      className={`transition-all hover:shadow-lg hover:border-primary/20 hover:bg-primary/5 cursor-pointer ${
        isSelected ? "border-primary border-2" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center justify-between">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      {/* <div className="p-4">
          <Badge variant="destructive" className="self-start mb-1">
            Low Engagement Alert
          </Badge>
      </div> */}
        <div className="text-sm text-muted-foreground mb-2">{address}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>{phone}</span>
          </div>
        </div>
        {/* <div className="mt-2 text-sm font-medium">
          Calls Answered: <span className="text-primary">{callsAnswered}</span>
        </div> */}
        {/* <div className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded-md">
              This location requires attention due to low engagement ratings
        </div> */}
      </CardContent>
      <CardFooter>
        <Link href={`/location/${name}/calls`} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
          <MapPin className="h-4 w-4" />
          View Call Records
        </Link>
      </CardFooter>
    </Card>
  )
}