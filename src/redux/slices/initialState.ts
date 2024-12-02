import {Menu} from "@/types";

export const initialState: Menu[] = [
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