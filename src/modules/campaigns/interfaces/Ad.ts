import {AdType} from '../enums/AdType';
import {BillingType} from '../../marketplace/filter/verticals/shared/enums/BillingType';

export interface Ad {
    adType: AdType,
    billingType: BillingType,
    price: number,
}