import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Bread from './Bread';
import Sider from './Sider';

import { collapse } from '../../config/config';
import './index.css';

const { Content } = Layout;

const PrivateLayout = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { user } = props;
    const [collapsed, setCollapsed] = useState(collapse);
    const location = useLocation();
    const token = localStorage.getItem('token');
    //not auth -> login
    if (!token) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    const onCollapseChange = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sider collapsed={collapsed} />
            <div className='PrimaryLayout__container' style={{ paddingTop: 64 }} id='primaryLayout'>
                <Header collapsed={collapsed} onCollapseChange={onCollapseChange} />
                <Bread />
                <Content className='PrimaryLayout__content'>
                    <Outlet />
                </Content>
            </div>
        </Layout>
    );
};

PrivateLayout.propTypes = {
    user: PropTypes.object,
};

export default PrivateLayout;
