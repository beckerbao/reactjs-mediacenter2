import React from 'react';
import { Menu, Dropdown } from 'antd';

interface ContextMenuProps {
  onRename: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ onRename, onDelete, children }) => {
  const menu = (
    <Menu>
      <Menu.Item key="rename" onClick={onRename}>
        Đổi tên
      </Menu.Item>
      <Menu.Item key="delete" onClick={onDelete}>
        Xoá
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
