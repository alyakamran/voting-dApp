
document.addEventListener("DOMContentLoaded", async () => {
    // Connect to local Ganache instance
    const web3 = new Web3("http://localhost:7545");

    // Set the contract ABI and address
    const contractABI = [
        {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "candidateId",
            "type": "uint256"
            }
        ],
        "name": "VotedEvent",
        "type": "event"
        },
        {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
            },
            {
            "internalType": "string",
            "name": "name",
            "type": "string"
            },
            {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": false,
        "inputs": [
            {
            "internalType": "string",
            "name": "_name",
            "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "constant": false,
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [],
        "name": "getCandidateCount",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
            }
        ],
        "name": "getCandidate",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            },
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
            }
        ],
        "name": "getVotesForCandidate",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [],
        "name": "findWinner",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            },
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ];
    const contractAddress = '0xFE8a0E654F3b3C2407e1557C9FcFA1E50d797025';
    const electionContract = new web3.eth.Contract(contractABI, contractAddress);

    // Function to vote for a candidate
    async function vote() {

        console.log("Vote button clicked");

        try {
            
            const accounts = await web3.eth.getAccounts();
            const candidateId = document.getElementById("candidateId").value;

            await electionContract.methods.vote(candidateId).send({ from: accounts[0] });
            alert("Vote successful!");
            // You can update the UI or perform other actions after a successful vote

            displayCandidates();
            displayResults();

        } catch (error) {
            console.error("Error voting:", error);
            alert("Error voting. Check the console for details.");
        }
    }

    // Function to display election results
    async function displayResults() {
        const winnerInfo = await electionContract.methods.findWinner().call();
        const winnerElement = document.getElementById("winner");
        winnerElement.textContent = `Winner: Candidate ${winnerInfo[0]} (${winnerInfo[1]}) with ${winnerInfo[2]} votes`;
    }

    // Function to display candidates dynamically
    async function displayCandidates() {
        const candidatesCount = await electionContract.methods.getCandidateCount().call();
        const candidatesElement = document.getElementById("candidatesList");

        for (let i = 1; i <= candidatesCount; i++) {
            const candidateInfo = await electionContract.methods.getCandidate(i).call();
            const listItem = document.createElement("li");
            listItem.textContent = `Candidate ${candidateInfo[0]} (${candidateInfo[1]}): ${candidateInfo[2]} votes`;
            candidatesElement.appendChild(listItem);
        }
    }

    // Function to add a candidate by the admin
    async function addCandidate() {
        console.log("Add Candidate button clicked");

        try {
            const accounts = await web3.eth.getAccounts();
            const newCandidateName = document.getElementById("newCandidateName").value;

            await electionContract.methods.addCandidate(newCandidateName).send({ from: accounts[0] });
            alert("Candidate added successfully!");

            // You can update the UI or perform other actions after adding a candidate
            displayCandidates();
            displayResults();
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("Error adding candidate. Check the console for details.");
        }
    }

    // Call functions to display candidates and results when the page loads
    displayCandidates();
    displayResults();

    // Add event listener to the Vote button
    document.getElementById("voteButton").addEventListener("click", vote);

    // Add event listener to the Add Candidate button
    document.getElementById("addCandidateButton").addEventListener("click", addCandidate);
});
