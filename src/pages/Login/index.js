import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Form, Input, Typography, Divider, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { callApi } from '../../utils/callApi';
import { getUserInfo } from '../../actions';
import './index.css';
import bkgImage from '../../assets/background.jfif';

const { Title } = Typography;
const { Password } = Input;

const Login = (props) => {
    const { onGetUser } = props;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleLogin = async (values) => {
        const { username, password } = values;
        const data = { username, password };
        const res = await callApi('/login', 'POST', data);
        if (res && res.success) {
            const token = res.data;
            localStorage.setItem('token', token);
            onGetUser({ name: 'Họ tên' });
            navigate(-1);
        }
        console.log(res);
        //console.log([username, password]);
    };

    return (
        <>
            <Row justify='center' className='login-container'>
                <Form form={form} onFinish={handleLogin} className='login-form'>
                    <Image src={bkgImage} alt='loi roi' preview={false} />
                    <Title level={3} style={{ textAlign: 'center' }}>
                        ĐĂNG NHẬP
                    </Title>
                    <Divider />
                    <Form.Item
                        name='username'
                        rules={[{ required: true, message: 'Tên tài khoản không được bỏ trống' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Tên tài khoản' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}>
                        <Password prefix={<LockOutlined />} placeholder='Mật khẩu' />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className='login-btn'>
                        Đăng nhập
                    </Button>
                </Form>
            </Row>
        </>
    );
};

const mapDispatchToState = (dispatch) => {
    return {
        onGetUser: (user) => dispatch(getUserInfo(user)),
    };
};

Login.propTypes = {
    onGetUser: PropTypes.func,
};

export default connect(null, mapDispatchToState)(Login);
