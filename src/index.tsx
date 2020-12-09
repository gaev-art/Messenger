import './index.css'
import React from 'react'
import {App} from './components/App'
import {render} from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import * as serviceWorker from './serviceWorker'


render(
  <HashRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)


serviceWorker.unregister()
