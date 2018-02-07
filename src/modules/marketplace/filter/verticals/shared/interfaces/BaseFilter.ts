import {IFilterSex} from '../../newsletter/interfaces/IFilterSex';
import {IFilterAgeGroups} from '../../newsletter/interfaces/IFilterAgeGroups';

export interface BaseFilter {
contains?: string;
sex?: IFilterSex[];
ageGroups?: IFilterAgeGroups[];
}
