// src/components/MediaManagement/ContextMenu.tsx
import React from 'react';

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  targetType: 'folder' | 'file' | null;
  targetName: string;
  onRename: (type: 'folder' | 'file', name: string) => void;
  onDelete: (type: 'folder' | 'file', name: string) => void;
  onClose: () => void;
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
  if (!visible) return null;

  const handleRename = () => {
    if (targetType) onRename(targetType, targetName);
    onClose();
  };

  const handleDelete = () => {
    if (targetType) onDelete(targetType, targetName);
    onClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: y - 55,    // hoặc y + 5 nếu muốn lệch xuống chút
        left: x -15,   // hoặc x + 5 nếu muốn lệch sang phải chút
        background: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        zIndex: 9999,
      }}
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
