export type MenuItem = {
    id: number;
    name: string;
    link: string;
    subItems: MenuItem[];
    parentId?: number;
    menuId?: number;
    children?: MenuItem[];
    depth?: number;
    collapsed?: boolean;
};

export type Menu = {
    id: number;
    items: MenuItem[];
}

export type CreateItemT = {
    name: string;
    link: string;
}