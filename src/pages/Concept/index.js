import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Input, Select, Pagination, Table, Space, Tag, message } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { callApi, callUploadApi } from '../../utils/callApi';
import { selectFilterOption } from '../../utils/antd-func';
import { useCat } from './hook';

const { OptGroup, Option } = Select;
const fakeData = [
    {
        id: 1,
        title: 'Khái niệm bậc 2',
        tags: [
            {
                id: 1,
                title: 'phương trình bậc 2',
            },
            {
                id: 2,
                title: 'tam thức bậc 2',
            },
        ],
    },
];

const ConceptAction = () => {
    const [watermarkLoading, setWatermarkLoading] = useState(false);
    const handleUploadTs247 = async () => {
        const ggCode = localStorage.getItem('gg_code');
        const result = await callUploadApi('/upload-youtube', 'POST', {
            gg_code: ggCode,
        });
        console.log(result);
    };

    const handleAddWatermark = async () => {
        setWatermarkLoading(true);
        const dataRequest = {
            //file_path: '2022/0302/thatmuonyeuthuong.mp4',
            file_path:
                '2022/0302/[HD]_Quan_vuong_va_hanh_khat_-_Hoa_Than_Vu_-_华晨宇_[Mars_Concer_20150802]_1646197918_47.mp4',
            file_name: '_Quan_vuong_va_hanh_khat_.mp4',
        };
        const res = await callUploadApi('/watermark/ts247/1920/1080', 'POST', dataRequest);
        setWatermarkLoading(false);
        if (!res) return;
        message.success('Thêm watermark thành công!');
    };

    return (
        <>
            <Button type='primary' onClick={handleUploadTs247}>
                upload yt
            </Button>
            <br />
            <Button type='primary' onClick={handleAddWatermark} style={{ marginTop: 10 }} loading={watermarkLoading}>
                Add watermark
            </Button>
        </>
    );
};
const Concept = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [catLoading, catObj] = useCat();

    const columns = useMemo(
        () => [
            {
                key: 'concept',
                title: 'Tên concept',
                width: 300,
                render: (text) => {
                    const { title } = text;
                    return title;
                },
            },
            {
                key: 'keyword',
                title: 'Từ khóa',
                render: (text) => {
                    const { tags } = text;
                    return (
                        <>
                            {tags.map((tag, index) => {
                                const { title } = tag;
                                return (
                                    <Tag key={index} color='#2db7f5' style={{ marginBottom: 4 }}>
                                        {title}
                                    </Tag>
                                );
                            })}
                        </>
                    );
                },
            },
            {
                key: 'watermark',
                title: 'Trạng thái watermark',
                children: [
                    {
                        key: 'Ts247',
                        title: 'Ts247',
                        width: 80,
                        render: () => {
                            return <ConceptAction />;
                        },
                    },
                    {
                        key: 'Hd247',
                        title: 'Hd247',
                        width: 80,
                    },
                    {
                        key: 'Vo',
                        title: 'Vừng ơi',
                        width: 80,
                    },
                    {
                        key: 'LGH',
                        title: 'LGH',
                        width: 80,
                    },
                ],
            },
            {
                key: 'action',
                title: 'Thao tác',
                width: 120,
                render: () => {
                    return (
                        <Button type='primary' onClick={handleAuthGoogle}>
                            Login yt
                        </Button>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        const getData = async () => {
            const res = await callApi('/concept', 'GET');
            console.log(res);
            setTotal(450);
            setData(fakeData);
            setDataLoading(false);
        };
        getData();
    }, []);
    const handleAddClick = () => {
        navigate('/concept/add');
    };

    const handleAuthGoogle = async () => {
        const getAuthUrl = await callUploadApi('/gg-auth', 'GET');
        if (!getAuthUrl) return;
        const { url } = getAuthUrl;
        window.location.href = url;
    };

    return (
        <>
            <Card>
                <Form form={form}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label='Từ khóa' name='keyword'>
                                <Input placeholder={'Tên concept'} autoFocus />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Môn - Lớp' name='catId'>
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
                        </Col>
                    </Row>
                    <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
                        Tìm kiếm
                    </Button>
                </Form>
            </Card>
            <Card>
                <Row justify='space-between'>
                    <Col>
                        Tìm thấy <b>{total}</b> kết quả
                    </Col>
                    <Col style={{ display: 'flex' }}>
                        <Space>
                            <Button type='primary' onClick={handleAddClick} icon={<PlusCircleOutlined />}>
                                Thêm mới concept
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Table
                    rowKey={(record) => record.id}
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    style={{ padding: '20px 0' }}
                    //scroll={{ y: 600 }}
                    loading={dataLoading}
                />
                <Row justify='end'>
                    <Pagination
                        showQuickJumper
                        showSizeChanger
                        //onChange={handleSearch}
                        //onShowSizeChange={handleSearch}
                        total={total}
                        pageSizeOptions={['10', '20', '50']}
                        //current={currentPage}
                        //defaultPageSize={ROWS_PER_PAGE}
                    />
                </Row>
            </Card>
        </>
    );
};

export default Concept;
