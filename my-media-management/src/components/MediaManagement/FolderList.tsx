import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import { FolderFilled } from '@ant-design/icons';

// --- Định nghĩa kiểu dữ liệu ---
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

// --- Props cho FolderList ---
interface FolderListProps {
  folders: FolderItem[];
  viewMode: 'grid' | 'list';
  onDoubleClickFolder: (folder: FolderItem) => void;
  onRightClickFolder?: (e: React.MouseEvent, folder: FolderItem) => void;
  onRenameFolder?: (folder: FolderItem) => void;
  onDeleteFolder?: (folder: FolderItem) => void;
}

// Các cột có thể sort
type SortColumn = 'name' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

const FolderList: React.FC<FolderListProps> = ({
  folders,
  viewMode,
  onDoubleClickFolder,
  onRightClickFolder,
  onRenameFolder,
  onDeleteFolder,
}) => {
  // ================================
  // ========== STATE SORT ==========
  // ================================
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Hàm toggle sort
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Nếu click lại cột cũ => đảo hướng
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Nếu click cột khác => đặt cột mới, reset asc
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort folders dựa vào sortColumn, sortDirection
  const sortedFolders = useMemo(() => {
    const copy = [...folders];
    copy.sort((a, b) => {
      // So sánh theo cột
      if (sortColumn === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // sortColumn === 'updatedAt'
        const aTime = a.updatedAt || '';
        const bTime = b.updatedAt || '';
        return aTime.localeCompare(bTime);
      }
    });
    // Nếu hướng là 'desc', đảo ngược
    if (sortDirection === 'desc') {
      copy.reverse();
    }
    return copy;
  }, [folders, sortColumn, sortDirection]);

  // ================================
  // ========== LIST MODE ===========
  // ================================
  if (viewMode === 'list') {
    return (
      <div>
        {/* Header cho List View */}
        <Row
          style={{
            fontWeight: 'bold',
            borderBottom: '1px solid #eee',
            padding: '8px 0',
          }}
        >
          {/* Cột Name */}
          <Col
            span={6}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('name')}
          >
            Name
            {sortColumn === 'name' && (
              sortDirection === 'asc' ? ' ↑' : ' ↓'
            )}
          </Col>

          {/* Cột Updated At */}
          <Col
            span={4}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('updatedAt')}
          >
            Updated At
            {sortColumn === 'updatedAt' && (
              sortDirection === 'asc' ? ' ↑' : ' ↓'
            )}
          </Col>

          {/* Cột Media Type */}
          <Col span={4}>
            Media Type
          </Col>

          {/* Cột Action */}
          <Col span={4}>
            Action
          </Col>
        </Row>

        {sortedFolders.map(folder => (
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
              {folder.updatedAt || 'N/A'}
            </Col>

            {/* Media Type */}
            <Col span={4}>
              {folder.mediaType || 'Folder'}
            </Col>

            {/* Action */}
            <Col span={4}>
              <Space>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
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

  // ================================
  // ========== GRID MODE ===========
  // ================================
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
