import { ItemModel } from 'src/app/shared/_models/item.model';

export class MenuElementModel {
  id: number;
  parentId: number;
  serialNumber: string;
  name: string;
  color: string;
  type: string;
  price: number;
  item: ItemModel;
}
