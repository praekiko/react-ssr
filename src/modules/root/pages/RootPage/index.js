import '../../../../common/styles/base.css'

import React, { PureComponent } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { translate } from 'react-i18next'

import RootActions from '../../actions'

import Home from '../../components/Home'
import About from '../../components/About'
import style from './style.css'

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`

class RootPage extends PureComponent {
  setLanguage = ({ target: { value } }) => {
    this.props.setLocale(value)
  }

  render() {
    const { t } = this.props

    return (
      <AppContainer>
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
        <button value="th" onClick={this.setLanguage}>
          {t('th-button')}
        </button>
        <button value="en" onClick={this.setLanguage}>
          {t('en-button')}
        </button>
      </AppContainer>
    )
  }
}

const mapDispatchToProps = {
  setLocale: RootActions.setLocale,
}

export default connect(
  null,
  mapDispatchToProps
)(translate()(RootPage))
