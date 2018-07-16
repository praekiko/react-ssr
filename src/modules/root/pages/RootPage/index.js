import '../../../../common/styles/base.css'

import React, { PureComponent } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import RootActions from '../../actions'

import Home from '../../components/Home'
import About from '../../components/About'
import style from './style.css'

class RootPage extends PureComponent {
  setLanguage = ({ target: { value } }) => {
    this.props.setLocale(value)
  }

  render() {
    return (
      <div>
        <Helmet
          defaultTitle="React SSR Prae"
          titleTemplate="%s – React SSR Prae"
        />
        <p className={style.prae}>Prae</p>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route render={() => <h1>Nomatch</h1>} />
        </Switch>
        <button value="th-TH" onClick={this.setLanguage}>
          Thai
        </button>
        <button value="en-US" onClick={this.setLanguage}>
          English
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setLocale: RootActions.setLocale,
}

export default connect(
  null,
  mapDispatchToProps
)(RootPage)
