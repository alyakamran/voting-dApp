const Election = artifacts.require("Election");

contract("Election", function(accounts) {
  let electionInstance;

  beforeEach(async () => {
    electionInstance = await Election.new({ from: accounts[0] }); // Use `new` to deploy a new instance
  });

  it("initializes with two candidates", async () => {
    const count = await electionInstance.getCandidateCount();
    assert.equal(count, 2);
  });

  it("initializes the candidates with the correct values", async () => {
    const candidate1 = await electionInstance.getCandidate(1);
    assert.equal(candidate1.id.toNumber(), 1, "contains the correct id");
    assert.equal(candidate1.name, "Candidate 1", "contains the correct name");
    assert.equal(candidate1.voteCount.toNumber(), 0, "contains the correct votes count");

    const candidate2 = await electionInstance.getCandidate(2);
    assert.equal(candidate2.id.toNumber(), 2, "contains the correct id");
    assert.equal(candidate2.name, "Candidate 2", "contains the correct name");
    assert.equal(candidate2.voteCount.toNumber(), 0, "contains the correct votes count");
  });

  it("allows a voter to cast a vote", async () => {
    const candidateId = 1;
    const receipt = await electionInstance.vote(candidateId, { from: accounts[1] });
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(receipt.logs[0].event, "VotedEvent", "the event type is correct");
    assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");

    const voted = await electionInstance.voters(accounts[1]);
    assert(voted, "the voter was marked as voted");

    const candidate = await electionInstance.getCandidate(candidateId);
    assert.equal(candidate.voteCount.toNumber(), 1, "increments the candidate's vote count");
  });

  it("throws an exception for invalid candidates", async () => {
    try {
      await electionInstance.vote(99, { from: accounts[2] });
      assert.fail("Expected an exception");
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");

      const candidate1 = await electionInstance.getCandidate(1);
      assert.equal(candidate1.voteCount.toNumber(), 1, "candidate 1 did not receive any votes");

      const candidate2 = await electionInstance.getCandidate(2);
      assert.equal(candidate2.voteCount.toNumber(), 0, "candidate 2 did not receive any votes");
    }
  });

  it("throws an exception for double voting", async () => {
    const candidateId = 2;
    await electionInstance.vote(candidateId, { from: accounts[3] });

    const candidate = await electionInstance.getCandidate(candidateId);
    assert.equal(candidate.voteCount.toNumber(), 1, "accepts first vote");

    try {
      await electionInstance.vote(candidateId, { from: accounts[3] });
      assert.fail("Expected an exception");
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");

      const candidate1 = await electionInstance.getCandidate(1);
      assert.equal(candidate1.voteCount.toNumber(), 1, "candidate 1 did not receive any votes");

      const candidate2 = await electionInstance.getCandidate(2);
      assert.equal(candidate2.voteCount.toNumber(), 1, "candidate 2 did not receive any votes");
    }
  });
});
