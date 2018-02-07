import * as React from 'react';
import {style} from 'typestyle';
import {Campaign} from '../../campaigns/interfaces/Campaign';
import {CampaignBadge} from './components/CampaignBadge/CampaignBadge';

export interface MarketPlaceResultProps {
    campaigns: Campaign[];
    fullAccess: boolean;
}

const marketPlaceResultClasses = {
    marketPlaceResult: style({
        position: 'absolute' as any,
        // margin: theme.spacing.unit,
        width: 800,
        top: '7%',
        textAlign: 'center' as 'center',
        display: 'inline-block' as any,
    }),
};

export const MarketPlaceResult = ({campaigns, fullAccess}: MarketPlaceResultProps) => (
    <div className={marketPlaceResultClasses.marketPlaceResult}>
        {campaigns.map((campaign, index) => (
            <CampaignBadge
                campaign={campaign}
                key={index}
                fullAccess={fullAccess}
            />
        ))}
    </div>
);