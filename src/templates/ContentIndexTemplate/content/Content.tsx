'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { GeneralAdd, List } from "@/components";

const Content = () => {
  const itemArrays = useSelector((state: RootState) => state.links);

  return (
    <div className="min-h-screen p-4 rounded-lg shadow-md flex flex-col gap-y-4">
      <GeneralAdd />
      {itemArrays.map(links => (
        <List
          key={links.id}
          links={links}
        />
      ))}
    </div>
  );
};

export { Content };