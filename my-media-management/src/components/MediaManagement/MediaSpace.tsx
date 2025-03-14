import React, { useState } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Layout,
  Menu,
  Progress,
  Row,
  Space,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  UploadOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import FolderList from './FolderList';
import FileList from './FileList';

const { Header, Content } = Layout;
const { Search } = Input;

// Dữ liệu giả cho folder
const mockFolders = [
  { id: 1, name: 'Marker Pens' },
  { id: 2, name: 'T-Shirt' },
  { id: 3, name: 'Coffee Mug' },
  { id: 4, name: 'Laser Pointer' },
  { id: 5, name: 'Coaster' },
  { id: 6, name: 'Maxi Dress' },
];

// Dữ liệu giả cho file
const mockFiles = [
  { id: 1, name: 'image1.jpg' },
  { id: 2, name: 'document.pdf' },
  { id: 3, name: 'video.mp4' },
];

// Kiểu hiển thị (Grid/List)
type ViewMode = 'grid' | 'list';

const MediaSpace: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Lọc folder/file theo searchText
  const filteredFolders = mockFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Xử lý click folder
  const handleFolderClick = (folder: { id: number; name: string }) => {
    alert(`Clicked folder: ${folder.name}`);
  };

  // Xử lý click file
  const handleFileClick = (file: { id: number; name: string }) => {
    alert(`Clicked file: ${file.name}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header (Menu) */}
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        <Menu mode="horizontal" defaultSelectedKeys={['media-space']}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="shop-decoration">Shop Decoration</Menu.Item>
          <Menu.Item key="media-space">Media Space</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ margin: '16px' }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Shop Decoration</Breadcrumb.Item>
          <Breadcrumb.Item>Media Space</Breadcrumb.Item>
        </Breadcrumb>

        {/* Thanh Search & Reset */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Search
                placeholder="Search"
                allowClear
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
              <Button icon={<ReloadOutlined />} onClick={() => setSearchText('')}>
                Reset
              </Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <span>Capacity: 0.4/30GB</span>
              <Progress
                percent={(0.4 / 30) * 100}
                showInfo={false}
                style={{ width: 80 }}
              />
            </Space>
          </Col>
        </Row>

        {/* Thanh Create Folder & Upload, nút chuyển Grid/List */}
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => alert('Create new folder')}
              >
                Create New Folder
              </Button>
              <Button
                type="default"
                icon={<UploadOutlined />}
                onClick={() => alert('Upload Media File')}
              >
                Upload Media File
              </Button>
            </Space>
          </Col>

          <Col>
            <Space>
              <Button
                type={viewMode === 'grid' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('list')}
              />
            </Space>
          </Col>
        </Row>

        {/* Khu vực hiển thị (ví dụ chia 2 cột: FolderList bên trái, FileList bên phải) */}
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <h3>Folders</h3>
                <FolderList folders={filteredFolders} viewMode={viewMode} />
            </Col>
            <Col xs={24} md={12}>
                <h3>Files</h3>
                <FileList files={filteredFiles} viewMode={viewMode} />
            </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MediaSpace;
