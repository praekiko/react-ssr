// @flow

import React, { PureComponent, type Node } from 'react'
import i18n from 'i18next'
import { withRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { connect } from 'react-redux'

import th from 'common/locales/th'
import en from 'common/locales/en'

const devMode = process.env.NODE_ENV === 'development'

i18n.init({
  fallbackLng: 'th',
  fallbackNS: ['translation'],
  resources: { th, en },
  parseMissingKeyHandler: missing => {
    if (devMode) {
      console.warn('MISSING TRANSLATION:', missing)
    }
    return missing
  },
})

type ReduxProps = {
  locale: string,
}

type Props = ReduxProps & {
  children: Node,
}

class I18n extends PureComponent<Props> {
  componentDidMount() {
    const { locale } = this.props
    i18n.changeLanguage(locale)
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props

    if (prevProps.locale !== locale) {
      i18n.changeLanguage(locale)
    }
  }

  render() {
    const { children } = this.props

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
})

export default withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
  )(I18n)
)
