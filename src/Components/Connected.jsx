import React from "react";

const Connected = (props) => {
    return (
        <div>
        <div className="connected-container">
        
            <div>
            <div id="box">
            <div id="info">
                <h3>My Profile</h3>
                <div id="img"></div>
                <h2>Metamask Account</h2>
                <p id="p">{props.account}</p>
                
                
            </div>
            
            <div id="info"></div>
            <div id="info"><h2>Time left to Vote: {props.remainingTime} sec</h2></div>
            <div id="info">
            </div>
            <div id="info">
                <h2>Your Voting Status</h2>
                {(props.voterList.some(v => (v.voterAddress == props.account.toString())
                )) ? ( props.showButton ? (
                <h3 className="connected-account">You have already voted</h3>
                    ) : (
                        <div id="in">
                            <input type="number" placeholder="Entern Candidate Index" value={props.number} onChange={props.handleNumberChange}></input>
                    <br />
                    <button className="add-button" onClick={props.voteFunction}>Vote</button>

                        </div>
                    )):<h3>You are not a Registered voter</h3>}
            </div>
            
            </div>
            </div>

            <div id="box-mid">
            
            <div>
            <h1>Registered Voters</h1>
            <table id="myTable" className="candidates-table">
                <thead>
                <tr it="top">
                    <th id="one">Index</th>
                    <th id="two">Voter name</th>
                </tr>
                </thead>
                <tbody>
                {props.voterList.map((v, index) => (
                    <tr key={index}>
                    <td>{v.index}</td>
                    <td>{v.voterAddress}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div>
            <h1>Election Candidates </h1>
            <table id="myTable" className="candidates-table">
                <thead>
                <tr it="top">
                    <th id="one">Index</th>
                    <th>Candidate name</th>
                    <th id="two">Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            </div>

            <div id="box-down">
                <div>

            {(props.account === "0x9Cb8790eeeFcE34b9Ac21D3d4CE3bA4aa56Dc6dF")?(
            <div>
                
            <h1>Add New Candidates</h1>
        <table id="myTable" className="candidates-table">
                <thead>
                <tr id="top">
                    <th id="one1">Enter Candidate Name</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><div id="in">
                            <input type="text" placeholder="Enter Candidate Name" value={props.name} onChange={props.handleNameChange}></input>
                    <br />
                    <button className="add-button" onClick={props.addFunction}>Add Candidate</button>

                        </div></td>
                    </tr>
                </tbody>
            </table>
            </div>):(<p></p>)}
            </div>
            <div>
            {(props.account === "0x9Cb8790eeeFcE34b9Ac21D3d4CE3bA4aa56Dc6dF")?(
            <div>
                
            <h1>Register New Voters</h1>
        <table id="myTable" className="candidates-table">
                <thead>
                <tr id="top">
                    <th id="one1">Add Voters</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><div id="in">
                            <input type="text" placeholder="Enter Voter Address" value={props.voter} onChange={props.handleVotersChange}></input>
                    <br />
                    <button className="add-button" onClick={props.addVoterFunction}>Add Voter</button>

                        </div></td>
                    </tr>
                </tbody>
            </table>
            </div>):(<p></p>)}
            </div>
            </div>
            
        </div>
        </div>
    )
}

export default Connected;