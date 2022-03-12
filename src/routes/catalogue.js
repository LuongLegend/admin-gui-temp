import React from 'react';

import { ClusterOutlined } from '@ant-design/icons';

import Catalogue from '../pages/Catalogue';

export default [
    {
        id: '10',
        path: '/catalogue',
        icon: <ClusterOutlined />,
        name: 'Quản lý catalogue',
        component: Catalogue,
        isMenu: true,
    },
];
