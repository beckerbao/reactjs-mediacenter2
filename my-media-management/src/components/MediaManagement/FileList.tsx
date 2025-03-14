// src/components/MediaManagement/FileList.tsx

import React from 'react';
import { Row, Col, Card } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { FileItem } from './FolderList';

// -- Props cho FileList --
interface FileListProps {
  files: FileItem[];
  viewMode: 'grid' | 'list';
  onRightClickFile: (e: React.MouseEvent, file: FileItem) => void;
}

const FileList: React.FC<FileListProps> = ({ files, viewMode, onRightClickFile }) => {
  // Dạng List
  if (viewMode === 'list') {
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
              cursor: 'default',
            }}
            onContextMenu={(e) => onRightClickFile(e, file)}
            title="Right Click for context menu"
          >
            <FileOutlined style={{ fontSize: 24, marginRight: 8 }} />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // Dạng Grid
  return (
    <Row gutter={[16, 16]}>
      {files.map(file => (
        <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            bodyStyle={{ padding: 16 }}
            onContextMenu={(e) => onRightClickFile(e, file)}
            title="Right Click for context menu"
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
