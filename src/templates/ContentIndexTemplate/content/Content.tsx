'use client';

import React, { useState } from 'react';
import { GeneralAdd, MenuList, ConfirmDialog } from "@/components";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { DndContext, DragEndEvent, pointerWithin, DragStartEvent } from '@dnd-kit/core';
import { reorderItems } from '@/redux/slices/menuSlice';
import { MenuItem } from '@/types';

type DragData = {
  activeId: number;
  overId: number;
  arrayIndex: number;
  overItemName: string;
};

const Content = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const dispatch = useDispatch();
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dragData, setDragData] = useState<DragData | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const arrayIndex = menuItems.findIndex(array => 
        array.some(item => item.id === active.id || item.id === over.id)
      );
      
      if (arrayIndex !== -1) {
        // Find the name of the item being dragged over
        const overItem = findItemById(menuItems[arrayIndex], Number(over.id));
        
        if (overItem) {
          setDragData({
            activeId: Number(active.id),
            overId: Number(over.id),
            arrayIndex,
            overItemName: overItem.name
          });
          setShowConfirmDialog(true);
        }
      }
    }
  };

  // Helper function to find item by id
  const findItemById = (items: MenuItem[], id: number): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.subItems.length > 0) {
        const found = findItemById(item.subItems, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleConfirmDrop = (asChild: boolean) => {
    if (dragData) {
      dispatch(reorderItems({
        ...dragData,
        asChild
      }));
    }
    setShowConfirmDialog(false);
    setDragData(null);
  };
  
  return (
    <div className="min-h-screen bg-darkGray">
      <div className="p-4 rounded-lg shadow-md flex flex-col gap-y-4">
        <GeneralAdd />
        <DndContext 
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
        >
          {Array.isArray(menuItems) && menuItems.map((item, index) => (
            <MenuList 
              key={index} 
              menuItems={item} 
              arrayIndex={index}  
            />
          ))}
        </DndContext>
        
        {showConfirmDialog && dragData && (
          <ConfirmDialog
            message={`Do you want to drop it inside of ${dragData.overItemName}?`}
            onConfirm={() => handleConfirmDrop(true)}
            onCancel={() => handleConfirmDrop(false)}
          />
        )}
      </div>
    </div>
  );
};

export { Content };