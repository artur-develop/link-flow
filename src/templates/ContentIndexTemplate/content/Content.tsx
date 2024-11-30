'use client';

import React from 'react';
import {GeneralAdd, MenuList} from "@/components";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Content = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <GeneralAdd />
        {Array.isArray(menuItems) && menuItems.map((item, index) => (
          <MenuList 
            key={`${index}-${Date.now()}`} 
            menuItems={item} 
            arrayIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export { Content };