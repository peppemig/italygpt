import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from './Settings';
import { Provider } from "react-redux"
import store from './redux/store';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Toaster toastOptions={{duration: 4000}}/>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path='' element={<App/>}/>
              <Route path='/settings' element={<Settings/>}/>
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
    </Provider>
)
