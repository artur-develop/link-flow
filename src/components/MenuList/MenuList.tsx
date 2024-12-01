import { MenuItem, Button, AddEditForm } from "@/components";
import { addMenuItem } from "@/redux/slices/menuSlice";
import { MenuItem as MenuItemType } from '@/types';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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

  // Create a flattened array of all item IDs, including nested ones
  const getAllItemIds = (items: MenuItemType[]): number[] => {
    return items.reduce((acc: number[], item) => {
      acc.push(item.id);
      if (item.subItems.length > 0) {
        acc.push(...getAllItemIds(item.subItems));
      }
      return acc;
    }, []);
  };

  const sortableIds = getAllItemIds(menuItems);

  return (
    <ul className='flex flex-col border border-black rounded-lg'>
      <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item}/>
        ))}
      </SortableContext>
      {showAddForm && (
        <AddEditForm
          onSave={handleAddMenuItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      <div className="bg-darkGray px-6 py-5 border-t border-black rounded-b-lg">
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
