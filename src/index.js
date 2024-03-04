// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import App from './components/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
		<ToastContainer autoClose={1500} />
	</Provider>
)