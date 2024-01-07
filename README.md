<h2> CSCI 4312 Blockchain & Application </h2>

**Group Project**
<pre>

ALYA AQILAH BINTI AHMAD KAMRAN 2011192<br>
ALYA HUSNA BINTI IBRAHIM 2019748
</pre>
 
*Lecturer Dato' Prof. Dr. NORBIK BASHAH BIN IDRIS*

## voting-dApp

## Introduction and Objectives

The election and voting system is a basis of democratic processes, spanning various scenarios from local student societies' elections to the national general elections for citizens of democratic nations. Despite the prevalence of these systems, they are not immune to faults or corruptions, raising concerns about the integrity and transparency of the electoral process. Issues such as voter fraud, manipulation, and data tampering have been reported, highlighting the need for immediate solutions. In response to these challenges, a blockchain-based voting decentralized application (dApp) is introduced as a potential solution. Leveraging the inherent security features of blockchain technology, this voting dApp aims to enhance the transparency, security, and tamper-resistance of the election process. By decentralizing the voting infrastructure, it reduces the risk of centralized control and manipulation, ensuring a more trustworthy and democratic electoral experience for all participants.

## dApp Architecture
![CSCI 4312_ Use Case DIagram drawio](https://github.com/alyakamran/voting-dApp/assets/121216138/a49a92a7-15f7-4dd7-b317-f2cbe4af6625)

The use case diagram for the voting dApp outlines the key features and functionalities for two primary actors: the Admin and the Voter. The Voter, representing the individual participating in the election, is able to register, choosing a candidate to vote for, and the system will verify if the voter has already cast their vote. On the other hand, the Admin is responsible for overseeing the election process, has the authority to add candidates for voters to choose from. Additionally, the Admin can perform crucial functions such as tallying votes and determining the winner of the election. This use case diagram visually captures the essential interactions between the users (Admin and Voter) and the system, ensuring a clear and comprehensive representation of the voting dApp's functionalities.

## Smart Contract
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

## Development Process

## Prerequisites:

1. **Node.js and npm:**
   - Ensure Node.js and npm are installed on your machine. [Node.js Download](https://nodejs.org/)

2. **Truffle:**
   - Install Truffle globally using the following command:
     ```bash
     npm install -g truffle
     ```

3. **solc - Solidity Compiler:**
   - Install the Solidity compiler (solc):
     ```bash
     npm install -g solc
     ```

4. **Ganache:**
   - Download and install Ganache from [Ganache Website](https://www.trufflesuite.com/ganache)

## Project Initialization:

1. **Create a new project directory named voting-dApp:**
   - Navigate to the directory for voting-dApp in the terminal.

2. **Initialize Truffle project:**
   - Run the following command to initialize a Truffle project:
     ```bash
     truffle init
     ```
    - contracts, migrations, test folders and truffle-config.js file will be created in the directory.

3. **Smart Contract Setup:**
   - Place the smart contract in the `contracts` folder.

4. **Configure Truffle:**
   - Open `truffle-config.js` to configure the network settings based on your Ganache workspace. Adjust the compiler version for Solidity (refer to the current version of solc and smart contract).

5. **Deployment Script:**
   - Create a `2_deploy_contracts.js` file in the `migrations` folder to load and deploy your smart contract.
     ```bash
     const Election = artifacts.require("Election");

     module.exports = function (deployer) {
       deployer.deploy(Election);
     };
     ```
     

6. **Compile the Smart Contract:**
   - Compile the smart contract using:
     ```bash
     truffle compile
     ```

   - If no errors, proceed to migration.

7. **Migrate to the Blockchain:**
   - Migrate the smart contract to your blockchain using:
     ```bash
     truffle migrate
     ```

## Frontend Setup:

1. **Create Frontend (HTML, CSS, JavaScript):**
   - Create an `index.html` file for the frontend which includes sections for  candidate information, voting, results, and admin actions

    ![image](https://github.com/alyakamran/voting-dApp/assets/121216138/cf2ea2e7-4480-480e-84bd-b78cf019a087)



2. **Install Web3 and Metamask:**
   - Install Web3 and Metamask:
     ```bash
     npm install web3
     ```

3. **JavaScript Interaction:**
   - Create JavaScript files to interact with the smart contract using Web3.
   - Include the ABI from `build/contracts` and the contract address obtained after migrating in your `app.js`.

4. **Serve Your Web Application:**
   - Install the `http-server` package globally:
     ```bash
     npm install -g http-server
     ```

   - Start the server:
     ```bash
     http-server
     ```

5. **Access Your Web Application:**
   - Open your web browser and go to the port shown to access your web application.

## Unit Testing:

1. **Create Test File:**
  - Create test files with .js extensions in the test folder (e.g., test/test.js).

2. **Write Test Cases:**
  - Import necessary modules:
    ```JavaScript
     const Election = artifacts.require("Election");
     ```

  - Write the test scripts

3. **Run Tests:**
 - ```bash
     truffle test
     ```

## Challenges

### Solidity Compiler (solc) and Smart Contract Versioning:

**Challenge:** The Solidity compiler (solc) is crucial for compiling smart contracts, and its version compatibility with Truffle and the smart contract code is essential. Truffle may refuse to compile if there's a mismatch in versions, leading to build errors.

**Solution:** Ensuring that the versions of solc specified in the Truffle configuration (truffle-config.js) and the pragma statement in the smart contract are compatible is crucial. Regularly checking for updates and aligning versions appropriately can help avoid compilation issues.

### Metamask Wallet Integration:

**Challenge:** Integrating Metamask with the frontend and ensuring that transactions are executed by the connected account presented challenges. Metamask is a browser extension that manages user Ethereum accounts, and synchronizing it with the frontend for transaction execution is crucial.

**Solution:** Utilizing the Metamask JavaScript library and following best practices for connecting the frontend with the wallet is essential. The ethereum.request method is used to request user accounts and handle transactions. Ensuring that the user approves transactions in the Metamask popup and handling errors gracefully enhances the user experience.
  
