const Election = artifacts.require("Election");

contract("Election", function(accounts) {
  let electionInstance;

  beforeEach(async () => {
    electionInstance = await Election.new({ from: accounts[0] });
  });

  it("initializes with two candidates", async () => {
    const count = await electionInstance.getCandidateCount();
    assert.equal(count, 2);
  });

  it("initializes the candidates with the correct values", async () => {
    const candidate1 = await electionInstance.getCandidate(1);

    console.log("Candidate 1:", candidate1);

    assert.exists(candidate1, "candidate 1 should exist");
    assert.equal(candidate1[0], 1, "contains the correct id");
    assert.equal(candidate1[1], "Candidate 1", "contains the correct name");
    assert.equal(candidate1[2], 0, "contains the correct votes count");

    const candidate2 = await electionInstance.getCandidate(2);

    console.log("Candidate 2:", candidate2);

    assert.exists(candidate2, "candidate 2 should exist");
    assert.equal(candidate2[0], 2, "contains the correct id");
    assert.equal(candidate2[1], "Candidate 2", "contains the correct name");
    assert.equal(candidate2[2], 0, "contains the correct votes count");
  });

  it("allows a voter to cast a vote", async () => {
    const candidateId = 1;
    const voterAddress = accounts[1];
  
    // Get the initial vote count before voting
    const initialVoteCount = (await electionInstance.getCandidate(candidateId))[2].toNumber();
    console.log("Initial Vote Count:", initialVoteCount);
  
    // Vote for the candidate
    const receipt = await electionInstance.vote(candidateId, { from: voterAddress });
  
    // Wait for the transaction to be mined
    await web3.eth.getTransactionReceipt(receipt.tx);
  
    // Check if the VotedEvent was emitted with the correct candidateId
    console.log("VotedEvent Logs:", receipt.logs);
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(receipt.logs[0].event, "VotedEvent", "the event type is correct");
    assert.equal(receipt.logs[0].args.candidateId, candidateId, "the candidate id is correct");
  
    // Check if the voter was marked as voted
    const voted = await electionInstance.voters(voterAddress);
    console.log("Voter Marked as Voted:", voted);
    assert(voted, "the voter was marked as voted");
  
    // Get the updated vote count after voting
    const updatedVoteCount = (await electionInstance.getCandidate(candidateId))[2].toNumber();
    console.log("Updated Vote Count:", updatedVoteCount);
  
    // Check if the candidate's vote count has been incremented
    assert.equal(updatedVoteCount, initialVoteCount + 1, "increments the candidate's vote count");
  });
  

  it("throws an exception for invalid candidates", async () => {
    try {
      await electionInstance.vote(99, { from: accounts[2] });
      assert.fail("Expected an exception");
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
  
      const candidate1 = await electionInstance.getCandidate(1);
      console.log("Candidate 1:", candidate1);
      assert(candidate1, "candidate 1 should exist");
      assert.equal(candidate1[2].toNumber(), 0, "candidate 1 did not receive any votes");
  
      const candidate2 = await electionInstance.getCandidate(2);
      console.log("Candidate 2:", candidate2);
      assert(candidate2, "candidate 2 should exist");
      assert.equal(candidate2[2].toNumber(), 0, "candidate 2 did not receive any votes");
    }
  });
  
  it("throws an exception for double voting", async () => {
    const candidateId = 2;
    await electionInstance.vote(candidateId, { from: accounts[3] });
  
    const candidate = await electionInstance.getCandidate(candidateId);
    console.log("Candidate after first vote:", candidate);
    assert.equal(candidate[2].toNumber(), 1, "accepts first vote");
  
    try {
      await electionInstance.vote(candidateId, { from: accounts[3] });
      assert.fail("Expected an exception");
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
  
      const candidate1 = await electionInstance.getCandidate(1);
      console.log("Candidate 1 after double voting:", candidate1);
      assert.equal(candidate1[2].toNumber(), 0, "candidate 1 did not receive any votes");
  
      const candidate2 = await electionInstance.getCandidate(2);
      console.log("Candidate 2 after double voting:", candidate2);
      assert.equal(candidate2[2].toNumber(), 1, "candidate 2 did not receive any votes");
    }
  });
});
