import React from 'react';

import Concept from '../pages/Concept';
import SaveConcept from '../pages/Concept/SaveConcept';

import { BuildOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';

export default [
    {
        id: '1',
        path: '/concept-list',
        icon: <BuildOutlined />,
        name: 'Quản lý concept',
        component: Concept,
        isMenu: true,
    },
    {
        id: '2',
        path: '/concept',
        icon: <MenuOutlined />,
        name: 'Danh sách concept',
        component: Concept,
        menuParentId: '1',
        breadcrumbParentId: '1',
        isMenu: true,
    },
    {
        id: '3',
        path: '/concept/add',
        icon: <PlusCircleOutlined />,
        name: 'Thêm mới concept',
        component: SaveConcept,
        menuParentId: '1',
        breadcrumbParentId: '1',
        isMenu: true,
    },
    {
        id: '4',
        path: '/concept/edit/:id',
        icon: <BuildOutlined />,
        name: 'Chỉnh sửa concept ',
        component: SaveConcept,
        breadcrumbParentId: '1',
        isMenu: false,
    },
];
