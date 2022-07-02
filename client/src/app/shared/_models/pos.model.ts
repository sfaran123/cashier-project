import {PrintingSettingModel} from './printingSetting.model';
import {TenBisModel} from './tenBis.model';
import {ValueCardModel} from './valueCard.model';

export class PosModel {
  id: number;
  name: string;
  internalNumber: string;
  decimalCircle: number;
  maxSaleAmount: number;
  limitSaleAmount: string;
}
