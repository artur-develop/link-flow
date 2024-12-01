'use client'

import React, {useState} from 'react';
import {CreateItemT, MenuItem as MenuItemT} from "@/types";
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import {AddEditForm, Button, ConfirmDialog} from "@/components";
import {useDispatch} from 'react-redux';
import { addSubItem, deleteMenuItem, editMenuItem } from '@/redux/slices/linkSlice';
import { goToLink } from '@/utils';
import { texts } from '@/constants';

const Link = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MenuItemT>
>((props, ref) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (!props.item.menuId) {
      console.error(texts.link.errors.noMenuId);
      return;
    }
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!props.item.menuId) return;
    
    dispatch(deleteMenuItem({ 
      menuId: props.item.menuId,
      itemId: props.item.id 
    }));
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleSave = (menuId: number, item: CreateItemT) => {
    if (!props.item.menuId) {
      console.error(texts.link.errors.noMenuId);
      return;
    }

    dispatch(editMenuItem({
      menuId: props.item.menuId,
      itemId: props.item.id,
      item
    }));
    setIsEditing(false);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleSaveSubItem = (menuId: number, item: CreateItemT) => {    
    const rootMenuId = props.item.menuId || menuId;

    dispatch(addSubItem({ 
      id: rootMenuId,
      parentId: props.item.id,
      item
    }));
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
  };

  return (
    <>
      <SimpleTreeItemWrapper
        {...props}
        ref={ref}
      >
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{props.item.name}</p>
              <p 
                className="text-xs text-gray-500 cursor-pointer hover:text-purple-500"
                onClick={() => goToLink(props.item.link)}
              >
                {props.item.link}
              </p>
            </div>
            <div className="flex">
              <Button
                variant="grey"
                onClick={handleEdit}
                position="left"
              >
                {texts.link.edit}
              </Button>
              <Button
                variant="grey"
                onClick={handleDelete}
                position="center"
              >
                {texts.link.delete}
              </Button>
              <Button
                variant="grey"
                onClick={handleAdd}
                position="right"
              >
                {texts.link.addSubItem}
              </Button>
            </div>
          </div>
          {isEditing && (
            <AddEditForm
              initialData={props.item}
              menuId={props.item.menuId}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {isAdding && (
            <AddEditForm
              menuId={props.item.menuId}
              onSave={handleSaveSubItem}
              onCancel={handleCancel}
            />
          )}
        </div>
      </SimpleTreeItemWrapper>

      {showDeleteConfirm && (
        <ConfirmDialog
          message={texts.link.deleteConfirmation}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
});

export {Link};