import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateLayout from './components/PrivateLayout';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import GoogleCallback from './pages/GoogleCallback';
import routes from './routes';
import './App.less';

function App({ user }) {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/google/callback' element={<GoogleCallback />} />
            <Route element={<PrivateLayout user={user} />}>
                {routes.map((route, index) => {
                    if (!route.component) return <></>;
                    return <Route key={index} path={route.path} element={<route.component />} />;
                })}
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

App.propTypes = {
    user: PropTypes.object,
};
const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};
export default connect(mapStateToProps)(App);
