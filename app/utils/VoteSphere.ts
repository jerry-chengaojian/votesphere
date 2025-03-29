import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VoteSphere
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const voteSphereAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'candidateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'CandidateAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'organizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PollCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'candidateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'VoteCast',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
    ],
    name: 'addCandidate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPoll',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'endPoll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllCandidates',
    outputs: [
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'names', internalType: 'string[]', type: 'string[]' },
      { name: 'descriptions', internalType: 'string[]', type: 'string[]' },
      { name: 'imageUrls', internalType: 'string[]', type: 'string[]' },
      { name: 'voteCounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllPolls',
    outputs: [
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'titles', internalType: 'string[]', type: 'string[]' },
      { name: 'descriptions', internalType: 'string[]', type: 'string[]' },
      { name: 'imageUrls', internalType: 'string[]', type: 'string[]' },
      { name: 'startTimes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'endTimes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'organizers', internalType: 'address[]', type: 'address[]' },
      { name: 'isActives', internalType: 'bool[]', type: 'bool[]' },
      { name: 'candidateCounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalVotes', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'candidateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCandidateDetails',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPollDetails',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'organizer', internalType: 'address', type: 'address' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
      { name: 'candidateCount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalVotes', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pollIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'getPollsByIds',
    outputs: [
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'titles', internalType: 'string[]', type: 'string[]' },
      { name: 'descriptions', internalType: 'string[]', type: 'string[]' },
      { name: 'imageUrls', internalType: 'string[]', type: 'string[]' },
      { name: 'startTimes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'endTimes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'organizers', internalType: 'address[]', type: 'address[]' },
      { name: 'isActives', internalType: 'bool[]', type: 'bool[]' },
      { name: 'candidateCounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalVotes', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'organizer', internalType: 'address', type: 'address' }],
    name: 'getPollsByOrganizer',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'voter', internalType: 'address', type: 'address' }],
    name: 'getPollsVotedByAddress',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'voter', internalType: 'address', type: 'address' },
    ],
    name: 'hasVoted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'candidateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const voteSphereAddress = {
  31337: process.env.NEXT_PUBLIC_VOTESPHERE_ADDRESS as `0x${string}`,
  11155111: process.env.NEXT_PUBLIC_VOTESPHERE_ADDRESS as `0x${string}`,
} as const

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const voteSphereConfig = {
  address: voteSphereAddress,
  abi: voteSphereAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphere = /*#__PURE__*/ createUseReadContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getAllCandidates"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetAllCandidates =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getAllCandidates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getAllPolls"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetAllPolls = /*#__PURE__*/ createUseReadContract(
  {
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getAllPolls',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getCandidateDetails"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetCandidateDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getCandidateDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollDetails"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetPollDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollsByIds"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetPollsByIds =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollsByIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollsByOrganizer"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetPollsByOrganizer =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollsByOrganizer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollsVotedByAddress"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereGetPollsVotedByAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollsVotedByAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"hasVoted"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useReadVoteSphereHasVoted = /*#__PURE__*/ createUseReadContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
  functionName: 'hasVoted',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWriteVoteSphere = /*#__PURE__*/ createUseWriteContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"addCandidate"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWriteVoteSphereAddCandidate =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'addCandidate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"createPoll"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWriteVoteSphereCreatePoll =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'createPoll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"endPoll"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWriteVoteSphereEndPoll = /*#__PURE__*/ createUseWriteContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
  functionName: 'endPoll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"vote"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWriteVoteSphereVote = /*#__PURE__*/ createUseWriteContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useSimulateVoteSphere = /*#__PURE__*/ createUseSimulateContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"addCandidate"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useSimulateVoteSphereAddCandidate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'addCandidate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"createPoll"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useSimulateVoteSphereCreatePoll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'createPoll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"endPoll"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useSimulateVoteSphereEndPoll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'endPoll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"vote"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useSimulateVoteSphereVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWatchVoteSphereEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"CandidateAdded"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWatchVoteSphereCandidateAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'CandidateAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"PollCreated"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWatchVoteSpherePollCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'PollCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"VoteCast"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010)
 */
export const useWatchVoteSphereVoteCastEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'VoteCast',
  })
