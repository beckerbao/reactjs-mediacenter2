import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadMedia: React.FC = () => {
  const props = {
    name: 'file',
    action: '', // Đây là URL tải lên nếu có backend; để trống để demo
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} tải lên thành công.`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} tải lên thất bại.`);
      }
    },
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Tải lên tệp</Button>
      </Upload>
    </div>
  );
};

export default UploadMedia;
