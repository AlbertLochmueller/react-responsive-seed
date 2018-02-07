import {IFilterBudget} from './IFilterBudget';
import {BaseFilter} from '../../shared/interfaces/BaseFilter';
import {Sector} from '../../../../../campaigns/enums/Sector';
import {IFilterAdTypes} from './IFilterAdTypes';
import {IFilterBillingTypes} from './IFilterBillingTypes';

export interface NewsletterFilter extends BaseFilter {
sector?: Sector;
budget?: number;
adTypes?: IFilterAdTypes[];
billingTypes?: IFilterBillingTypes[];
}
