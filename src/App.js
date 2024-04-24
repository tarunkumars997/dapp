import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [voterList, setVoterList] = useState([]);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [CanVote, setCanVote] = useState(true);
  const [voter,setVoter] = useState('')


  useEffect( () => {
    getCandidates();
    getVoters();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  async function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
  }

  async function addFunction() {
    // console.log(name)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.addCandidate(name);
    await tx.wait();
    getCandidates();
}

async function addVoterFunction() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract (
    contractAddress, contractAbi, signer
  );
  // console.log(voter)
  const tx = await contractInstance.addVoters(voter);
  await tx.wait();
  getVoters();
}

async function getVoters() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract (
    contractAddress, contractAbi, signer
  );
  const vList = await contractInstance.getAllVoters();
  const formattedCandidates = vList.map((v, index) => {
    return {
      index: index,
      voterAddress: v.voterAddress
    }
  });
  setVoterList(formattedCandidates);
  // console.log(voterList)
}


  async function canVote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);

  }

  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber()
        }
      });
      setCandidates(formattedCandidates);
  }


  async function getCurrentStatus() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      // console.log(status);
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setremainingTime(parseInt(time, 16));
  }

  async function handleAccountsChanged(accounts) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        // console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function handleNameChange(e) {
    setName(e.target.value);
  }

  async function handleVotersChange(e) {
    setVoter(e.target.value);
  }

  return (
    <div className="App">
      { votingStatus ? (isConnected ? (<Connected 
                      account = {account}
                      candidates = {candidates}
                      voterList = {voterList}
                      remainingTime = {remainingTime}
                      number= {number}
                      name = {name}
                      voter = {voter}
                      handleVotersChange = {handleVotersChange}
                      handleNameChange = {handleNameChange}
                      handleNumberChange = {handleNumberChange}
                      voteFunction = {vote}
                      addFunction = {addFunction}
                      addVoterFunction = {addVoterFunction}
                      showButton = {CanVote}/>) 
                      
                      : 
                      
                      (<Login connectWallet = {connectToMetamask}/>)) 
                      : 
                      (<Finished 
                      candidates = {candidates}
                      voterList = {voterList}
                      />)}
      
    </div>
  );



}

export default App;
