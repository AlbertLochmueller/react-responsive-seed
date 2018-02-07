import * as React from 'react';
import {BaseCallToActionCard} from '../BaseCallToActionCard/BaseCallToActionCard';
import * as increaseCard from '../../../assets/increaseCard.png';
import {OFFER_PATH} from '../../../../../../components/Main/Main';

// function getMedia() {
//     const increaseCardLogo = increaseCard;
//     return increaseCardLogo;
// }

// TODO Component für mehr Informationen erstellen
export const IncreaseCard = () => (
    <BaseCallToActionCard
        image={increaseCard}
        imageTitle="Buchungsanfragen steigern"
        submitText="Kampagne inserieren"
        target={OFFER_PATH}
        additionalInfo={{text:"Mehr erfahren", target:"/todo"}}
    >
        In wenigen Schritten können Anbieter auf FastReach unbegrenzt viele Kampagnen inserieren,
        um gezielte Anfragen von potenziellen Kunden zu erhalten. Dabei fallen für den Anbieter nur bei
        einer erfolgreichen Verhandlung Kosten an.
    </BaseCallToActionCard>
);