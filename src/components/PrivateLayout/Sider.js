import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Image } from 'antd';
import * as config from '../../config/config';
import SiderMenu from './Menu';
import './Sider.css';

const Sider = (props) => {
    const { collapsed } = props;
    return (
        <Layout.Sider
            width={230}
            breakpoint='lg'
            trigger={null}
            collapsible
            collapsed={collapsed}
            className='Sider__sider ant-layout-sider ant-layout-sider-light'
        >
            <div className='Sider__brand'>
                <div className='Sider__logo'>
                    <Image
                        preview={false}
                        alt='logo'
                        src={collapsed ? config.logoMiniPath : config.logoPath}
                        fallback={'https://tuyensinh247.com/favicon.ico'}
                    />
                </div>
            </div>

            <div className='Sider__menuContainer'>
                <SiderMenu collapsed={collapsed} />
            </div>
        </Layout.Sider>
    );
};

Sider.propTypes = {
    menus: PropTypes.array,
    collapsed: PropTypes.bool,
};

export default Sider;
