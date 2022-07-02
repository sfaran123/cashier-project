export class SupplierContactModel {
  id: number;
  name: string;
  phone: number;
  type: string;
  extraPhone: string;
  email: string;
}

export enum ContactType {
  office = 'משרד',
  agent = 'סוכן'
}


