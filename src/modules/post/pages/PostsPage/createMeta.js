import Meta from 'common/lib/Meta'

const createMeta = t => {
  const meta = new Meta()

  meta.setTitle(t('posts'))
  meta.setDescription(t('posts'))
  meta.setKeywordString(t('posts'))

  return meta
}

export default createMeta
