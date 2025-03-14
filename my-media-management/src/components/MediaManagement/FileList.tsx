import React from 'react';
import { Row, Col, Card } from 'antd';
import { FileOutlined } from '@ant-design/icons';

interface FileItem {
  id: number;
  name: string;
}

interface FileListProps {
  files: FileItem[];
  viewMode: 'grid' | 'list';
  onFileClick?: (file: FileItem) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  viewMode,
  onFileClick,
}) => {
  const handleFileClick = (file: FileItem) => {
    if (onFileClick) {
      onFileClick(file);
    }
  };

  if (viewMode === 'list') {
    // Hiển thị dạng List
    return (
      <div>
        {files.map(file => (
          <div
            key={file.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              padding: '8px 0',
              cursor: 'pointer',
            }}
            onClick={() => handleFileClick(file)}
          >
            <FileOutlined style={{ fontSize: 24, marginRight: 8 }} />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // Mặc định là hiển thị dạng Grid
  return (
    <Row gutter={[16, 16]}>
      {files.map(file => (
        <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            bodyStyle={{ padding: 16 }}
            onClick={() => handleFileClick(file)}
          >
            <FileOutlined style={{ fontSize: 48 }} />
            <div style={{ marginTop: 8 }}>{file.name}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FileList;
