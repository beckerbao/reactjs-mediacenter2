import React from 'react';
import UploadMedia from './UploadMedia';
import FolderList from './FolderList';
import FileList from './FileList';

const MediaManagement: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Media Management</h1>
      {/* Phần tải lên */}
      <UploadMedia />
      
      <div style={{ display: 'flex', marginTop: 20 }}>
        {/* Cột danh sách Folder */}
        <div style={{ width: '30%', marginRight: 20 }}>
          <FolderList />
        </div>
        
        {/* Cột danh sách File */}
        <div style={{ width: '70%' }}>
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;
