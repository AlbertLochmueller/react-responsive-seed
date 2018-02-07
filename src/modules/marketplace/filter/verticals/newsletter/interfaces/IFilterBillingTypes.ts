import {BillingType} from '../../shared/enums/BillingType';

export interface IFilterBillingTypes {
    billingType: BillingType;
    active: boolean;
}