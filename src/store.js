import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import monitorReducersEnhancer from './middleware/monitorReducerEnhancer';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    const middleware = [loggerMiddleware, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);
    const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const devTools = process.env.REACT_APP_NODE_ENV === 'development' ? composedEnhancers : middlewareEnhancer;
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['user'],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, preloadedState, devTools);
    const persistor = persistStore(store);
    return { store, persistor };
}
