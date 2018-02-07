import {Campaign} from '../../../../interfaces/Campaign';
import {Sector} from '../../../../enums/Sector';
import {AgeGroup} from '../../../../enums/AgeGroup';
import {DistributionType} from '../../../../enums/DistributionType';
import * as campaignImage from '../../../../../layout/assets/logo_bigger.png';
import {AdType} from '../../../../enums/AdType';
import {BillingType} from '../../../../../marketplace/filter/verticals/shared/enums/BillingType';

let count = 1;

export function getDummyCampaign(): Campaign {
    return {
        id: count++,
        campaignDescription: {
            title: 'Meine Dummykampagne',
            description: 'Dies ist eine wunderbare Kampagne mit ganz ganz vielen Vorteilen für jeden Werber :) Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        },
        images: {
            header: campaignImage,
            images: [
                {index: 1, base64Image: campaignImage},
                {index: 1, base64Image: campaignImage},
                {index: 1, base64Image: campaignImage}
            ]
        },
        general: {
            sector: Sector.tech,
            minVolume: 2000,
            range: 500000,
            distributionType: DistributionType.weekly,
        },
        audience: {
            ageGroups: [AgeGroup.to18],
            clickRate: 1.5,
            female: 50,
            income: 3000,
            male: 50,
            openingRate: 1.8,
        },
        ads: [{
            adType: AdType.standalone,
            billingType: BillingType.tkp,
            price: 50,
        }, {
            adType: AdType.image,
            billingType: BillingType.cpo,
            price: 100,
        }, {
            adType: AdType.text,
            billingType: BillingType.fixum,
            price: 20,
        }]
    }
}