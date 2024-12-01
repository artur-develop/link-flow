import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu, MenuItem, CreateItemT } from '@/types';

const initialState: Menu[] = [
  {
    id: 1,
    items: [
      {
        id: 101,
        name: "Stack Overflow",
        link: "https://stackoverflow.com/",
        subItems: [],
        menuId: 1,
      },
      {
        id: 102,
        name: "Spotify",
        link: "https://open.spotify.com/",
        subItems: [],
        menuId: 1,
      },
      {
        id: 103,
        name: "Youtube",
        link: "https://www.youtube.com/",
        menuId: 1,
        subItems: [
          {
            id: 201,
            name: "Best of Tom & Jerry",
            link: "https://youtu.be/cU0pC6vaDmM?si=TDNJdFMiQrSyN5jV",
            subItems: [],
            menuId: 1,
          },
          {
            id: 202,
            name: "Nature videos",
            link: "https://youtu.be/bsTY5cTi3nI?si=ag9LGL1FSlNByJHq",
            subItems: [],
            menuId: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 301,
        name: "Github",
        link: "https://github.com/",
        subItems: [],
        menuId: 2,
      },
      {
        id: 302,
        name: "Figma",
        link: "https://www.figma.com/",
        subItems: [],
        menuId: 2,
      },
      {
        id: 303,
        name: "Google",
        link: "https://www.google.com/",
        subItems: [],
        menuId: 2,
      },
    ],
  },
];

const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    updateMenuItems: (state, action: PayloadAction<{ id: number; items: MenuItem[] }>) => {
      const menuIndex = state.findIndex(menu => menu.id === action.payload.id);
      if (menuIndex !== -1) {
        state[menuIndex].items = action.payload.items;
      }
    },
    addMenuItem: (state, action: PayloadAction<{ id: number; item: CreateItemT }>) => {
      const menuIndex = state.findIndex(menu => menu.id === action.payload.id);
      if (menuIndex !== -1) {
        const newItem: MenuItem = {
          ...action.payload.item,
          id: Date.now(),
          subItems: [],
          menuId: action.payload.id,
        };
        state[menuIndex].items.push(newItem);
      }
    },
    addSubItem: (state, action: PayloadAction<{ id: number; parentId: number; item: CreateItemT }>) => {
      const menuIndex = state.findIndex(menu => menu.id === action.payload.id);
      if (menuIndex !== -1) {
        const findAndAddToParent = (items: MenuItem[]): boolean => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === action.payload.parentId) {
              items[i].subItems.push({
                ...action.payload.item,
                id: Date.now(),
                subItems: [],
                menuId: action.payload.id,
                parentId: action.payload.parentId
              });
              return true;
            }
            if (items[i].subItems.length && findAndAddToParent(items[i].subItems)) {
              return true;
            }
          }
          return false;
        };
        
        findAndAddToParent(state[menuIndex].items);
      }
    },  
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.push(action.payload);
    },
    deleteMenuItem: (state, action: PayloadAction<{ menuId: number; itemId: number }>) => {
      const { menuId, itemId } = action.payload;
      const menuIndex = state.findIndex(menu => menu.id === menuId);
      
      if (menuIndex !== -1) {
        const deleteFromItems = (items: MenuItem[]): MenuItem[] => {
          return items.filter(item => {
            if (item.id === itemId) {
              return false;
            }
            if (item.subItems.length > 0) {
              item.subItems = deleteFromItems(item.subItems);
            }
            return true;
          });
        };

        state[menuIndex].items = deleteFromItems(state[menuIndex].items);

        if (state[menuIndex].items.length === 0) {
          state.splice(menuIndex, 1);
        }
      }
    },
    editMenuItem: (state, action: PayloadAction<{ 
      menuId: number; 
      itemId: number;
      item: CreateItemT;
    }>) => {
      const { menuId, itemId, item } = action.payload;
      const menuIndex = state.findIndex(menu => menu.id === menuId);
      
      if (menuIndex !== -1) {
        const updateInItems = (items: MenuItem[]): MenuItem[] => {
          return items.map(menuItem => {
            if (menuItem.id === itemId) {
              return {
                ...menuItem,
                name: item.name,
                link: item.link,
              };
            }
            if (menuItem.subItems.length > 0) {
              return {
                ...menuItem,
                subItems: updateInItems(menuItem.subItems)
              };
            }
            return menuItem;
          });
        };

        state[menuIndex].items = updateInItems(state[menuIndex].items);
      }
    },
  },
});

export const { updateMenuItems, addMenuItem, addSubItem, addMenu, deleteMenuItem, editMenuItem } = linkSlice.actions;
export default linkSlice.reducer;
