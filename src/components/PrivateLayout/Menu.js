import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { arrayToTree } from '../../utils';
import routes from '../../routes';

const { SubMenu } = Menu;

const generateMenus = (data) => {
    return data.map((item) => {
        if (item.children) {
            return (
                <SubMenu key={`parent_` + item.id} icon={item.icon} title={item.name}>
                    {generateMenus(item.children)}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={item.id}>
                <NavLink to={item.url ? item.url : item.path ? item.path : '#'}>
                    {item.icon}
                    <span>{item.name}</span>
                </NavLink>
            </Menu.Item>
        );
    });
};

const SiderMenu = () => {
    // Generating tree-structured data for menu content.
    const menus = routes.filter((_) => _.isMenu);
    const menuTree = arrayToTree(menus, 'id', 'menuParentId');
    return <Menu mode='inline'>{generateMenus(menuTree)}</Menu>;
};

export default SiderMenu;
