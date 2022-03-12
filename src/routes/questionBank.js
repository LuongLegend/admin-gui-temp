import React from 'react';

import QuestionBank from '../pages/QuestionBank';

import { BankOutlined } from '@ant-design/icons';

export default [
    {
        id: '30',
        path: '/question-bank',
        icon: <BankOutlined />,
        name: 'Kho câu hỏi',
        component: QuestionBank,
        isMenu: true,
    },
];
