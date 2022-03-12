import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <Result
            status='404'
            title='404'
            subTitle='Không tìm thấy trang'
            extra={
                <Button type='primary' onClick={handleBack}>
                    Trở lại
                </Button>
            }
        />
    );
};

export default NotFound;
