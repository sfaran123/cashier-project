import { GroupItemModel } from 'src/app/shared/_models/group-item.model';

export class SetGroupModel {
  id: number;
  name: string;
  itemsCount: number;
  priority: number;
  items: GroupItemModel[];
}
