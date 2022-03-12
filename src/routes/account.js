import React from 'react';

import Account from '../pages/Account';

import { TeamOutlined } from '@ant-design/icons';

export default [
    {
        id: '20',
        path: '/account',
        icon: <TeamOutlined />,
        name: 'Quản lý Tài khoản',
        component: Account,
        isMenu: true,
    },
];
