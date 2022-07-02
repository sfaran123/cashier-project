export class EmployeeModel {
  id: number;
  name: string;
  cardNumber: string;
  IDNumber: string;
  externalId: string;
  gender: string;
  phone: string;
  address: string;
  birthDate: string;
  workStartDate: string;
  // employeeStores: string;
  isCashier: boolean;
  isCourier: boolean;
  isManager: boolean;
  creditAllowed: boolean;
  discountAllowed: boolean;
  viewReportAllowed: boolean;
  ZAllowed: boolean;
  XAllowed: boolean;
  refundAllowed: boolean;
  deleteSaleAllowed: boolean;
  changeItemPriceAllowed: boolean;
  isActive: boolean;
  calculationByShifts: boolean;
  contact: {
    name: string,
    phone: string,
    proximity: string
  };
  bank: {
    name: string,
    branch: string,
    accountNumber: string
  };
}
