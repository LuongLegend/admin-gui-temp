import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Space, Progress, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { UPLOAD_VIDEO_URL } from '../../config/config';
import { callUploadApi } from '../../utils/callApi';
const { Dragger } = Upload;
const chunkSize = 1024 * 1024 * 10; //10 MB
const videoType = [
    'video/mp4',
    'video/ogm',
    'video/wmv',
    'video/mpg',
    'video/webm',
    'video/ogv',
    'video/mov',
    'video/asx',
    'video/mpeg',
    'video/m4v',
    'video/avi',
];

let progress = 0;
let cancelUpload = false;

const StreamUploadVideo = ({ handleFilePathChange, handleFileNameChange, ...restProps }) => {
    const [filePath, setFilePath] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const sendChunk = async (chunk, chunkIndex, chunkQuantity, fileName, filePath, time) => {
        const params = new URLSearchParams();
        params.set('filePath', filePath);
        params.set('name', fileName);
        params.set('currentChunkIndex', chunkIndex);
        params.set('totalChunks', chunkQuantity);
        params.set('time', time);

        const headers = {
            'Content-Type': 'application/octet-stream',
        };

        const result = await callUploadApi(`/stream-upload-video/upload?${params.toString()}`, 'POST', chunk, headers);
        return result;
    };

    const beforeUploadVideo = (file) => {
        const isVideoType = videoType.find((type) => file.type === type);
        if (!isVideoType)
            if (file.type !== 'image/png') {
                message.error(`Chỉ có thể chọn video`);
            }
        return isVideoType ? true : Upload.LIST_IGNORE;
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        setTimeout(async () => {
            if (cancelUpload) {
                onSuccess('ok');
                cancelUpload = false;
                return;
            }
            const { name, size } = file;
            let chunksQuantity = Math.ceil(size / chunkSize);

            const data = { name };
            const result = await callUploadApi('/stream-upload-video/init', 'POST', data);
            if (typeof result === 'undefined') return onError();
            const { filePath, fileName } = result;
            let chunkIndexes = chunksQuantity;
            const currentTime = Date.now();
            for (let chunkIndex = 0; chunkIndex < chunkIndexes; chunkIndex++) {
                const sentSize = chunkIndex * chunkSize;
                const chunk = file.slice(sentSize, sentSize + chunkSize);
                const sendResult = await sendChunk(chunk, chunkIndex, chunksQuantity, fileName, filePath, currentTime);
                //sendChunk error
                if (typeof sendResult === 'undefined') {
                    progress = 0;
                    setUploadProgress(0);
                    setFilePath('');
                    return;
                }

                if (cancelUpload) {
                    onSuccess('ok');
                    cancelUpload = false;
                    progress = 0;
                    setUploadProgress(0);
                    setFilePath('');
                    return;
                }
                progress += chunkSize;
                const percent = Math.floor((progress / size) * 100);
                setUploadProgress(percent);
            }
            //upload success
            if (handleFilePathChange) {
                handleFilePathChange(filePath);
            }
            if (handleFileNameChange) {
                handleFileNameChange(fileName);
            }
            setTimeout(() => {
                setUploadProgress(0);
                setFilePath(filePath);
                progress = 0;
                message.success(`Đăng tải ${name} thành công!.`);
                onSuccess('ok');
            }, 200);
        }, 1000);
    };

    const handleCancelUpload = () => {
        handleFilePathChange('');
        handleFileNameChange('');
        cancelUpload = true;
        message.info(`Đã hủy đăng tải file`);
    };

    return (
        <div>
            <Dragger
                accept='video/*'
                maxCount={1}
                customRequest={customRequest}
                beforeUpload={beforeUploadVideo}
                showUploadList={false}
                disabled={uploadProgress > 0}
                {...restProps}
            >
                <Space>
                    <UploadOutlined style={{ color: 'blue' }} />
                    <span style={{ color: 'blue' }}>Chọn hoặc khéo thả video</span>
                </Space>
            </Dragger>
            {uploadProgress > 0 && (
                <Button danger type='primary' onClick={handleCancelUpload} style={{ width: '100%' }}>
                    Hủy đăng tải
                </Button>
            )}
            {uploadProgress > 0 && <Progress percent={uploadProgress} />}
            <a
                title={`${UPLOAD_VIDEO_URL}/${filePath}`}
                href={`${UPLOAD_VIDEO_URL}/${filePath}`}
                target={'_blank'}
                rel='noreferrer'
            >
                {filePath}
            </a>
        </div>
    );
};

StreamUploadVideo.propTypes = {
    handleFilePathChange: PropTypes.func,
    handleFileNameChange: PropTypes.func,
    restProps: PropTypes.any,
};
export default StreamUploadVideo;
