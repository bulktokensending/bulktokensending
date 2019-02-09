import React from 'react';
import Form from 'react-validation/build/form';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import { control } from 'react-validation';
import { inject, observer } from "mobx-react";
import swal from 'sweetalert';
import { PulseLoader} from 'react-spinners';

const ownInput = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    {isChanged && isUsed && error}
    <input {...props} />
  </div>
);
const Input = control(ownInput);

const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="error">required</span>;
  }
};

@inject("UiStore")
@observer
export class NewStack extends React.Component {
  constructor(props){
    super(props);
    this.stackStore = props.UiStore.stackStore;
    this.web3Store = props.UiStore.web3Store;
    this.web3Store.setStartedUrl('#/stack');
    this.onCountChange = this.onCountChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.stackStore.reset()
  }

  onCountChange(e) {
    this.stackStore.setCount(e.target.value)
  }

  onPasswordChange(e) {
    this.stackStore.setPassword(e.target.value)
  }

  reload(e) {
    window.location.reload();
  }

  async onSubmit(e){
    try {
      e.preventDefault()
      if(this.stackStore.count === ''){
        swal("Error!", "Please enter needed address count for generation", 'error')
        return
      }
      if(Number(this.stackStore.count).valueOf() > 100){
        swal("Error!", "Please enter address count not more 100 per one time", 'error')
        return
      }
      if(this.stackStore.password === ''){
        swal("Error!", "Please enter common password for all addresses", 'error')
        return
      }
      await this.stackStore.doGeneration();
    } catch(e) {
      console.error(e)
      swal({
        title: "Generation Error",
        text: e.message,
        icon: "error",
      })
    }
    return
  }

  render () {
    if(this.web3Store.errors.length > 0){
      swal("Error!", this.web3Store.errors.toString(), 'error')
    }
    if (typeof(Worker) === "undefined") {
      swal("Error!", "Your browser doesn't have Worker. Please use Chrome browser.", 'error')
    }
    return (
      <div className="container container_bg">

        <div className="content">
          <div className='sweet-loading'>
          <PulseLoader
            color={'#9a9a9b'}
            loading={this.web3Store.loading}
            />
          </div>
          <h1 className="title"><strong>Welcome to </strong> Bulk Token Sending</h1>
          <p className="description">
            Please provide a count for the generation new ETH addresses and a common password.<br />
            You can generate up to 100 new ETH addresses per time.<br/>
            On output you will receive cvs list with addresses and corresponding private key
          </p>
          <Form className="form">
            <label htmlFor="address-count" className="label">Count</label>
            <Input disabled={this.web3Store.loading} type="number" validations={[required]} onChange={this.onCountChange} value={this.stackStore.count} className="input" id="address-count"/>

            <label htmlFor="common-password" className="label">Common password</label>
            <Input disabled={this.web3Store.loading} type="text" validations={[required]} onChange={this.onPasswordChange} value={this.stackStore.password} className="input" id="common-password"/>
            {this.stackStore.addresses.length !== 0 &&
              <span>
                <Textarea
                  disabled={this.web3Store.loading}
                  data-gram
                  readOnly
                  id="generated-addresses"
                  className="textarea"
                  value={JSON.stringify(this.stackStore.addresses)}
                  />
                <p className="description">
                  Here is new addresses in JSON format: &#123;"address": "0x0", "v3json": "..."&#125;<br/>
                  Copy and save in your secure place v3json and password to get the access in future.
                </p>
                <Textarea
                  disabled={this.web3Store.loading}
                  data-gram
                  readOnly
                  id="generated-onlyAddresses"
                  className="textarea"
                  value={this.stackStore.onlyAddresses.join("\n")}
                  />
                <p className="description">
                  Here is only new addresses. You can use it in any spreadsheet software to get CSV format.
                </p>
              </span>
            }
            {this.stackStore.addresses.length === 0 &&
             <Button onClick={this.onSubmit} className="button button_next">Generate</Button>
            }
            {this.stackStore.addresses.length !== 0 && this.stackStore.addresses.length >= this.stackStore.count &&
              <Button onClick={this.reload} className="button button_next">New Stack</Button>
            }
            <PulseLoader
              color={'#9a9a9b'}
              loading={this.stackStore.addresses.length < this.stackStore.count}
            />
          </Form>
        </div>
      </div>
    );
  }
}
