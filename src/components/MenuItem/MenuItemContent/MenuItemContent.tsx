import React, {useState} from 'react';
import {Button, AddEditForm} from "@/components";
import {MenuItem} from "@/types";
import { useDispatch } from 'react-redux';
import { addSubMenuItem, removeMenuItem, updateMenuItem } from '@/redux/slices/menuSlice';

interface MenuItemContent {
  item: MenuItem;
}

const MenuItemContent = (props: MenuItemContent) => {
  const dispatch = useDispatch();
  const {
    item
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);

  const handleEdit = () => setIsEditing(prevState => !prevState);
  const handleAdd = () => setIsAddingSubItem(prevState => !prevState);

  const handleSave = (updatedData: { name: string; link: string }) => {
    const updatedItem: MenuItem = {
      ...item,
      name: updatedData.name,
      link: updatedData.link,
    };

    // Find which array contains this item
    const findArrayIndex = (items: MenuItem[][]): number => {
      for (let i = 0; i < items.length; i++) {
        const found = items[i].some(menuItem => menuItem.id === item.id);
        if (found) return i;
      }
      return 0;
    };

    dispatch(updateMenuItem({ 
      item: updatedItem, 
      id: item.id 
    }));
    setIsEditing(false);
  };

  const handleAddSubItem = (formData: { name: string; link: string }) => {
    const newSubItem: MenuItem = {
      id: Date.now(),
      name: formData.name,
      link: formData.link,
      subItems: []
    };
    
    dispatch(addSubMenuItem({ parentId: item.id, newItem: newSubItem }));
    setIsAddingSubItem(false);
  };

  const handleDelete = () => {
    dispatch(removeMenuItem({ id: item.id }));
  };

  return (
    <li className="rounded">
      <div className="bg-white p-4 flex justify-between items-center border">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-gray-500">{item.link}</p>
        </div>
        <div className="flex">
          <Button
            variant={'grey'}
            onClick={handleEdit}
            position={'left'}
          >
            {'Edit'}
          </Button>
          <Button
            variant={'grey'}
            onClick={handleDelete}
            position={'center'}
          >
            {'Delete'}
          </Button>
          <Button
            variant={'grey'}
            onClick={() => setIsAddingSubItem(true)}
            position={'right'}
          >
            {'Add menu item lower level'}
          </Button>
        </div>
      </div>
      {isEditing && (
        <AddEditForm
          initialData={item}
          onSave={handleSave}
          onCancel={handleEdit}
        />
      )}
      {isAddingSubItem && (
        <AddEditForm
          onSave={handleAddSubItem}
          onCancel={handleAdd}
        />
      )}
      {Array.isArray(item.subItems) && item.subItems.length > 0 && (
        <ul className={'pl-4'}>
          {item.subItems.map((sub) => (
            <MenuItemContent
              key={sub.id}
              item={sub}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export {MenuItemContent};