export interface MenuItemType {
  name: string;
  href: string;
}

export const MENU_LIST: Array<MenuItemType> = [
  { name: 'board', href: '/board' },
  { name: 'library', href: '/library' }
];
