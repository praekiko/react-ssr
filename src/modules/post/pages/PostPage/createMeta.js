import Meta from 'common/lib/Meta'

const createMeta = (title, t) => {
  const meta = new Meta()

  meta.setTitle(`${title} ${t('posts')}`)
  meta.setDescription(`${title} ${t('posts')}`)
  meta.setKeywordString(t('posts'))

  return meta
}

export default createMeta
