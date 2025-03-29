//SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
import '@openzeppelin/contracts/utils/Counters.sol';

contract VoteSphere {
  using Counters for Counters.Counter;
  Counters.Counter private _totalPolls;
  Counters.Counter private _totalContestants;

  struct Poll {
    uint256 id;
    string imageUrl;
    string title;
    string description;
    uint256 voteCount;
    uint256 contestantCount;
    bool isDeleted;
    address organizer;
    uint256 startTime;
    uint256 endTime;
    uint256 timestamp;
    address[] voters;
    string[] contestantAvatars;
  }

  struct Contestant {
    uint256 id;
    string imageUrl;
    string name;
    string description;
    address contestant;
    uint256 voteCount;
    address[] voters;
  }

  mapping(uint256 => bool) private _pollExists;
  mapping(uint256 => Poll) private _polls;
  mapping(uint256 => mapping(address => bool)) private _hasVoted;
  mapping(uint256 => mapping(address => bool)) private _hasContested;
  mapping(uint256 => mapping(uint256 => Contestant)) private _contestants;

  event PollCreated(uint256 indexed pollId, address indexed organizer, uint256 timestamp);
  event PollModified(uint256 indexed pollId, address indexed organizer, uint256 timestamp);
  event PollRemoved(uint256 indexed pollId, address indexed organizer, uint256 timestamp);
  event PollVoted(address indexed voter, uint256 timestamp);
  event ContestantRegistered(uint256 indexed pollId, uint256 indexed contestantId, address indexed contestant, uint256 timestamp);

  function createPoll(
    string memory imageUrl,
    string memory title,
    string memory description,
    uint256 startTime,
    uint256 endTime
  ) public {
    require(bytes(title).length > 0, 'Title cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(imageUrl).length > 0, 'Image URL cannot be empty');
    require(startTime > 0, 'Start date must be greater than 0');
    require(endTime > startTime, 'End date must be greater than start date');

    _totalPolls.increment();

    Poll memory poll;
    poll.id = _totalPolls.current();
    poll.title = title;
    poll.description = description;
    poll.imageUrl = imageUrl;
    poll.startTime = startTime;
    poll.endTime = endTime;
    poll.organizer = msg.sender;
    poll.timestamp = getCurrentTimestamp();

    _polls[poll.id] = poll;
    _pollExists[poll.id] = true;
    
    emit PollCreated(poll.id, msg.sender, getCurrentTimestamp());
  }

  function modifyPoll(
    uint256 id,
    string memory imageUrl,
    string memory title,
    string memory description,
    uint256 startTime,
    uint256 endTime
  ) public {
    require(_pollExists[id], 'Poll not found');
    require(_polls[id].organizer == msg.sender, 'Unauthorized entity');
    require(bytes(title).length > 0, 'Title cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(imageUrl).length > 0, 'Image URL cannot be empty');
    require(!_polls[id].isDeleted, 'Polling already deleted');
    require(_polls[id].voteCount < 1, 'Poll has votes already');
    require(endTime > startTime, 'End date must be greater than start date');

    _polls[id].title = title;
    _polls[id].description = description;
    _polls[id].startTime = startTime;
    _polls[id].endTime = endTime;
    _polls[id].imageUrl = imageUrl;
    
    emit PollModified(id, msg.sender, getCurrentTimestamp());
  }

  function removePoll(uint256 id) public {
    require(_pollExists[id], 'Poll not found');
    require(_polls[id].organizer == msg.sender, 'Unauthorized entity');
    require(_polls[id].voteCount < 1, 'Poll has votes already');
    _polls[id].isDeleted = true;
    
    emit PollRemoved(id, msg.sender, getCurrentTimestamp());
  }

  function getPollById(uint256 id) public view returns (Poll memory) {
    return _polls[id];
  }

  function getAllActivePolls() public view returns (Poll[] memory Polls) {
    uint256 available;
    for (uint256 i = 1; i <= _totalPolls.current(); i++) {
        if(!_polls[i].isDeleted) available++;
    }

    Polls = new Poll[](available);
    uint256 index;

    for (uint256 i = 1; i <= _totalPolls.current(); i++) {
        if(!_polls[i].isDeleted) {
            Polls[index++] = _polls[i];
        }
    }
  }

  function registerAsContestant(uint256 id, string memory name, string memory imageUrl, string memory description) public {
    require(_pollExists[id], 'Poll not found');
    require(bytes(name).length > 0, 'name cannot be empty');
    require(bytes(imageUrl).length > 0, 'image cannot be empty');
    require(bytes(description).length > 0, 'description cannot be empty');
    require(_polls[id].voteCount < 1, 'Poll has votes already');
    require(!_hasContested[id][msg.sender], 'Already contested');

    _totalContestants.increment();

    Contestant memory contestant;
    contestant.name = name;
    contestant.imageUrl = imageUrl;
    contestant.description = description;
    contestant.contestant = msg.sender;
    contestant.id = _totalContestants.current();

    _contestants[id][contestant.id] = contestant;
    _hasContested[id][msg.sender] = true;
    _polls[id].contestantAvatars.push(imageUrl);
    _polls[id].contestantCount++;
    
    emit ContestantRegistered(id, contestant.id, msg.sender, getCurrentTimestamp());
  }

  function getContestantById(uint256 id, uint256 cid) public view returns (Contestant memory) {
    return _contestants[id][cid];
  }

  function getPollContestants(uint256 id) public view returns (Contestant[] memory Contestants) {
    uint256 available;
    for (uint256 i = 1; i <= _totalContestants.current(); i++) {
        if(_contestants[id][i].id == i) available++;
    }

    Contestants = new Contestant[](available);
    uint256 index;

    for (uint256 i = 1; i <= _totalContestants.current(); i++) {
        if(_contestants[id][i].id == i) {
            Contestants[index++] = _contestants[id][i];
        }
    }
  }

  function castVote(uint256 id, uint256 cid) public {
    require(_pollExists[id], 'Poll not found');
    require(!_hasVoted[id][msg.sender], 'Already voted');
    require(!_polls[id].isDeleted, 'Polling not available');
    require(_polls[id].contestantCount > 1, 'Not enough contestants');
    require(
      getCurrentTimestamp() >= _polls[id].startTime && getCurrentTimestamp() < _polls[id].endTime,
      'Voting must be in session'
    );

    _polls[id].voteCount++;
    _polls[id].voters.push(msg.sender);

    _contestants[id][cid].voteCount++;
    _contestants[id][cid].voters.push(msg.sender);
    _hasVoted[id][msg.sender] = true;

    emit PollVoted(msg.sender, getCurrentTimestamp());
  }

  function getCurrentTimestamp() internal view returns (uint256) {
    return (block.timestamp * 1000) + 1000;
  }
}