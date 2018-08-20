import post from 'modules/post/locales/en'

const defualt = {
  'th-button': 'Thai',
  'en-button': 'English',
  home: 'Home',
  title: 'React SSR - Prae',
}

const combinedTranslation = {
  translation: {
    ...defualt,
    ...post,
  },
}

export default combinedTranslation
