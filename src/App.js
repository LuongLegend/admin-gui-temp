import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateLayout from './components/PrivateLayout';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import routes from './routes';
import './App.less';

function App({ user }) {
    return (
        <Routes>
            {/*pulic route*/}
            <Route path='/login' element={<Login />} />
            {/*protected route*/}
            <Route element={<PrivateLayout user={user} />}>
                {routes.map((route, index) => {
                    if (!route.component) return <></>;
                    return <Route key={index} path={route.path} element={<route.component />} />;
                })}
            </Route>
            {/*not found route*/}
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
