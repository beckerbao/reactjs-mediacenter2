import React from 'react';
import { Row, Col, Card } from 'antd';
import { FolderFilled } from '@ant-design/icons';

interface Folder {
  id: number;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  // 'grid' hoặc 'list'
  viewMode: 'grid' | 'list';
}

const FolderList: React.FC<FolderListProps> = ({ folders, viewMode }) => {
  if (viewMode === 'list') {
    // Hiển thị dạng list
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
          >
            <FolderFilled style={{ fontSize: 24, color: '#faad14', marginRight: 8 }} />
            <span>{folder.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // Mặc định dạng grid
  return (
    <Row gutter={[16, 16]}>
      {folders.map(folder => (
        <Col
          key={folder.id}
          xs={12}
          sm={8}
          md={6}
          lg={4}
          // có thể thêm xl={3} xxl={2} tuỳ nhu cầu
        >
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            bodyStyle={{ padding: 16 }}
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
