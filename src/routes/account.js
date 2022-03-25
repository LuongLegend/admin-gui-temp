import React from 'react';

import Account from '../pages/Account';
import AddAccount from '../pages/Account/AddAccount';

import { TeamOutlined, PlusOutlined } from '@ant-design/icons';

export default [
    {
        id: '20',
        path: '/account',
        icon: <TeamOutlined />,
        name: 'Quản lý Tài khoản',
        component: Account,
        isMenu: true,
    },
    {
        id: '21',
        path: '/account/add',
        icon: <PlusOutlined />,
        name: 'Thêm tài khoản',
        component: AddAccount,
        menuParentId: '20', //menu sidebar
        breadcrumbParentId: '20', //breadcrumb below header
        isMenu: true,
    },
];
