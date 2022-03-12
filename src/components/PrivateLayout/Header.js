import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Menu, Layout, Avatar, Dropdown } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

import { signOut } from '../../actions';
import './Header.css';

const Header = (props) => {
    const { collapsed, onCollapseChange, user, onSignOut } = props;
    const navigate = useNavigate();
    const handleSignOut = () => {
        onSignOut();
        localStorage.setItem('token', '');
        navigate('/login');
    };

    const changeCollapse = () => {
        onCollapseChange();
    };

    const menu = (
        <Menu key='menu' style={{ width: 100 }}>
            <Menu.Item key='SignOut' onClick={handleSignOut}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const rightContent = [
        <Dropdown overlay={menu} key='user'>
            <div>
                <span>{user && user.name}</span>
                <Avatar style={{ marginLeft: 8, marginRight: 20 }} icon={<UserOutlined />} />
            </div>
        </Dropdown>,
    ];

    return (
        <Layout.Header
            className={
                !collapsed
                    ? 'Header__header Header__fixed ant-layout-header'
                    : 'Header__header Header__fixed Header__collapsed ant-layout-header'
            }
            id='layoutHeader'
        >
            <div className='Header__button' onClick={changeCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className='Header__rightContainer'>{rightContent}</div>
        </Layout.Header>
    );
};

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

const mapDispatchToState = (dispatch) => {
    return {
        onSignOut: () => dispatch(signOut()),
    };
};

Header.propTypes = {
    user: PropTypes.object,
    collapsed: PropTypes.bool,
    onSignOut: PropTypes.func,
    onCollapseChange: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToState)(Header);
