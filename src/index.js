import React from 'react'
import ReactDOM from 'react-dom'

import style from './style.css'

const App = () => {
  return (
    <div>
      <p className={style.prae}>Prae</p>Hello React!
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
