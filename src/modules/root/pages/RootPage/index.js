// @flow

import '../../../../common/styles/base.css'

import React, { PureComponent } from 'react'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { translate } from 'react-i18next'

import CommonActions from '../../../../common/actions'

import Home from '../../components/Home'
import About from '../../components/About'

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

const Block = styled.div`
  width: 400px;
  background-color: white;
  padding: 1em;
  border-color: gray;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 1px gray;
`

const Title = styled.h3`
  color: rgb(46, 68, 78) !important;
  margin: 0.2em 0 !important;
`

const Button = styled.button`
  border-radius: 4px;
  line-height: 1em;
  font-size: 0.5em;
  font-weight: bold;
  text-align: center;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  background-color: ${({ isSelected }) =>
    isSelected ? 'palevioletred' : 'white'};
  border: solid 1px palevioletred;
  color: ${({ isSelected }) => (isSelected ? 'white' : 'palevioletred')};
  padding: 0.7em 1em;
  margin-right: 0.5em;
`

const LinkContainer = styled.div`
  margin-bottom: 0.5em;
`

const StyledLink = styled(Link)`
  margin-right: 1em;
  color: rgb(46, 68, 78);
  font-weight: bold;
  text-decoration: none;
  font-size: 0.5em;
  padding: 0.5em;
  border-bottom: 3px solid palevioletred;
`

const PageContainer = styled.div`
  border-radius: 0.3em;
  padding: 1em;
  background-color: #f5f5f5;
  color: white;
  font-size: 0.5em;
  height: 100px;
  margin-bottom: 0.5em;
`

type ReduxProps = {
  setLocale: () => string,
}

type Props = ReduxProps & {
  locale: string,
  t: Function,
}

class RootPage extends PureComponent<Props> {
  setLanguage = ({ target: { value } }) => {
    const { setLocale } = this.props
    setLocale(value)
  }

  render() {
    const { t, locale } = this.props

    return (
      <AppContainer>
        <Block>
          <Helmet
            defaultTitle="React SSR Prae"
            titleTemplate="%s – React SSR Prae"
          />
          <Title>{t('title')}</Title>

          <LinkContainer>
            <StyledLink to="/">{t('home')}</StyledLink>
            <StyledLink to="/about">{t('about')}</StyledLink>
            <StyledLink to="/404">404</StyledLink>
          </LinkContainer>

          <PageContainer>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route render={() => <p>Nomatch</p>} />
            </Switch>
          </PageContainer>

          <Button
            value="th"
            isSelected={locale === 'th'}
            onClick={this.setLanguage}
          >
            {t('th-button')}
          </Button>
          <Button
            value="en"
            isSelected={locale === 'en'}
            onClick={this.setLanguage}
          >
            {t('en-button')}
          </Button>
        </Block>
      </AppContainer>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
})

const mapDispatchToProps = {
  setLocale: CommonActions.setLocale,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate()(RootPage))
)
