import { CentralInvoiceDocumentModel } from 'src/app/shared/_models/central-invoice-document.model';
import { ClientModel } from 'src/app/shared/_models/client.model';

export class CentralInvoiceModel {
  id: number;
  date: string;
  number: number;
  client: ClientModel;
  documents: CentralInvoiceDocumentModel[];
}
