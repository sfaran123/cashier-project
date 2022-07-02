import { GroupItemModel } from 'src/app/shared/_models/group-item.model';

export class GroupModel {
  id: number;
  name: string;
  items: GroupItemModel[];
}
