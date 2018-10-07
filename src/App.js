import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = { // equivalent to constructor statement
    manager: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); // no need to specify from account, web3 provider uses metamask account

    this.setState({ manager: manager });
  }

  render() {
    console.log("web3 version: " + web3.version);
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract manager address: {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
