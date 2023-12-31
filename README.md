<h2> CSCI 4312 Blockchain & Application </h2>

**Group Project**
<pre>

ALYA AQILAH BINTI AHMAD KAMRAN 2011192<br>
ALYA HUSNA BINTI IBRAHIM 2019748
</pre>
 
*Lecturer Dato' Prof. Dr. NORBIK BASHAH BIN IDRIS*

## voting-dApp

### Introduction and Objectives

The election and voting system is a basis of democratic processes, spanning various scenarios from local student societies' elections to the national general elections for citizens of democratic nations. Despite the prevalence of these systems, they are not immune to faults or corruptions, raising concerns about the integrity and transparency of the electoral process. Issues such as voter fraud, manipulation, and data tampering have been reported, highlighting the need for immediate solutions. In response to these challenges, a blockchain-based voting decentralized application (dApp) is introduced as a potential solution. Leveraging the inherent security features of blockchain technology, this voting dApp aims to enhance the transparency, security, and tamper-resistance of the election process. By decentralizing the voting infrastructure, it reduces the risk of centralized control and manipulation, ensuring a more trustworthy and democratic electoral experience for all participants.

### dApp Architecture
![CSCI 4312_ Use Case DIagram drawio](https://github.com/alyakamran/voting-dApp/assets/121216138/a49a92a7-15f7-4dd7-b317-f2cbe4af6625)

The use case diagram for the voting dApp outlines the key features and functionalities for two primary actors: the Admin and the Voter. The Voter, representing the individual participating in the election, is able to register, choosing a candidate to vote for, and the system will verify if the voter has already cast their vote. On the other hand, the Admin is responsible for overseeing the election process, has the authority to add candidates for voters to choose from. Additionally, the Admin can perform crucial functions such as tallying votes and determining the winner of the election. This use case diagram visually captures the essential interactions between the users (Admin and Voter) and the system, ensuring a clear and comprehensive representation of the voting dApp's functionalities.

### Smart Contract
**1. Election Contract Structure**

- **admin:** Stores the Ethereum address of the election commission (admin) who has special privileges.
- **Candidate:** A struct representing a candidate with an ID, name, and vote count.
- **voters:** A mapping to keep track of whether an address has voted or not.
- **candidates:** A mapping to store information about each candidate.
- **candidatesCount:** A counter to keep track of the number of candidates.
- **VotedEvent:** An event that is emitted when a voter casts a vote.

**2. Modifiers**

- **onlyAdmin:** A modifier that restricts the execution of a function to the admin only.
- **hasNotVoted:** A modifier that ensures a person has not voted before allowing them to execute a function.

**3. Constructor**

- Initializes the contract by setting the deployer's address as the admin and adds two initial candidates.

**4. addCandidate**

- **Access:** Admin only (onlyAdmin modifier).
- **Purpose:** Allows the admin to add a new candidate to the election.
- **Parameters:** _name - Name of the candidate.
- **Action:** Increments candidatesCount and adds a new candidate with the provided name and zero votes.

**5. registerVoter**

- **Access:** Public.
- **Purpose:** Allows any Ethereum address to register as a voter.
- **Action:** Checks if the sender has not voted before and registers the sender as a voter.

**6. vote**

- **Access:** Public.
- **Purpose:** Allows a registered voter to cast a vote for a candidate.
- **Parameters:** _candidateId - ID of the candidate the voter is voting for.
- **Action:** Checks if the candidate ID is valid and the voter has not voted before. Increments the vote count for the chosen candidate and marks the sender as having voted.

**7. getCandidateCount**

- **Access:** Public.
- **Purpose:** Retrieves the total number of candidates.
- **Returns:** The number of candidates.

**8. getCandidate**

- **Access:** Public view.
- **Purpose:** Retrieves information about a specific candidate.
- **Parameters:** _candidateId - ID of the candidate.
- **Returns:** Tuple containing candidate ID, name, and vote count.

**9. getVotesForCandidate**

- **Access:** Public view.
- **Purpose:** Retrieves the total votes received by a specific candidate.
- **Parameters:** _candidateId - ID of the candidate.
- **Returns:** The vote count for the specified candidate.

**10. findWinner**

- **Access:** Public view.
- **Purpose:** Finds the candidate with the highest number of votes (the winner).
- **Returns:** Tuple containing the winner's ID, name, and vote count.

### Development Process

### Challenges

 the versioning
  
