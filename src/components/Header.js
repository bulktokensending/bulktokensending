import React from 'react';
import { inject, observer } from "mobx-react";

@inject("UiStore")
@observer
export class Header extends React.Component {
  render() {
    const explorerUrl = this.props.UiStore.web3Store.explorerUrl || 'https://etherscan.io';

    return (
    <header className="header">
        <div className="container">
          <a href="/" className="header-logo">&nbsp;</a>
          <form className="form form_header">
            <label htmlFor="network"
                className="label">Bulk Token Sending Address: <a rel="noopener noreferrer" target="_blank" href={`${explorerUrl}/address/${process.env.REACT_APP_PROXY_ADDRESS}`}>
                   {process.env.REACT_APP_PROXY_ADDRESS}</a>
            </label>
            <div className="socials">
            <a href="https://github.com/bulktokensending/bulktokensending/issues" rel="noopener noreferrer" target="_blank" className="socials-i socials-i_github">&nbsp;</a>
          </div>
          </form>
        </div>
    </header>
    )
  }
}
