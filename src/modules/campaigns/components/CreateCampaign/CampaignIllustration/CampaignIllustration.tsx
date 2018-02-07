import * as React from 'react';
import {DescriptionIllustration} from './DescriptionIllustration/DescriptionIllustration';
import {ImageIllustration} from './ImageIllustration/ImageIllustration';
import {GeneralIllustration} from './GeneralIllustration/GeneralIllustration';
import {AudienceIllustration} from './AudienceIllustration/AudienceIllustration';
import {AdsIllustration} from './AdsIllustration/AdsIllustration';
import {style} from 'typestyle';

export interface CampaignIllustrationProps {
    step: number;
}

const campaignIllustrationClasses = {
    illustration: style({
        width: 300,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        height: 'inherit' as any,
        // background: 'linear-gradient(45deg, #1f877d 45%, #26A69A 75%)',
        borderRight: '1px solid #f4f4f4',
    }),
};

function getStepIllustration(step: number) {
    switch (step) {
        case 0:
            return <DescriptionIllustration/>;
        case 1:
            return <ImageIllustration/>;
        case 2:
            return <GeneralIllustration/>;
        case 3:
            return <AudienceIllustration/>;
        case 4:
            return <AdsIllustration/>;
    }
}

export const CampaignIllustration = ({step}: CampaignIllustrationProps) => (
    <div className={campaignIllustrationClasses.illustration}>
        {getStepIllustration(step)}
    </div>
);