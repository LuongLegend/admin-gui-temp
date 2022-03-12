const logger = () => (next) => (action) => {
    if (process.env.REACT_APP_NODE_ENV === 'development') {
        console.group(action.type);
        console.info('dispatching', action);
        const result = next(action);
        //console.log('next state', store.getState())
        console.groupEnd();
        return result;
    }
    return;
};

export default logger;
