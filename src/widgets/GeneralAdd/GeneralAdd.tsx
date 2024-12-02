'use client'

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components";
import { AddEditForm } from "@/widgets";
import { RootState } from "@/redux/store";
import { CreateItemT } from "@/types";
import { PlusCircledIcon } from "@/assets";
import { texts } from '@/constants';

const GeneralAdd = () => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const menus = useSelector((state: RootState) => state.links);

  const handleAddMenuItem = () => {
    setIsAdding(prev => !prev);
  }

  const handleSaveNewItem = (menuId: number, item: CreateItemT) => {
    const newMenuId = menus.length > 0 
      ? Math.max(...menus.map(menu => menu.id)) + 1 
      : 1;

    dispatch({
      type: 'links/addMenu',
      payload: {
        id: newMenuId,
        items: [{
          id: Date.now(),
          name: item.name,
          link: item.link,
          subItems: [],
          menuId: newMenuId
        }]
      }
    });
    
    setIsAdding(false);
  }

  const newMenuId = menus.length > 0 
    ? Math.max(...menus.map(menu => menu.id)) + 1 
    : 1;

  return (
    <div className="flex flex-col gap-y-4 w-full items-center rounded-lg py-8 text-center">
      {menus.length === 0 ? 
        <div className="flex flex-col p-8 gap-y-4 w-full items-center bg-lightGray rounded-lg text-center gap-y-1">
          <h2 className="text-lg font-medium">{texts.generalAdd.emptyMenuTitle}</h2>
          <p className="text-gray-500">{texts.generalAdd.emptyMenuDescription}</p>
          <Button
            onClick={handleAddMenuItem}
            variant="purple"
            border={false}
          >
            <PlusCircledIcon className="w-4 h-4"/>
            {texts.generalAdd.addMenu}
          </Button>
        </div> :
        <Button
          onClick={handleAddMenuItem}
          variant="purple"
          border={false}
        >
          <PlusCircledIcon className="w-4 h-4"/>
          {texts.generalAdd.addMenu}
        </Button>
      }

      {isAdding && (
        <AddEditForm
          menuId={newMenuId}
          onSave={handleSaveNewItem}
          onCancel={handleAddMenuItem}
        />
      )}
    </div>
  );
};

export { GeneralAdd };