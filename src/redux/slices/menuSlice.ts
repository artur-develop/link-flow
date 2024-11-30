import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '@/types';

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
      subItems: [
          {
              id: 3,
              name: "Our Team",
              link: "/about/team",
              subItems: []
          },
      ]
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
    // here appears new item if I press on button 'Add menu item same level'that not related to the first array.
  // { 
  //   id: ,
  //   name: ,
  //   link: ,
  //   subItems:[]
  // }
],
  // here appears new item if I press on button 'Add menu item same level' related to the first array.
  // [{ 
  //   id: ,
  //   name: ,
  //   link: ,
  //   subItems:[]
  // }]
]

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
    }
  }
});

export const { addMenuItem, removeMenuItem, updateMenuItem, addSubMenuItem } = menuSlice.actions;
export default menuSlice.reducer; 