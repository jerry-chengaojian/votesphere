"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoteCard } from "./vote-card"
import { useAccount } from "wagmi"
import { useReadVoteSphereGetPollsByIds, useReadVoteSphereGetPollsByOrganizer, useReadVoteSphereGetPollsVotedByAddress } from "@/app/utils/VoteSphere"
import { Alert, AlertDescription } from "@/components/ui/alert"

type PollsData = {
  ids: bigint[];
  titles: string[];
  descriptions: string[];
  imageUrls: string[];
  startTimes: bigint[];
  endTimes: bigint[];
  organizers: `0x${string}`[];
  isActives: boolean[];
  candidateCounts: bigint[];
  totalVotes: bigint[];
}

export function MyVotesContent() {
  const { address } = useAccount()

  // Fetch polls created by user
  const { data: createdPollIds, isLoading: isLoadingCreated } = useReadVoteSphereGetPollsByOrganizer({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Fetch polls voted by user
  const { data: votedPollIds, isLoading: isLoadingVoted } = useReadVoteSphereGetPollsVotedByAddress({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Fetch details for created polls
  const { data: createdPolls, isLoading: isLoadingCreatedDetails } = useReadVoteSphereGetPollsByIds({
    args: createdPollIds ? [createdPollIds] : undefined,
    query: {
      enabled: !!createdPollIds?.length,
    },
  })

  // Fetch details for voted polls
  const { data: votedPolls, isLoading: isLoadingVotedDetails } = useReadVoteSphereGetPollsByIds({
    args: votedPollIds ? [votedPollIds] : undefined,
    query: {
      enabled: !!votedPollIds?.length,
    },
  })

  const isLoading = isLoadingCreated || isLoadingVoted || isLoadingCreatedDetails || isLoadingVotedDetails

  const formatPollsData = (data: any): PollsData | undefined => {
    if (!data) return undefined;
    return {
      ids: data[0],
      titles: data[1],
      descriptions: data[2],
      imageUrls: data[3],
      startTimes: data[4],
      endTimes: data[5],
      organizers: data[6],
      isActives: data[7],
      candidateCounts: data[8],
      totalVotes: data[9]
    } as PollsData;
  }

  const createdPollsData = formatPollsData(createdPolls);
  const votedPollsData = formatPollsData(votedPolls);

  const getStatusBadge = (startTime: bigint, endTime: bigint, isActive: boolean): "coming_soon" | "ended" | "in_progress" => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    
    if (now < startTime) return "coming_soon";
    if (now > endTime || !isActive) return "ended";
    return "in_progress";
  };

  if (!address) {
    return (
      <Alert>
        <AlertDescription>Please connect your wallet to view your votes.</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const renderPolls = (polls: PollsData | undefined) => {
    if (!polls || !polls.ids.length) {
      return <div className="text-gray-500">No votes found</div>
    }

    return (
      <div className="space-y-4">
        {polls.ids.map((id, index) => {
          const now = BigInt(Math.floor(Date.now() / 1000))
          const startTime = polls.startTimes[index]
          const endTime = polls.endTimes[index]
          const isActive = polls.isActives[index]

          const status = getStatusBadge(startTime, endTime, isActive)

          const timeRemaining = !isActive 
            ? "Completed"
            : now < startTime
              ? `Starts in ${Math.ceil(Number(startTime - now) / 86400)} days`
              : now > endTime
                ? "Ended"
                : `Ends in ${Math.ceil(Number(endTime - now) / 86400)} days`

          return (
            <VoteCard
              key={id.toString()}
              id={id.toString()}
              title={polls.titles[index]}
              description={polls.descriptions[index]}
              status={status}
              votes={Number(polls.totalVotes[index])}
              proposals={Number(polls.candidateCounts[index])}
              timeRemaining={timeRemaining}
              imageUrl={polls.imageUrls[index]}
            />
          )
        })}
      </div>
    )
  }

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
            className="px-6 py-4 font-medium data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Voted In
          </TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500">
              Showing {createdPollsData?.ids.length || 0} votes
            </div>
          </div>
          {renderPolls(createdPollsData)}
        </TabsContent>

        <TabsContent value="voted" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500">
              Showing {votedPollsData?.ids.length || 0} votes
            </div>
          </div>
          {renderPolls(votedPollsData)}
        </TabsContent>
      </Tabs>
    </div>
  )
} 