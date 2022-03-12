import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import vi from 'antd/lib/locale/vi_VN';

import configureStore from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={configureStore().store}>
            <PersistGate persistor={configureStore().persistor}>
                <ConfigProvider locale={vi}>
                    <App />
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
