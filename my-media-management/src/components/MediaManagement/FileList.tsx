import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Button, Space, Tooltip } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { FileItem } from './FolderList';
import { Image } from 'antd';

interface FileListProps {
  files: FileItem[];
  viewMode: 'grid' | 'list';
  onRightClickFile?: (e: React.MouseEvent, file: FileItem) => void;
  onRenameFile?: (file: FileItem) => void;
  onDeleteFile?: (file: FileItem) => void;
}

// Hàm kiểm tra mediaType có phải là định dạng ảnh hay không
function isImageType(mediaType?: string) {
    // Thêm dòng log
    // console.log('isImageType checking mediaType:', mediaType);

    if (!mediaType) return false;
    const lower = mediaType.toLowerCase();
    
    return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(lower);
}

// Cột có thể sort
type SortColumn = 'name' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

const FileList: React.FC<FileListProps> = ({
  files,
  viewMode,
  onRightClickFile,
  onRenameFile,
  onDeleteFile,
}) => {
    // ================================
  // ========== STATE SORT ==========
  // ================================
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Toggle sort
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort files
  const sortedFiles = useMemo(() => {
    const copy = [...files];
    copy.sort((a, b) => {
      if (sortColumn === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // sortColumn === 'updatedAt'
        const aTime = a.updatedAt || '';
        const bTime = b.updatedAt || '';
        return aTime.localeCompare(bTime);
      }
    });
    if (sortDirection === 'desc') {
      copy.reverse();
    }
    return copy;
  }, [files, sortColumn, sortDirection]);

  // ===== List Mode =====
  if (viewMode === 'list') {
    return (
      <div>
        {/* Header */}
        <Row
          style={{
            fontWeight: 'bold',
            borderBottom: '1px solid #eee',
            padding: '8px 0',
          }}
        >
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

          <Col span={4}>Media Type</Col>
          <Col span={4}>Action</Col>
        </Row>

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
            {/* Thay icon FileOutlined bằng thumbnail nếu file là ảnh */}
            {isImageType(file.mediaType) ? (
             <Tooltip title={`File: ${file.name}`}>
              <Image
                src="https://www.mockupworld.co/wp-content/uploads/dynamic/2025/03/floating-hardcover-book-free-mockup-536x0-c-default.jpg"
                preview={false}        // Tắt chức năng phóng to khi click
                width={48}
                height={48}
                style={{ objectFit: 'cover' }}
                alt="Thumbnail"
              />
              </Tooltip>
            ) : (
                <Tooltip title={`File: ${file.name}`}>
              <FileOutlined style={{ fontSize: 48 }} />
              </Tooltip>
            )}

            {/* <FileOutlined style={{ fontSize: 48 }} /> */}
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
