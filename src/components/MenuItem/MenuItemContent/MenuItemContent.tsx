import React from 'react';
import {Button} from "@/components";

interface MenuItemContent {
  item: {
    id: number;
    name: string;
    link: string;
    subItems: { id: number; name: string; link: string }[];
  };
  isEditing: boolean;
  handleEdit: () => void;
}

const MenuItemContent = (props: MenuItemContent) => {
  const {
    item,
    isEditing,
    handleEdit,
  } = props;

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
            onClick={handleEdit}
            position={'center'}
          >
            {'Delete'}
          </Button>
          <Button
            variant={'grey'}
            onClick={handleEdit}
            position={'right'}
          >
            {'Add menu item'}
          </Button>
        </div>
      </div>
      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Nazwa"
            className="border p-2 rounded w-full mb-2"
            defaultValue={item.name}
          />
          <input
            type="text"
            placeholder="Link"
            className="border p-2 rounded w-full mb-2"
            defaultValue={item.link}
          />
          <button className="bg-purple-600 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      )}
      {Array.isArray(item.subItems) && item.subItems.length > 0 && (
        <ul className={'pl-4'}>
          {item.subItems.map((sub) => (
            <MenuItemContent
              key={sub.id}
              item={sub}
              isEditing={isEditing}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export {MenuItemContent};