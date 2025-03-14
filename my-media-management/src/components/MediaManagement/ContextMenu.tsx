// src/components/MediaManagement/ContextMenu.tsx

import React from 'react';

interface ContextMenuProps {
  visible: boolean;                  // Hiển thị hay không
  x: number;                         // Vị trí chuột X
  y: number;                         // Vị trí chuột Y
  targetType: 'folder' | 'file' | null; // Đối tượng bị click (folder hay file)
  targetName: string;               // Tên folder/file
  onRename: (type: 'folder' | 'file', name: string) => void;
  onDelete: (type: 'folder' | 'file', name: string) => void;
  onClose: () => void;              // Đóng context menu
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  targetType,
  targetName,
  onRename,
  onDelete,
  onClose,
}) => {
  // Nếu không visible thì return null
  if (!visible) {
    return null;
  }

  const handleRename = () => {
    if (targetType) {
      onRename(targetType, targetName);
    }
    onClose();
  };

  const handleDelete = () => {
    if (targetType) {
      onDelete(targetType, targetName);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        background: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        zIndex: 9999,
      }}
      // Để tránh context menu không đóng nếu click ra ngoài
      // ta có thể dùng onClickCapture, onBlur, v.v. Tuỳ ý
    >
      <ul style={{ margin: 0, padding: '8px 0', listStyle: 'none', minWidth: 120 }}>
        <li
          style={{ padding: '4px 12px', cursor: 'pointer' }}
          onClick={handleRename}
        >
          Đổi tên
        </li>
        <li
          style={{ padding: '4px 12px', cursor: 'pointer' }}
          onClick={handleDelete}
        >
          Xoá
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
