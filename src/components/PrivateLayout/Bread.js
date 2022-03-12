import React from 'react';
import { Card, Breadcrumb } from 'antd';
import { matchPath } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../routes';
import { queryAncestors } from '../../utils';
import './Bread.css';

const generateBreadcrumbs = (paths) => {
    return paths.map((item, key) => {
        const content = item && (
            <>
                {item.icon}
                <span>{item.name}</span>
            </>
        );
        return (
            item && (
                <Breadcrumb.Item key={key}>
                    {paths.length - 1 !== key ? <Link to={item.path || '#'}>{content}</Link> : content}
                </Breadcrumb.Item>
            )
        );
    });
};

const Bread = () => {
    const location = useLocation();
    const currentRoute = routes.find((_) => _.path && matchPath(_.path, location.pathname));
    const paths = currentRoute
        ? queryAncestors(routes, currentRoute, 'breadcrumbParentId').reverse()
        : [routes[0], { id: 404, name: `Not Found` }];
    return (
        <Card bodyStyle={{ padding: '12px 32px' }}>
            <Breadcrumb className='Bread__bread' style={{ marginBottom: '0' }}>
                {generateBreadcrumbs(paths)}
            </Breadcrumb>
        </Card>
    );
};

export default Bread;
