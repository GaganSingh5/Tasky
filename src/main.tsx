import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import  {App } from './App'
import './App.scss'

ReactDOM.createRoot(document.getElementById('root') !).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)
