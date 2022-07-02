import { MenuItemModel } from 'src/app/shared/_models/menu-item.model';

export class MenuModel {
  id: number;
  name: string;
  serialNumber: number;
  color: string;
  subMenus: MenuModel[];
  menuItems: MenuItemModel[];
}
