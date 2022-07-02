import { SetGroupModel } from 'src/app/shared/_models/set-group.model';

export class SetModel {
  id: number;
  name: string;
  code: number;
  categoryId: number;
  subCategoryId: number;
  groups: SetGroupModel[];
}
