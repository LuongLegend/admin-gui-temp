import React from 'react';
import AccountRouter from './account';

export const index = () => {
    return <div></div>;
};

export default [
    {
        id: 'main',
        path: '/',
        component: index,
    },
    //===== Account: 20 =======
    ...AccountRouter,
];
