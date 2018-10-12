import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    // equivalent to constructor statement
    manager: "",
    players: [],
    balance: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); // no need to specify from account, web3 provider uses metamask account
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({
      manager: manager,
      players: players,
      balance: balance,
      value: "",
      message: ""
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "waiting on transaction success... " });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
    this.setState({ message: "You have been entered successfully!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Picking winner... " });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: "a winner have been picked" });
  };

  render() {
    console.log("web3 version: " + web3.version);
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract manager address: {this.state.manager}
          There are currently {this.state.players.length} players entered, the
          prize is {web3.utils.fromWei(this.state.balance, "ether")} ether
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Try your luck:</h4>
          <div>
            <label>Amount of Ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
