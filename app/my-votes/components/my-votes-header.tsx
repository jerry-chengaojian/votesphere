"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function MyVotesHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">My Voting Activity</h1>
        <p className="text-gray-500 mt-1">Manage your votes and proposals</p>
      </div>
      <div className="flex space-x-4">
        <Link href="/create">
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Vote
          </Button>
        </Link>
      </div>
    </div>
  )
} 