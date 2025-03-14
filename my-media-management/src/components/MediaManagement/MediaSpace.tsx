// src/components/MediaManagement/MediaSpace.tsx

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Input,
  Button,
  Space,
  Progress,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  UploadOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import FolderList, { FolderItem, FileItem } from './FolderList';
import FileList from './FileList';
import ContextMenu from './ContextMenu';

const { Header, Content } = Layout;
const { Search } = Input;

// -- Kiểu hiển thị (grid / list) --
type ViewMode = 'grid' | 'list';

// -- Mock data: Folder nhiều cấp (tree) --
const mockRoot: FolderItem = {
  id: 1,
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 2,
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 5, name: 'CV.pdf', type: 'file' },
        {
          id: 6,
          name: 'Project',
          type: 'folder',
          children: [
            { id: 7, name: 'proposal.docx', type: 'file' },
            { id: 8, name: 'budget.xlsx', type: 'file' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Images',
      type: 'folder',
      children: [
        { id: 9, name: 'logo.png', type: 'file' },
        { id: 10, name: 'banner.jpg', type: 'file' },
      ],
    },
    {
      id: 4,
      name: 'readme.txt',
      type: 'file',
    },
  ],
};

const MediaSpace: React.FC = () => {
  // -- 1) State quản lý đường dẫn (path) từ Root -> Folder hiện tại --
  const [path, setPath] = useState<FolderItem[]>([mockRoot]);

  // -- 2) State cho tìm kiếm --
  const [searchText, setSearchText] = useState('');

  // -- 3) State cho chế độ xem (Grid/List) --
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // -- 4) State cho context menu --
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [contextMenuTargetType, setContextMenuTargetType] = useState<'folder' | 'file' | null>(null);
  const [contextMenuTargetName, setContextMenuTargetName] = useState('');

  // -- Folder hiện tại = phần tử cuối cùng trong path --
  const currentFolder = path[path.length - 1];

  // Tách children của currentFolder thành folder và file
  const childFolders = currentFolder.children.filter(
    (item) => item.type === 'folder'
  ) as FolderItem[];

  const childFiles = currentFolder.children.filter(
    (item) => item.type === 'file'
  ) as FileItem[];

  // -- Lọc theo searchText (chỉ lọc trong folder hiện tại) --
  const filteredFolders = childFolders.filter((folder) =>
    folder.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredFiles = childFiles.filter((file) =>
    file.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // =========================
  // ========== XỬ LÝ =========
  // =========================

  // (A) Double click folder => đi vào folder con
  const handleFolderDoubleClick = (folder: FolderItem) => {
    setPath((prev) => [...prev, folder]);
  };

  // (B) Click breadcrumb => cắt path
  const handleBreadcrumbClick = (index: number) => {
    setPath((prev) => prev.slice(0, index + 1));
  };

  // (C) Tạo folder (mock)
  const handleCreateFolder = () => {
    alert('Tạo folder (mock). Thêm logic nếu cần');
  };

  // (D) Upload file (mock)
  const handleUploadFile = () => {
    alert('Upload file (mock). Thêm logic nếu cần');
  };

  // (E) Reset search
  const handleResetSearch = () => {
    setSearchText('');
  };

  // ==============================
  // ========== CONTEXT MENU ======
  // ==============================

  // Khi người dùng click chuột phải vào folder
  const handleContextMenuFolder = (e: React.MouseEvent, folder: FolderItem) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuX(e.clientX);
    setContextMenuY(e.clientY);
    setContextMenuTargetType('folder');
    setContextMenuTargetName(folder.name);
  };

  // Khi người dùng click chuột phải vào file
  const handleContextMenuFile = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuX(e.clientX);
    setContextMenuY(e.clientY);
    setContextMenuTargetType('file');
    setContextMenuTargetName(file.name);
  };

  // Hàm xử lý khi bấm "Đổi tên" trong context menu
  const handleRename = (type: 'folder' | 'file', name: string) => {
    alert(`Đổi tên ${type} "${name}" (mock)`);
  };

  // Hàm xử lý khi bấm "Xoá" trong context menu
  const handleDelete = (type: 'folder' | 'file', name: string) => {
    alert(`Xoá ${type} "${name}" (mock)`);
  };

  // Đóng context menu
  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} onClick={() => closeContextMenu()}>
      {/* Header */}
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        <Menu mode="horizontal" defaultSelectedKeys={['media-space']}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="shop-decoration">Shop Decoration</Menu.Item>
          <Menu.Item key="media-space">Media Space</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ margin: '16px', position: 'relative' }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          {path.map((folder, idx) => (
            <Breadcrumb.Item key={folder.id}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleBreadcrumbClick(idx)}
              >
                {folder.name}
              </span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        {/* Thanh Search & Reset + Dung lượng */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Search
                placeholder="Search folder/file"
                allowClear
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
              <Button icon={<ReloadOutlined />} onClick={handleResetSearch}>
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

        {/* Nút Tạo folder, Upload, và chuyển Grid/List */}
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateFolder}
              >
                Create New Folder
              </Button>
              <Button
                type="default"
                icon={<UploadOutlined />}
                onClick={handleUploadFile}
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

        {/* Hiển thị FolderList và FileList (theo viewMode, search filter) */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {/* Folders */}
            <FolderList
              folders={filteredFolders}
              viewMode={viewMode}
              onDoubleClickFolder={handleFolderDoubleClick}
              onRightClickFolder={handleContextMenuFolder}
            />
          </Col>
          <Col span={24}>
            {/* Files */}
            <FileList
              files={filteredFiles}
              viewMode={viewMode}
              onRightClickFile={handleContextMenuFile}
            />
          </Col>
        </Row>

        {/* Context Menu */}
        <ContextMenu
          visible={contextMenuVisible}
          x={contextMenuX}
          y={contextMenuY}
          targetType={contextMenuTargetType}
          targetName={contextMenuTargetName}
          onRename={handleRename}
          onDelete={handleDelete}
          onClose={closeContextMenu}
        />
      </Content>
    </Layout>
  );
};

export default MediaSpace;
