import {AgeGroup} from '../../enums/AgeGroup';

export interface CampaignAudience {
        ageGroups: AgeGroup[],
        openingRate?: number,
        clickRate?: number,
        male: number,
        female: number,
        income: number,
}