// src/components/MediaManagement/FolderList.tsx

import React from 'react';
import { Row, Col, Card } from 'antd';
import { FolderFilled } from '@ant-design/icons';

// -- Định nghĩa kiểu dữ liệu --
export interface FileItem {
  id: number;
  name: string;
  type: 'file';
}

export interface FolderItem {
  id: number;
  name: string;
  type: 'folder';
  children: Array<FolderItem | FileItem>;
}

// -- Props cho FolderList --
interface FolderListProps {
  folders: FolderItem[];
  viewMode: 'grid' | 'list';
  onDoubleClickFolder: (folder: FolderItem) => void;
  onRightClickFolder: (e: React.MouseEvent, folder: FolderItem) => void; 
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  viewMode,
  onDoubleClickFolder,
  onRightClickFolder,
}) => {
  // Dạng List
  if (viewMode === 'list') {
    return (
      <div>
        {folders.map(folder => (
          <div
            key={folder.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              padding: '8px 0',
              cursor: 'pointer',
            }}
            onDoubleClick={() => onDoubleClickFolder(folder)}
            onContextMenu={(e) => onRightClickFolder(e, folder)}
            title="Double Click to open folder / Right Click for context menu"
          >
            <FolderFilled style={{ fontSize: 24, color: '#faad14', marginRight: 8 }} />
            <span>{folder.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // Dạng Grid
  return (
    <Row gutter={[16, 16]}>
      {folders.map(folder => (
        <Col key={folder.id} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            bodyStyle={{ padding: 16 }}
            onDoubleClick={() => onDoubleClickFolder(folder)}
            onContextMenu={(e) => onRightClickFolder(e, folder)}
            title="Double Click to open folder / Right Click for context menu"
          >
            <FolderFilled style={{ fontSize: 48, color: '#faad14' }} />
            <div style={{ marginTop: 8 }}>{folder.name}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FolderList;
