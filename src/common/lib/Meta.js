import Helmet from 'react-helmet'
import React from 'react'

const DEFAULT_SUFFIX = ' - React SSR'

function createMeta(name, content) {
  return { name, content }
}

class Meta {
  robots = 'all'

  constructor({ defaultSuffix } = { defaultSuffix: DEFAULT_SUFFIX }) {
    this.defaultSuffix = defaultSuffix
  }

  setTitle(title) {
    this.title = `${title} ${this.defaultSuffix}`
  }

  setDescription(description) {
    this.description = `${description} ${this.defaultSuffix}`
  }

  setKeywordString(keywordString) {
    this.keywordString = keywordString
  }

  setUrl(url) {
    this.url = url
  }

  setImage(img) {
    this.img = img
  }

  toComponent() {
    return <Helmet title={this.title} meta={this.createMetaArray()} />
  }

  createMetaArray() {
    const meta = []
    meta.push(createMeta('og:type', 'website'))

    if (this.description) {
      meta.push(createMeta('description', this.description))
      meta.push(createMeta('og:description', this.description))
    }

    if (this.keywordString) {
      meta.push(createMeta('keywords', this.keywordString))
    }

    if (this.title) {
      meta.push(createMeta('og:title', this.title))
    }

    if (this.url) {
      meta.push(createMeta('og:url', this.url))
    }

    if (this.img) {
      meta.push(createMeta('og:image', this.img))
      meta.push(createMeta('og:image:secure_url', this.img))
      meta.push(createMeta('og:image:url', this.img))
    }

    meta.push(createMeta('robots', this.robots))

    return meta
  }
}

export default Meta
