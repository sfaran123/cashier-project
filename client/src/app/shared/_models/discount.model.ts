export class DiscountModel {
  code: string;
  name: string;
  type: string;
  approvedPercentage: number;
  managerPercentage: number;
  discountType: string;
  minPrice: number;
  isDuplicated: boolean;
  onlyClubMembers: boolean;
  activeFrom: string;
  activeAt: string;
  isActive: boolean;
}
