import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import { FolderFilled } from '@ant-design/icons';

export interface FileItem {
  id: number;
  name: string;
  type: 'file';
  mediaType?: string;
  updatedAt?: string;
}

export interface FolderItem {
  id: number;
  name: string;
  type: 'folder';
  mediaType?: string;
  updatedAt?: string;
  children: Array<FolderItem | FileItem>;
}

interface FolderListProps {
  folders: FolderItem[];
  viewMode: 'grid' | 'list';
  onDoubleClickFolder: (folder: FolderItem) => void;
  onRightClickFolder?: (e: React.MouseEvent, folder: FolderItem) => void;
  onRenameFolder?: (folder: FolderItem) => void; // hàm xử lý đổi tên
  onDeleteFolder?: (folder: FolderItem) => void; // hàm xử lý xóa
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  viewMode,
  onDoubleClickFolder,
  onRightClickFolder,
  onRenameFolder,
  onDeleteFolder,
}) => {
  // ===== List Mode =====
  if (viewMode === 'list') {
    return (
      <div>
        {/* Header (tuỳ ý) */}
        <Row
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
        </Row>

        {folders.map(folder => (
          <Row
            key={folder.id}
            style={{
              borderBottom: '1px solid #eee',
              padding: '8px 0',
              cursor: 'pointer',
            }}
            onDoubleClick={() => onDoubleClickFolder(folder)}
            onContextMenu={onRightClickFolder ? (e) => onRightClickFolder(e, folder) : undefined}
            title="Double Click / Right Click"
            align="middle"
          >
            {/* Name */}
            <Col span={6}>
              <FolderFilled style={{ fontSize: 20, color: '#faad14', marginRight: 8 }} />
              <span>{folder.name}</span>
            </Col>

            {/* Updated At */}
            <Col span={4}>
              {folder.updatedAt ? folder.updatedAt : 'N/A'}
            </Col>

            {/* Media Type */}
            <Col span={4}>
              {folder.mediaType ? folder.mediaType : 'Folder'}
            </Col>

            {/* Action */}
            <Col span={4}>
              <Space>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // tránh double click folder
                    onRenameFolder && onRenameFolder(folder);
                  }}
                >
                  Đổi tên
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder && onDeleteFolder(folder);
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
      {folders.map(folder => (
        <Col key={folder.id} xs={12} sm={8} md={6} lg={4}>
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
            onDoubleClick={() => onDoubleClickFolder(folder)}
            onContextMenu={onRightClickFolder ? (e) => onRightClickFolder(e, folder) : undefined}
            title="Double Click / Right Click"
          >
            <FolderFilled style={{ fontSize: 48, color: '#faad14' }} />
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
              {folder.name}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FolderList;
