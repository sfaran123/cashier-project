import {PrintingSettingModel} from './printingSetting.model';
import {TenBisModel} from './tenBis.model';
import {ValueCardModel} from './valueCard.model';

export class StoreModel {
  storeCode: string;
  storeName: string;
  address: string;
  businessId: string;
  phone: string;
  businessType: string;
  printingSetting: PrintingSettingModel;
  tenBisForm: TenBisModel;
  ValueCardForm: ValueCardModel;
}
