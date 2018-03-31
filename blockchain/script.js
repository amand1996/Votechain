var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts

code = fs.readFileSync('blockchain/voting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
deployedContract = VotingContract.new(['Rahul Gandhi','Arvind Kejriwal','Narendra Modi', 'Rajnath Singh', 'Piyush Goyal', 'Smriti Irani'],['Delhi','Delhi','Jabalpur','Jabalpur','Lucknow', 'Lucknow'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
deployedContract.address
contractInstance = VotingContract.at(deployedContract.address)

contractInstance.validCandidate.call("Nick")
contractInstance.getCandidateConstituency.call("Nick")

contractInstance.address
compiledCode.contracts[':Voting'].interface




codeAuthentic = fs.readFileSync('blockchain/authentication.sol').toString()
compiledCodeAuthentic = solc.compile(codeAuthentic)
abiDefinitionAuthentic = JSON.parse(compiledCodeAuthentic.contracts[':Authentication'].interface)
AuthenticContract = web3.eth.contract(abiDefinitionAuthentic)
byteCodeAuthentic = compiledCodeAuthentic.contracts[':Authentication'].bytecode
deployedContractAuthentic = AuthenticContract.new(['Aman','Ankit','Rahul','Tushar','Yogesh','Swadhin','Shakaal'],['MP','MP','MP','MP','MP','MP','MP'],'0x6c3f6de99e60f06596d94221d1593364e5a2f919',{data: byteCodeAuthentic, from: web3.eth.accounts[1], gas: 4700000})

deployedContractAuthentic.address

contractInstanceAuthentic = AuthenticContract.at(deployedContractAuthentic.address)

contractInstanceAuthentic.address
compiledCodeAuthentic.contracts[':Authentication'].interface
