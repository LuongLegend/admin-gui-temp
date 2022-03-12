import React from 'react';
import ConceptRouter from './concept';
import CatalogueRouter from './catalogue';
import AccountRouter from './account';
import QuestionBankRouter from './questionBank';

export const index = () => {
    return <div></div>;
};

export default [
    {
        id: 'main',
        path: '/',
        component: index,
    },
    //===== CONCEPT: 1 =======
    ...ConceptRouter,
    //===== Catalogue: 10 =======
    ...CatalogueRouter,
    //===== Account: 20 =======
    ...AccountRouter,
    //===== QuestionBank: 30 =======
    ...QuestionBankRouter,
];
