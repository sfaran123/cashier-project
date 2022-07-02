import { SupplierContactModel } from 'src/app/shared/_models/supplier-contact.model';

export class SupplierModel {
  id: number;
  name: string;
  internalNumber: number;
  address: string;
  businessNumber: string;
  category: string;
  discount: number;
  comments: string;
  isLocked: boolean;
  agent: SupplierContactModel;
  office: SupplierContactModel;
  paymentDue: number;
  cashDiscount: number;
  initialDiscount: number;
}


