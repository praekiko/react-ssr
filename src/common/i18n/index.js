// @flow
import React from 'react'
import i18next from 'i18next'
import { withRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { connect } from 'react-redux'

import th from '../locales/th.json'
import en from '../locales/en.json'

i18next.init({
  fallbackLng: 'th',
  fallbackNS: ['translation'],
  resources: { th, en },
  parseMissingKeyHandler: missing => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MISSING TRANSLATION:', missing)
    }
    return missing
  },
})

class I18n extends React.PureComponent {
  componentDidMount() {
    i18next.changeLanguage(this.props.locale)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locale !== this.props.locale) {
      i18next.changeLanguage(this.props.locale)
    }
  }

  render() {
    return (
      <I18nextProvider i18n={i18next}>{this.props.children}</I18nextProvider>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.root.locale,
})

export default withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
  )(I18n)
)
