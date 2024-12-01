import React, {useState} from 'react';
import {Button, AddEditForm} from "@/components";
import {MenuItem} from "@/types";
import { useDispatch } from 'react-redux';
import { addSubMenuItem, removeMenuItem, updateMenuItem } from '@/redux/slices/menuSlice';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

  const {attributes, listeners, setNodeRef, transition, transform} = useSortable({id: item.id});
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <li className="rounded-t-lg">
      <div
        className="bg-white p-4 flex justify-between items-center border rounded-t-lg bg-orange-100"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
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
        <ul className='pl-4'>
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