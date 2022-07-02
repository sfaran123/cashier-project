export class CustomerModel {
  id: number;
  connectionTerminalNumber: string;
  companyName: string;
  companyCategory: string;
  businessId: string;
  businessType: string;
  dataBasePass: string;
  confirmDataBasePass: string;
  defaultCurrency: string;
  profitCalculationMethod: string;

  hasSubItemReport: boolean;
  limitShippingDocumentS: boolean;
  includeSubItemProfit: boolean;
  isTaxFree: boolean;
  hasItemsAutoCounting: boolean;
  hasValueCard: boolean;
  hasPinPad: boolean;
  SaleSellerRequire: boolean; // לחייב לבחור מוכר בתחילת מכירה
  hasSeparationLines: boolean;
  autoConnectionBetweenEmployeeAndStore: boolean;
  allowMenusAmountOfItem: boolean;
  documentType: boolean;
  creditInvoicePeriod: boolean;
}

export enum BusinessTypes {
  licensed_dealer = 'עוסק מורשה',
  exempt_dealer = 'עוסק פטור',
  organization = 'עמותה רושמת'
}
