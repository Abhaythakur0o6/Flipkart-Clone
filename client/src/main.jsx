import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { DataContextProvider } from './context/DataProvider.jsx'
import { Provider } from "react-redux"
import {store} from "./redux/store"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </StrictMode>
  </Provider>
)