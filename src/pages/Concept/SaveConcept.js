import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Input, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import StreamUpload from '../../components/StreamUpload';

import { callApi } from '../../utils/callApi';
import { selectFilterOption } from '../../utils/antd-func';
import { useCat } from './hook';

const { OptGroup, Option } = Select;
const SaveConcept = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [catLoading, catObj] = useCat();
    const [videoFilePath, setVideoFilePath] = useState('');
    const [videoFileName, setVideoFileName] = useState('');

    useEffect(() => {
        console.log(id);
        if (id) {
            const getConcept = async () => {
                const response = await callApi(`concept/${id}`);
                if (response && response.success) {
                    //const { data } = response;
                    //const { name, tags, cat_id, video_file_name, video_file_path } = data;
                    form.setFieldsValue({
                        cat: 320,
                        concept: 'concept',
                        tags: ['ádgasdgasdg', 'ádgasd', 'ádgasdg'],
                    });
                    setVideoFileName('slgjaksgja');
                    setVideoFilePath('lskjgalksd');
                }
            };
            getConcept();
        }
    }, [id]);
    const handleSaveConcept = async (values) => {
        const { cat, concept, tags } = values;
        const data = {
            concept,
            tags,
            cat,
            video_file_name: videoFileName,
            video_file_path: videoFilePath,
        };
        //create concept
        if (!id) {
            const response = await callApi('/concept', 'POST', data);
            if (response && response.success) {
                message.success('Thêm mới concept thành công');
                form.resetFields();
            }
        } else {
            //update concept
            //if(videoFileName )
            const response = await callApi(`/concept/${id}`, 'PUT', data);
            if (response && response.success) {
                message.success('Cập nhật concept thành công');
                form.resetFields();
                navigate('/concept');
            }
        }

        console.log([cat, concept, tags, videoFileName, videoFilePath]);
    };

    console.log([videoFileName, videoFilePath]);
    return (
        <Card>
            <Form form={form} onFinish={handleSaveConcept} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} labelWrap>
                <Form.Item label='Chọn môn - lớp' name='cat'>
                    <Select
                        showSearch
                        allowClear
                        loading={catLoading}
                        filterOption={selectFilterOption}
                        placeholder='Tìm kiếm môn-lớp'
                    >
                        {catObj &&
                            Object.keys(catObj)
                                .sort((a, b) => b - a)
                                .map((grade) => {
                                    return (
                                        <OptGroup label={`Lớp ${grade}`} key={grade}>
                                            {catObj[grade].map((gra) => {
                                                const { id, title } = gra;
                                                return (
                                                    <Option value={id} key={id}>
                                                        {title}
                                                    </Option>
                                                );
                                            })}
                                        </OptGroup>
                                    );
                                })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Tên concept'
                    name='concept'
                    rules={[
                        {
                            required: true,
                            message: 'Tên concept không được bỏ trống',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Các từ khóa liên quan'
                    name='tags'
                    extra={
                        'Lưu ý: Các từ khóa liên quan sẽ được dùng để suggest phần lý thuyết liên quan, các từ khóa chỉ chứa các ký tự alphabet và 0-9, dấu cách'
                    }
                >
                    <Select mode='tags' />
                </Form.Item>
                <Form.Item
                    label='File Video'
                    name='fileVideo'
                    rules={[
                        {
                            required: !id,
                            message: 'File video không được bỏ trống',
                        },
                        //{
                        //    validator: async () => {
                        //        if (!videoFileName || !videoFilePath)
                        //            return Promise.reject(new Error('File video không được bỏ trống'));
                        //        else return Promise.resolve(true);
                        //    },
                        //},
                    ]}
                >
                    <StreamUpload handleFileNameChange={setVideoFileName} handleFilePathChange={setVideoFilePath} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type='primary' htmlType='submit'>
                        Lưu concept
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SaveConcept;
