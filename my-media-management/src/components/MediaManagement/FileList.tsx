import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { FileItem } from './FolderList';

interface FileListProps {
  files: FileItem[];
  viewMode: 'grid' | 'list';
  onRightClickFile?: (e: React.MouseEvent, file: FileItem) => void;
  onRenameFile?: (file: FileItem) => void;
  onDeleteFile?: (file: FileItem) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  viewMode,
  onRightClickFile,
  onRenameFile,
  onDeleteFile,
}) => {
  // ===== List Mode =====
  if (viewMode === 'list') {
    return (
      <div>
        {/* Header */}
        {/* <Row
          style={{
            fontWeight: 'bold',
            borderBottom: '1px solid #eee',
            padding: '8px 0',
          }}
        >
          <Col span={6}>Name</Col>
          <Col span={4}>Updated At</Col>
          <Col span={4}>Media Type</Col>
          <Col span={4}>Action</Col>
        </Row> */}

        {files.map(file => (
          <Row
            key={file.id}
            style={{
              borderBottom: '1px solid #eee',
              padding: '8px 0',
              cursor: 'default',
            }}
            onContextMenu={onRightClickFile ? (e) => onRightClickFile(e, file) : undefined}
            title="Right Click"
            align="middle"
          >
            {/* Name */}
            <Col span={6}>
              <FileOutlined style={{ fontSize: 20, marginRight: 8 }} />
              <span>{file.name}</span>
            </Col>

            {/* Updated At */}
            <Col span={4}>
              {file.updatedAt ? file.updatedAt : 'N/A'}
            </Col>

            {/* Media Type */}
            <Col span={4}>
              {file.mediaType ? file.mediaType : 'File'}
            </Col>

            {/* Action */}
            <Col span={4}>
              <Space>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRenameFile && onRenameFile(file);
                  }}
                >
                  Đổi tên
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile && onDeleteFile(file);
                  }}
                >
                  Xoá
                </Button>
              </Space>
            </Col>
          </Row>
        ))}
      </div>
    );
  }

  // ===== Grid Mode (giữ nguyên code cũ của bạn) =====
  return (
    <Row gutter={[146, 16]}>
      {files.map(file => (
        <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            style={{
              width: 120,
              height: 160,
              textAlign: 'center',
            }}
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 16,
            }}
            onContextMenu={onRightClickFile ? (e) => onRightClickFile(e, file) : undefined}
            title="Right Click"
          >
            <FileOutlined style={{ fontSize: 48 }} />
            <div
              style={{
                marginTop: 8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
                lineHeight: '1.2em',
              }}
            >
              {file.name}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FileList;
