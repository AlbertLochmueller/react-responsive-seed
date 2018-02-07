import {Http} from '../../http/Http';
import {AuthInterceptorOptions} from '../../auth/AuthHttpInterceptor';
import {Inject, Injectable} from 'react.di';
import {Vertical} from '../enums/Vertical';
import {Campaign} from '../interfaces/Campaign';
import {DistributionType} from '../enums/DistributionType';
import {Sector} from '../enums/Sector';
import {AgeGroup} from '../enums/AgeGroup';
import {AdType} from '../enums/AdType';
import {BillingType} from '../../marketplace/filter/verticals/shared/enums/BillingType';
import {AuthService} from '../../auth/AuthService';
import {IAxiosPromise} from 'axios';

@Injectable
export class CampaignService {

    constructor(@Inject private http: Http,
                @Inject private auth: AuthService,) {
    }

    // TODO implement dynamic verticals later
    createCampaign(data: { vertical: Vertical, campaign: Campaign }) {
        const verticalKey = Object
            .keys(Vertical)
            .find(key => Vertical[key] === data.vertical);

        const convertedCampaign = this.convertCampaign(data.campaign);

        console.log('converted campaign: ', convertedCampaign);

        return this.http.post<AuthInterceptorOptions>(
            `/campaigns/${verticalKey}`,
            {
                campaignDescription: convertedCampaign.campaignDescription,
                images: convertedCampaign.images,
                general: convertedCampaign.general,
                audience: convertedCampaign.audience,
                ads: convertedCampaign.ads
            },
            {
                headers: {
                    Authorization: `Bearer ${this.auth.getValidToken()}`
                },
                interceptOptions: {skipAuth: true}
            }
        );
    }

    getCampaigns(params?: string) {
        const result = ():IAxiosPromise<any> => {

            const route = params && params.length ? `/campaigns/newsletter${params}` : '/campaigns/newsletter';

            if (this.auth.hasValidToken()) {
                return this.http.get<AuthInterceptorOptions>(
                    `${route}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.auth.getValidToken()}`
                        },
                        interceptOptions: {skipAuth: true}
                    }
                )
            }
             return this.http.get<AuthInterceptorOptions>(
                 `${route}`,
                {
                    interceptOptions: {skipAuth: true}
                }
             )
        }

        ;

        return result();
    }

    getMyCampaigns(params?: string) {
        const result = ():IAxiosPromise<any> => {

                return this.http.get<AuthInterceptorOptions>(
                    params? `/campaigns/newsletter/me${params}` : '/campaigns/newsletter/me',
                    {
                        headers: {
                            Authorization: `Bearer ${this.auth.getValidToken()}`
                        },
                        interceptOptions: {skipAuth: true}
                    }
                )
            }

        ;

        return result();
    }

    getCampaign(id: number) {
        const result = ():IAxiosPromise<any> => {

                return this.http.get<AuthInterceptorOptions>(
                    `campaigns/newsletter/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.auth.getValidToken()}`
                        },
                        interceptOptions: {skipAuth: true}
                    }
                )
            }

        ;

        return result();
    }

    convertCampaign(campaign: Campaign): any {

        const convertedGeneral = {
            distributionType: Object
                .keys(DistributionType)
                .find(key => DistributionType[key] === campaign.general.distributionType),
            minVolume: campaign.general.minVolume,
            range: campaign.general.range,
            sector: Object
                .keys(Sector)
                .find(key => Sector[key] === campaign.general.sector),
        };

        const convertedAudience = {
            ageGroups: [
                Object
                    .keys(AgeGroup)
                    .find(key => AgeGroup[key] === campaign.audience.ageGroups),
            ],
            clickRate: campaign.audience.clickRate,
            female: campaign.audience.female,
            male: campaign.audience.male,
            income: campaign.audience.income,
            openingRate: campaign.audience.openingRate,
        };


        const convertedAds = campaign.ads.map((ad, index) => {
            return {
                adType: Object
                    .keys(AdType)
                    .find(key => AdType[key] === ad.adType),
                billingType: Object
                    .keys(BillingType)
                    .find(key => BillingType[key] === ad.billingType),
                price: ad.price,
            }
        });

        return {
            campaignDescription: campaign.campaignDescription,
            images: campaign.images,
            general: convertedGeneral,
            audience: convertedAudience,
            ads: convertedAds
        };
    }
}
