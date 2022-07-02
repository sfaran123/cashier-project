import { ItemModel } from 'src/app/shared/_models/item.model';

export class DocumentModel {
  id: number;
  storeName: string;
  entityId: number;
  date: string;
  sum: number;
  reference: string;
  status: number;
  documentType: string;
  balanceDue: number;
  sumToPay: number;
  paymentStatus: string;
  paymentDate: string;
  paymentType: string;
  centralInvoiceNumber: number;
  items: ItemModel[];
}

export const DocumentTypesSelect = [
  { name: 'invoice', value: 'INVOICE' },
  { name: 'credit_invoice', value: 'CREDIT_INVOICE' },
  { name: 'shipping_certificate', value: 'SHIPPING_CERTIFICATE' },
];

export enum DocumentTypes {
  invoice = 'INVOICE',
  credit_invoice = 'CREDIT_INVOICE',
  shipping_certificate = 'SHIPPING_CERTIFICATE',
}


