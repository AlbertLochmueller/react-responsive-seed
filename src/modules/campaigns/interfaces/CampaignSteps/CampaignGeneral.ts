import {Sector} from '../../enums/Sector';
import {DistributionType} from '../../enums/DistributionType';

export interface CampaignGeneral {
    distributionType: DistributionType,
    minVolume: number,
    range: number,
    sector: Sector,
}