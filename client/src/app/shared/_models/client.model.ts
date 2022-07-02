import { CentralInvoiceDocumentModel } from 'src/app/shared/_models/central-invoice-document.model';

export class ClientModel {
  id: number;
  IDNumber: string;
  groupId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  extraPhone: string;
  comment: string;
  address: string;
  isShippingDocument: boolean;
  hasObligoRenews: boolean;
  balance: number;
  printerType: string;
  obligo: string;
  isLocked: boolean;
  isParent: boolean;
  parentId: number;
  isBlocked: boolean;
  customerParent: string;
  customerGroup: string;
  tagNumber: string;
  number: string;
  customPriceAllowed: boolean;
  isElatResident: boolean;
  termsOfPayment: boolean;
  discountPercentage: boolean;
  documents: CentralInvoiceDocumentModel[];
}
