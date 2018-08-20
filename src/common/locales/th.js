import post from 'modules/post/locales/th'

const defualt = {
  'th-button': 'ไทย',
  'en-button': 'อังกฤษ',
  home: 'หน้าแรก',
  title: 'React SSR - แพร',
}

const combinedTranslation = {
  translation: {
    ...defualt,
    ...post,
  },
}

export default combinedTranslation
