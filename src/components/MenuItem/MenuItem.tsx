import {Button} from "@/components";
import {MenuItemContent} from "@/components/MenuItem/MenuItemContent";
import {MenuItem as MenuItemType} from "@/types";
import { useState } from 'react';
import { AddEditForm } from "@/components/AddEditForm";
import { useDispatch } from 'react-redux';
import { addMenuItem } from '@/redux/slices/menuSlice';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => {

  return (
    <div className="rounded border-t border-l border-r">
      <MenuItemContent
        item={item}
      />
    </div>
  );
};

export {MenuItem};
