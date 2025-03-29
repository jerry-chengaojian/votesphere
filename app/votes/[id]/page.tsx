'use client'

import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { useReadVoteSphereGetPollDetails, useReadVoteSphereGetAllCandidates } from '@/app/utils/VoteSphere'
import { useParams, useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useWriteVoteSphereVote, useReadVoteSphereHasVoted } from '@/app/utils/VoteSphere'
import { useNotification } from '@/components/ui/notification-provider'
import { usePublicClient } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'

export default function VoteDetail() {
  const router = useRouter()
  const params = useParams()
  const pollId = typeof params.id === 'string' && !isNaN(Number(params.id)) ? BigInt(params.id) : BigInt(0)
  const { address } = useAccount()
  const { showNotification } = useNotification()
  const { writeContractAsync: vote } = useWriteVoteSphereVote()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()

  // Fetch poll details
  const { data: pollDetails, isLoading: isPollLoading, error: pollError, queryKey } = useReadVoteSphereGetPollDetails({
    args: [pollId],
  })

  // Fetch candidates
  const { data: candidatesData, isLoading: isCandidatesLoading, error: candidatesError, queryKey: candidatesQueryKey } = useReadVoteSphereGetAllCandidates({
    args: [pollId],
  })

  // Check if user has voted
  const { data: hasVoted, isLoading: isCheckingVote, queryKey: hasVotedQueryKey } = useReadVoteSphereHasVoted({
    args: [pollId, address!],
    account: address
  })

  if (isPollLoading || isCandidatesLoading) return <div>Loading...</div>
  if (pollError || candidatesError) return <div>Error loading vote details</div>
  if (!pollDetails || !candidatesData) return <div>No data found</div>

  const [
    pollId_,
    title,
    description,
    imageUrl,
    startTime,
    endTime,
    organizer,
    isActive,
    candidateCount,
    totalVotes
  ] = pollDetails

  const [
    candidateIds,
    candidateNames,
    candidateDescriptions,
    candidateImageUrls,
    candidateVoteCounts
  ] = candidatesData

  // Calculate time remaining
  const now = BigInt(Math.floor(Date.now() / 1000))
  const startTimeBigInt = BigInt(startTime)
  const endTimeBigInt = BigInt(endTime)
  const timeRemaining = endTimeBigInt - now
  const daysRemaining = Number(timeRemaining / BigInt(86400))
  const hoursRemaining = Number((timeRemaining % BigInt(86400)) / BigInt(3600))

  // Calculate status
  const getStatus = () => {
    if (isActive.toString().toLowerCase() === "false") return { text: "Completed", className: "bg-gray-500" }
    if (now < startTimeBigInt) return { text: "Coming Soon", className: "bg-yellow-500" }
    if (now >= startTimeBigInt && now <= endTimeBigInt) return { text: "In Progress", className: "bg-green-500" }
    return { text: "Ended", className: "bg-blue-500" }
  }

  const status = getStatus()

  // Calculate vote percentages
  const calculatePercentage = (votes: bigint) => {
    console.log('totalVotes:', totalVotes) // Debug log
    if (totalVotes === undefined || totalVotes === null) return 0
    try {
      const totalVotesBigInt = BigInt(totalVotes)
      return totalVotesBigInt === BigInt(0) ? 0 : Number((votes * BigInt(100)) / totalVotesBigInt)
    } catch (error) {
      console.error('Error converting totalVotes:', error)
      return 0
    }
  }

  const handleVote = async (candidateId: bigint) => {
    if (!publicClient) {
      showNotification({
        title: "Error",
        description: "Wallet connection not initialized",
        variant: "error"
      })
      return
    }

    try {
      // Send transaction
      const hash = await vote({
        args: [pollId, candidateId]
      })

      // Show waiting notification
      showNotification({
        title: "Transaction Submitted",
        description: "Please wait while your transaction is being confirmed...",
        variant: "info"
      })

      // Wait for confirmation
      await publicClient.waitForTransactionReceipt({ hash })
      
      showNotification({
        title: "Vote Submitted",
        description: "Your vote has been recorded successfully.",
        variant: "success"
      })
      // Invalidate query
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: candidatesQueryKey })
      queryClient.invalidateQueries({ queryKey: hasVotedQueryKey })
    } catch (error: any) {
      let errorTitle = "Failed to submit vote"
      let errorDescription = "There was an error submitting your vote. Please try again."
      
      if (error?.message?.includes('rejected')) {
        errorTitle = "Transaction Rejected"
        errorDescription = "You rejected the transaction in your wallet."
      } else if (error?.message?.includes('insufficient funds')) {
        errorTitle = "Insufficient Funds"
        errorDescription = "You don't have enough funds to complete this transaction."
      }

      showNotification({
        title: errorTitle,
        description: errorDescription,
        variant: "error"
      })
      console.error('Voting error:', error)
    }
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Vote Cover Image */}
        <div className="h-64 bg-cover bg-center relative rounded-xl mb-8">
          <img
            src={imageUrl}
            alt="Vote cover"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 rounded-xl" />
          <div className="absolute bottom-6 left-8 right-8 text-white">
            <div className={`px-3 py-1 ${status.className} text-white rounded-full text-xs font-medium inline-block mb-2`}>
              {status.text}
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {timeRemaining > 0 && isActive && (
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{daysRemaining} days {hoursRemaining} hours remaining</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex-1">
            {/* Vote Information */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium text-gray-800 text-lg">Organizer</div>
                    <div className="text-sm text-gray-500">{organizer}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    Start from {new Date(Number(startTime) * 1000).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">About this Vote</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>

            {/* Candidate List */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Proposals</h3>
              <div className="space-y-5">
                {candidateIds.map((candidateId, index) => (
                  <div key={candidateId.toString()} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-start">
                      <img
                        src={candidateImageUrls[index]}
                        alt={candidateNames[index]}
                        className="w-16 h-16 rounded-lg mr-4 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg text-gray-800">{candidateNames[index]}</h4>
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-1">🗳️</span>
                            <span className="text-sm font-medium text-gray-600">
                              {candidateVoteCounts[index].toString()} votes
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{candidateDescriptions[index]}</p>
                        {isActive.toString().toLowerCase() === "true" && now >= startTimeBigInt && now <= endTimeBigInt && (
                          <button
                            onClick={() => handleVote(candidateId)}
                            disabled={isCheckingVote}
                            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition
                              ${hasVoted 
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                              } text-white`}
                          >
                            {hasVoted ? 'Already Voted' : 'Vote for this'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vote Statistics */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Vote Statistics</h3>
              <div className="space-y-3">
                {candidateIds.map((candidateId, index) => {
                  const percentage = calculatePercentage(candidateVoteCounts[index])
                  return (
                    <div key={candidateId.toString()}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">{candidateNames[index]}</span>
                        <span className="text-sm font-medium text-gray-800">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                Total votes: {totalVotes.toString()}
              </div>
            </div>

            {/* Submit Button - Only show if poll is active and not started yet */}
            {isActive.toString().toLowerCase() === "true" && now < startTimeBigInt && (
              <Link
                href={`/votes/${pollId}/submit-proposal`}
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl text-center font-medium transition mb-6"
              >
                Submit My Proposal
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}