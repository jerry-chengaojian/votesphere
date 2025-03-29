"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoteCard } from "./vote-card"

export function MyVotesContent() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Tabs defaultValue="created">
        <TabsList className="border-b flex">
          <TabsTrigger 
            value="created" 
            className="px-6 py-4 font-medium data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Created by Me
          </TabsTrigger>
          <TabsTrigger 
            value="voted"
            className="px-6 py-4 font-medium text-gray-500 hover:text-gray-800"
          >
            Voted In
          </TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500">Showing 2 votes</div>
          </div>

          <div className="space-y-4">
            <VoteCard
              id="1"
              title="Best Governance Proposal"
              description="Vote for the best community governance proposal this month."
              status="in_progress"
              votes={24}
              proposals={3}
              timeRemaining="Ends in 2 days"
              imageUrl="/images/governance.jpg"
            />
            <VoteCard
              id="2"
              title="Community Fund Allocation"
              description="Decide how to allocate this quarter's community fund."
              status="coming_soon"
              votes={0}
              proposals={0}
              timeRemaining="Starts in 3 days"
              imageUrl="/images/fund.jpg"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 