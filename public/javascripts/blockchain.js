web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute deployedContract.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xfe153182585ac04bab1898e11f12d584f3752b8f');

candidates = {
  "Rahul": "candidate-1",
  "Arvind": "candidate-2",
  "Narendra": "candidate-3",
  "Rajnath": "candidate-4",
  "Piyush": "candidate-5",
  "Smriti": "candidate-6"
}

function voteForCandidate(id) {
  var candidateName = $("input[name=votecandidate]").val();
  // var candidateName = 'Narendra'

  var voteflag = confirm("Confirm Vote");

  if (voteflag == true) {
    contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[0]
    }, function () {
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());
      window.location = "/voteadded/" + id;
    });
  }
}


var electionResults = (function getElectionResults() {
  var voteResults = {};
  candidateNames = Object.keys(candidates);

  for (var i = 0; i < candidateNames.length; i++) {
    var name = candidateNames[i];
    var val = contractInstance.totalVotesFor.call(name).toLocaleString();
    voteResults[name] = val;
  }
  return voteResults;
})();


// $(document).ready(function () {
//   candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });