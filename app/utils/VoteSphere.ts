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
 * - 
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
        name: 'contestantId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'contestant',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ContestantRegistered',
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
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
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
        name: 'organizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PollModified',
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
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PollRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PollVoted',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'cid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPoll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllActivePolls',
    outputs: [
      {
        name: 'Polls',
        internalType: 'struct VoteSphere.Poll[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
          { name: 'contestantCount', internalType: 'uint256', type: 'uint256' },
          { name: 'isDeleted', internalType: 'bool', type: 'bool' },
          { name: 'organizer', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'voters', internalType: 'address[]', type: 'address[]' },
          {
            name: 'contestantAvatars',
            internalType: 'string[]',
            type: 'string[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'cid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getContestantById',
    outputs: [
      {
        name: '',
        internalType: 'struct VoteSphere.Contestant',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'contestant', internalType: 'address', type: 'address' },
          { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
          { name: 'voters', internalType: 'address[]', type: 'address[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getPollById',
    outputs: [
      {
        name: '',
        internalType: 'struct VoteSphere.Poll',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
          { name: 'contestantCount', internalType: 'uint256', type: 'uint256' },
          { name: 'isDeleted', internalType: 'bool', type: 'bool' },
          { name: 'organizer', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'voters', internalType: 'address[]', type: 'address[]' },
          {
            name: 'contestantAvatars',
            internalType: 'string[]',
            type: 'string[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getPollContestants',
    outputs: [
      {
        name: 'Contestants',
        internalType: 'struct VoteSphere.Contestant[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'contestant', internalType: 'address', type: 'address' },
          { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
          { name: 'voters', internalType: 'address[]', type: 'address[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'modifyPoll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'registerAsContestant',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'removePoll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * -
 * - 
 */
export const voteSphereAddress = {
  31337: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  11155111: '0x112234455C3a32FD11230C42E7Bccd4A84e02010',
} as const

/**
 * -
 * - 
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
 * - 
 */
export const useReadVoteSphere = /*#__PURE__*/ createUseReadContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getAllActivePolls"`
 *
 * -
 * - 
 */
export const useReadVoteSphereGetAllActivePolls =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getAllActivePolls',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getContestantById"`
 *
 * -
 * - 
 */
export const useReadVoteSphereGetContestantById =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getContestantById',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollById"`
 *
 * -
 * - 
 */
export const useReadVoteSphereGetPollById = /*#__PURE__*/ createUseReadContract(
  {
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollById',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"getPollContestants"`
 *
 * -
 * - 
 */
export const useReadVoteSphereGetPollContestants =
  /*#__PURE__*/ createUseReadContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'getPollContestants',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - 
 */
export const useWriteVoteSphere = /*#__PURE__*/ createUseWriteContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"castVote"`
 *
 * -
 * - 
 */
export const useWriteVoteSphereCastVote = /*#__PURE__*/ createUseWriteContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
  functionName: 'castVote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"createPoll"`
 *
 * -
 * - 
 */
export const useWriteVoteSphereCreatePoll =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'createPoll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"modifyPoll"`
 *
 * -
 * - 
 */
export const useWriteVoteSphereModifyPoll =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'modifyPoll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"registerAsContestant"`
 *
 * -
 * - 
 */
export const useWriteVoteSphereRegisterAsContestant =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'registerAsContestant',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"removePoll"`
 *
 * -
 * - 
 */
export const useWriteVoteSphereRemovePoll =
  /*#__PURE__*/ createUseWriteContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'removePoll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - 
 */
export const useSimulateVoteSphere = /*#__PURE__*/ createUseSimulateContract({
  abi: voteSphereAbi,
  address: voteSphereAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"castVote"`
 *
 * -
 * - 
 */
export const useSimulateVoteSphereCastVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'castVote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"createPoll"`
 *
 * -
 * - 
 */
export const useSimulateVoteSphereCreatePoll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'createPoll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"modifyPoll"`
 *
 * -
 * - 
 */
export const useSimulateVoteSphereModifyPoll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'modifyPoll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"registerAsContestant"`
 *
 * -
 * - 
 */
export const useSimulateVoteSphereRegisterAsContestant =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'registerAsContestant',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link voteSphereAbi}__ and `functionName` set to `"removePoll"`
 *
 * -
 * - 
 */
export const useSimulateVoteSphereRemovePoll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    functionName: 'removePoll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__
 *
 * -
 * - 
 */
export const useWatchVoteSphereEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"ContestantRegistered"`
 *
 * -
 * - 
 */
export const useWatchVoteSphereContestantRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'ContestantRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"PollCreated"`
 *
 * -
 * - 
 */
export const useWatchVoteSpherePollCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'PollCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"PollModified"`
 *
 * -
 * - 
 */
export const useWatchVoteSpherePollModifiedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'PollModified',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"PollRemoved"`
 *
 * -
 * - 
 */
export const useWatchVoteSpherePollRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'PollRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link voteSphereAbi}__ and `eventName` set to `"PollVoted"`
 *
 * -
 * - 
 */
export const useWatchVoteSpherePollVotedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: voteSphereAbi,
    address: voteSphereAddress,
    eventName: 'PollVoted',
  })
