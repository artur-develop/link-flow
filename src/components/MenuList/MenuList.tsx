import { MenuItem, Button, AddEditForm } from "@/components";
import { addMenuItem } from "@/redux/slices/menuSlice";
import { MenuItem as MenuItemType } from '@/types';
import { useState } from "react";
import { useDispatch } from "react-redux";

interface MenuListProps {
  menuItems: MenuItemType[];
  arrayIndex: number;
}

const MenuList = ({ menuItems, arrayIndex }: MenuListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const handleAddMenuItem = (formData: { name: string; link: string }) => {
    const newMenuItem: MenuItemType = {
      id: Date.now(),
      name: formData.name,
      link: formData.link,
      subItems: []
    };
    
    dispatch(addMenuItem({ item: newMenuItem, arrayIndex }));
    setShowAddForm(false);
  };

  return (
    <ul className='flex flex-col'>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item}/>
      ))}
      {showAddForm && (
        <AddEditForm
          onSave={handleAddMenuItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      <div className="bg-darkGray px-6 py-5 border-b border-t">
        <Button
          onClick={() => setShowAddForm(true)}
        >
          {'Add menu item same level'}
        </Button>
      </div>
    </ul>
  );
};

export {MenuList};
