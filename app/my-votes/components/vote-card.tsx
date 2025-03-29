import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vote, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface VoteCardProps {
  id: string
  title: string
  description: string
  status: "in_progress" | "coming_soon" | "ended"
  votes: number
  proposals: number
  timeRemaining: string
  imageUrl: string
}

export function VoteCard({
  id,
  title,
  description,
  status,
  votes,
  proposals,
  timeRemaining,
  imageUrl,
}: VoteCardProps) {
  const statusColors = {
    in_progress: "bg-green-500",
    coming_soon: "bg-yellow-500",
    ended: "bg-gray-500",
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="flex">
        <div className="relative w-32 h-32">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-500 text-sm mt-1">{description}</p>
            </div>
            <Badge className={`${statusColors[status]} text-white rounded-full px-3 py-1 text-xs font-medium`}>
              {status.replace("_", " ")}
            </Badge>
          </div>

          <div className="flex items-center mt-4 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <Vote className="mr-1 h-5 w-5 text-blue-500" />
              <span>{votes} votes</span>
            </div>
            <div className="flex items-center mr-4">
              <Users className="mr-1 h-5 w-5 text-green-500" />
              <span>{proposals} proposals</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4 text-yellow-500" />
              <span>{timeRemaining}</span>
            </div>
          </div>

          <div className="flex mt-4 space-x-3">
            <Link href={`/votes/${id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 