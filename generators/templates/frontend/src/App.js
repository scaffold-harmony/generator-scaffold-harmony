import React, {Component} from "react";
import {Unit} from "@harmony-js/utils";
import {configs, getHarmony} from "./harmony"
import SimpleStorageContract from "./contracts/SimpleStorage.json";

import "./App.css";
import logo from "./logo.png";
import { Space, Button, Input, Statistic, Card, Row, Col, Divider, Spin } from "antd";

class App extends Component {
  state = {
    storageValue: 'Loading...',
    inputValue: '',
    network: '',
    config: {},
    harmony: null,
    account: {},
    contract: null,
    formDisabled: true,
    submitting: false,
  };

  componentDidMount = async () => {
    try {
      const network = process.env.REACT_APP_HARMONY_NETWORK || 'localnet';
      const config = configs[network];
      const harmony = await getHarmony(config);
      const account = await harmony.login();

      // Get the contract instance.
      const deployedNetwork = SimpleStorageContract.networks[config.Network_ID];
      const instance = harmony.contracts.createContract(
        SimpleStorageContract.abi,
        deployedNetwork.address,
      );

      // Set initial state
      this.setState({
        network,
        config,
        harmony,
        account,
        contract: instance,
        formDisabled: false,
      }, this.init);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load harmony, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  init = async () => {
    const response = await this.state.contract.methods.get().call();
    this.setState({
      storageValue: response.toString()
    })
  }

  setStorage = async (value) => {
    try {
      const {account, contract} = this.state;

      // Stores a given value, 5 by default.
      await contract.methods.set(parseInt(value)).send({
        from: account,
        gasLimit: '1000001',
        gasPrice: new Unit('10').asGwei().toWei(),
      });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Update state with the result.
      this.setState({
        storageValue: response.toString()
      });
    } catch (e) {
      alert(e);
    }
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit = async (e) => {
    this.setState({
      formDisabled: true,
      submitting: true,
    });
    await this.setStorage(this.state.inputValue)
    this.setState({
      formDisabled: false,
      inputValue: '',
      submitting: false,
    });
  }

  logout = async (e) => {
    await this.state.harmony.logout();
    this.setState({
      account: {},
      formDisabled: true,
    });
  }

  login = async (e) => {
    const account = await this.state.harmony.login();
    this.setState({
      account,
      formDisabled: false,
    });
  }

  render() {
    if (!this.state.harmony) {
      return <div>Loading Harmony, accounts, and contract...</div>;
    }
    return (
      <div className="flex-container">
        <div className="row">
          <div className="flex-item"><img alt="logo" className="logo" src={logo} /></div>
          <h1 className="flex-item">Good to Go!</h1>
          <div className="flex-item">Your Scaffold Harmony is installed and ready.</div>

          <Row gutter={16}>
            <Col span={24} style={{marginTop: 16}}>
              <Divider orientation="left">Connected Account</Divider>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Network"
                  value={this.state.network}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="RPC"
                  value={this.state.config.Chain_URL}
                />
              </Card>
            </Col>
            <Col span={24} style={{marginTop: 16}}>
              <Card>
                {
                  this.state.account.address ?
                    <Statistic
                      title="Account Address"
                      value={this.state.account.address}
                      suffix={this.state.harmony ? <Button onClick={this.logout}>Logout</Button> : null}
                    /> :
                    (
                      <span>
                        <Statistic
                          title="Account Address"
                          formatter={() => (<Button onClick={this.login}>Login</Button>)}
                        />
                      </span>
                    )
                }
              </Card>
            </Col>
            <Col span={24} style={{marginTop: 16}}>
              <Divider orientation="left">SimpleStorage Contract</Divider>
            </Col>
            <Col span={24}>
              <Card>
                <Statistic
                  title="Contract Address"
                  value={this.state.contract.address}
                />
              </Card>
            </Col>
            <Col span={12} style={{marginTop: 16}}>
              <Card>
                <Statistic
                  title="Stored Value"
                  value={this.state.storageValue}
                />
              </Card>
            </Col>
            <Col span={12} style={{marginTop: 16}}>
              <Card>
                <Statistic title="Set Storage" formatter={() => <span/>} prefix={<Space>
                  <Input type="number" value={this.state.inputValue} onChange={this.handleInputChange} disabled={this.state.formDisabled} />
                  <Button onClick={this.handleSubmit} disabled={this.state.formDisabled}>
                    Submit
                  </Button>
                  {this.state.submitting ? <Spin /> : null}
                </Space>} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
