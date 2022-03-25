import axios from 'axios';
import { message } from 'antd';
import { API_URL } from '../config/config';

export const callApi = async (endpoint, method = 'GET', body, header) => {
    try {
        const token = localStorage.getItem('token');
        let dataQuery = { data: body };
        if (method === 'GET') {
            dataQuery = { params: body };
        }
        const response = await axios({
            method,
            url: `${endpoint}`,
            baseURL: API_URL,
            ...dataQuery,
            headers: {
                Authorization: `Bearer ${token}`,
                ...header,
            },
        });
        return response.data;
    } catch (err) {
        let errMsg = 'Có lỗi xảy ra! Vui lòng thử lại sau!';
        if (err.response) {
            const { status } = err.response;
            if (status === 401) {
                errMsg = 'Bạn không có quyền thực hiện tính năng này!';
            }
            if (status === 400) {
                const { msg } = err.response.data;
                if (msg) {
                    errMsg = msg;
                }
            }
            message.error(errMsg);
        }
    }
};
