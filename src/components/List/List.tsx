'use client'

import React, {useState} from 'react';
import {AddEditForm, Button, Link} from "@/components";
import {CreateItemT, Menu, MenuItem as MenuItemT} from "@/types";
import {SortableTree} from 'dnd-kit-sortable-tree';
import { updateMenuItems, addMenuItem } from '@/redux/slices/linkSlice';
import { useDispatch } from 'react-redux';
import { PointerSensor } from '@dnd-kit/core';
import { texts } from '@/constants';
type ListProps = {
  links: Menu;
}

const List = ({ links } : ListProps) => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);

  const prepareItems = (items: MenuItemT[]): MenuItemT[] => {
    return items.map(item => ({
      ...item,
      children: item.subItems.length > 0 ? prepareItems(item.subItems) : undefined
    }));
  };

  const revertItems = (items: MenuItemT[]): MenuItemT[] => {
    return items.map(item => {
      const newItem = { ...item };
      if (newItem.children) {
        newItem.subItems = revertItems(newItem.children);
        delete newItem.children;
      }
      return newItem;
    });
  };

  const handleChangeArray = (id: number, newItems: MenuItemT[]) => {
    const revertedItems = revertItems(newItems);
    dispatch(updateMenuItems({ id, items: revertedItems }));
  };

  const handleAddMenuItem = (id: number, item: CreateItemT) => {
    dispatch(addMenuItem({ id, item }));
    setShowAddForm(false);
  };

  const preparedItems = prepareItems(links.items);

  return (
    <div className='flex flex-col border border-black rounded-lg overflow-hidden'>
      <SortableTree
        items={preparedItems}
        onItemsChanged={(newItems) => handleChangeArray(links.id, newItems)}
        TreeItemComponent={Link}
        indentationWidth={50}
        dndContextProps={{
          sensors: [
            {
              sensor: PointerSensor,
              options: {
                activationConstraint: {
                  delay: 150,
                  tolerance: 1,
                  distance: 8,
                },
              },
            },
          ],
        }}
      />
      {showAddForm && (
        <AddEditForm
          menuId={links.id}
          onSave={handleAddMenuItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      <div className="bg-darkGray px-6 py-5 border-t rounded-b-lg">
        <Button
          onClick={() => setShowAddForm(true)}
        >
          {texts.link.add}
        </Button>
      </div>
    </div>
  );
};

export {List};