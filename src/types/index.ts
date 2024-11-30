export type MenuItem = {
    id: number;
    name: string;
    link: string;
    subItems: MenuItem[];
};