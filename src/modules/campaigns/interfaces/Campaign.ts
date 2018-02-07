import {DistributionType} from '../enums/DistributionType';
import {Ad} from './Ad';
import {CampaignDescription} from './CampaignSteps/CampaignDescription';
import {CampaignGeneral} from './CampaignSteps/CampaignGeneral';
import {CampaignAudience} from './CampaignSteps/CampaignAudience';
import {Sector} from '../enums/Sector';
import {AgeGroup} from '../enums/AgeGroup';
import {CampaignImages} from './CampaignSteps/CampaignImages';

// TODO Change structure when more verticals appear
export interface Campaign {
    id: number;
    campaignDescription: CampaignDescription,
    general: CampaignGeneral,
    images: CampaignImages,
    audience: CampaignAudience,
    ads: Ad[]
}

export const emptyCampaign: Campaign = {
    id: 0,
    campaignDescription: {
        title: '',
        description: '',
    },
    images: {},
    general: {
        sector: Sector.tech,
        minVolume: 0,
        range: 0,
        distributionType: DistributionType.weekly,
    },
    audience: {
        ageGroups: [AgeGroup.to18],
        clickRate: 0,
        female: 50,
        income: 0,
        male: 50,
        openingRate: 0,
    },
    ads: []
};