// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Election {
    address public admin; // Election Commission

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event VotedEvent(uint indexed candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "You have already voted");
        _;
    }

    constructor () {
        admin = msg.sender;
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function registerVoter() public {
        require(!voters[msg.sender], "You are already registered");
        voters[msg.sender] = true;
    }

    function vote(uint _candidateId) public hasNotVoted {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;
        emit VotedEvent(_candidateId);
    }

    function getCandidateCount() public view returns (uint) {
        return candidatesCount;
    }

    function getCandidate(uint _candidateId) public view returns (uint, string memory, uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate storage candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function getVotesForCandidate(uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }

    function findWinner() public view returns (uint, string memory, uint) {
        uint winnerId;
        uint maxVotes = 0;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = i;
            }
        }

        return (candidates[winnerId].id, candidates[winnerId].name, candidates[winnerId].voteCount);
    }
}
