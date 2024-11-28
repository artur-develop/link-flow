import { FC, useState } from 'react';
import {Button} from "@/components";
import {MenuItemContent} from "@/components/MenuItem/MenuItemContent";

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    link: string;
    subItems: { id: number; name: string; link: string }[];
  };
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(prevState => !prevState);

  const handleAddMenuItem = () => {
    return // TODO
  }

  return (
    <div className="rounded border-t border-l border-r">
      <MenuItemContent
        item={item}
        isEditing={isEditing}
        handleEdit={handleEdit}
      />
      <div className="bg-darkGray px-6 py-5 border-b border-t">
        <Button
          onClick={() => {}}
        >
          {'Add menu item'}
        </Button>
      </div>
    </div>
  );
};

export {MenuItem};
