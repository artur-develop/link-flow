import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '@/types';
import { arrayMove } from '@dnd-kit/sortable';

type MenuState = {
  items: MenuItem[][];
}

const initialSt: MenuItem[][] = [[
  {
      id: 1,
      name: "Home",
      link: "/home",
      subItems: []
  },
  {
      id: 2,
      name: "About",
      link: "/about",
      subItems: [{
        id: 2412411241243331,
        name: "myself",
        link: "/myself",
        subItems: []
      }]
  },
  {
    id: Date.now() + 5,
    name: "Poker",
    link: "/Poker",
    subItems: []
  },
  {
    id: Date.now() + 3,
    name: "Football",
    link: "/Football",
    subItems: []
  },
  {
    id: Date.now() + 2,
    name: "1x1",
    link: "/1x1",
    subItems: []
  },
  {
    id: Date.now() + 1,
    name: "2x2",
    link: "/2x2",
    subItems: []
  },
  ],[
  {
      id: 5,
      name: "Services",
      link: "/services",
      subItems: [
          {
              id: 6,
              name: "Consulting",
              link: "/services/consulting",
              subItems: []
          },
          {
              id: 7,
              name: "Development",
              link: "/services/development",
              subItems: [
                  {
                      id: 8,
                      name: "Web Development",
                      link: "/services/development/web",
                      subItems: []
                  },
              ]
          }
      ]
  },
  {
      id: 10,
      name: "Contact",
      link: "/contact",
      subItems: []
  },
]]

const initialState: MenuState = {
  items: initialSt
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<{ item: MenuItem, arrayIndex: number }>) => {
      if (!state.items) {
        state.items = [[]];
      }
      
      if (!state.items[action.payload.arrayIndex]) {
        state.items[action.payload.arrayIndex] = [];
      }
      
      state.items[action.payload.arrayIndex].push(action.payload.item);
    },
    removeMenuItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      
      // Helper function to recursively remove items
      const removeItem = (items: MenuItem[]): MenuItem[] => {
        return items.filter(item => {
          if (item.id === id) {
            return false;
          }
          if (item.subItems.length) {
            item.subItems = removeItem(item.subItems);
          }
          return true;
        });
      };
      
      // Apply removal to all arrays
      state.items = state.items.map(array => removeItem(array))
        // Remove empty arrays
        .filter(array => array.length > 0);
    },
    updateMenuItem: (state, action: PayloadAction<{ item: MenuItem, id: number }>) => {
      const { item, id } = action.payload;
      
      // Helper function to recursively update items
      const updateItem = (items: MenuItem[]): boolean => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === id) {
            // Preserve subItems when updating
            items[i] = { ...item, subItems: items[i].subItems };
            return true;
          }
          if (items[i].subItems.length && updateItem(items[i].subItems)) {
            return true;
          }
        }
        return false;
      };

      // Search through all arrays in items
      state.items.forEach(itemArray => {
        updateItem(itemArray);
      });
    },
    addSubMenuItem: (state, action: PayloadAction<{ parentId: number, newItem: MenuItem }>) => {
      const { parentId, newItem } = action.payload;
      
      // Helper function to recursively find and update the parent item
      const addSubItem = (items: MenuItem[]): boolean => {
        for (let item of items) {
          if (item.id === parentId) {
            item.subItems.push(newItem);
            return true;
          }
          if (item.subItems.length && addSubItem(item.subItems)) {
            return true;
          }
        }
        return false;
      };

      // Search through all arrays in items
      state.items.forEach(itemArray => {
        addSubItem(itemArray);
      });
    },
    reorderItems: (state, action: PayloadAction<{ 
      activeId: number, 
      overId: number, 
      arrayIndex: number,
      asChild: boolean 
    }>) => {
      const { activeId, overId, asChild } = action.payload;
      
      // Helper function to find and remove an item from the tree
      const findAndRemoveItem = (items: MenuItem[]): [MenuItem | null, MenuItem[]] => {
        let foundItem: MenuItem | null = null;
        const newItems = items.filter(item => {
          if (item.id === activeId) {
            foundItem = { ...item };
            return false;
          }
          if (item.subItems.length > 0) {
            const [found, newSubItems] = findAndRemoveItem(item.subItems);
            if (found) {
              foundItem = found;
              item.subItems = newSubItems;
            }
          }
          return true;
        });
        return [foundItem, newItems];
      };

      // Helper function to insert item at the correct position
      const insertItem = (items: MenuItem[], draggedItem: MenuItem, targetId: number): boolean => {
        // Check if we should insert into this level
        const targetIndex = items.findIndex(item => item.id === targetId);
        if (targetIndex !== -1) {
          // Insert as a child of the target
          items[targetIndex].subItems.push(draggedItem);
          return true;
        }

        // Check nested levels
        for (const item of items) {
          if (insertItem(item.subItems, draggedItem, targetId)) {
            return true;
          }
        }
        return false;
      };

      // Find and remove the dragged item
      let [draggedItem, newItems] = findAndRemoveItem(state.items[action.payload.arrayIndex]);
      
      if (draggedItem) {
        if (asChild) {
          // Insert as a child
          const inserted = insertItem(newItems, draggedItem, overId);
          if (!inserted) {
            newItems.push(draggedItem);
          }
        } else {
          // Insert as a sibling
          const targetIndex = newItems.findIndex(item => item.id === overId);
          if (targetIndex !== -1) {
            newItems.splice(targetIndex + 1, 0, draggedItem);
          } else {
            newItems.push(draggedItem);
          }
        }
        
        state.items[action.payload.arrayIndex] = newItems;
      }
    }
  }
});

export const { addMenuItem, removeMenuItem, updateMenuItem, addSubMenuItem, reorderItems } = menuSlice.actions;
export default menuSlice.reducer; 