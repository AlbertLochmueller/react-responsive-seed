import * as React from 'react';
import {BaseCallToActionCard} from '../BaseCallToActionCard/BaseCallToActionCard';
import * as findCard from '../../../assets/findCard.png';
import {MARKETPLACE_PATH} from '../../../../../../components/Main/Main';

// function getMedia() {
//     const findCardLogo = findCard;
//     return findCardLogo;
// }

export const FindCard = () => (
    <BaseCallToActionCard
        image={findCard}
        imageTitle="Passende Kampagnen Finden"
        target={MARKETPLACE_PATH}
        submitText="Zu den Kampagnen">
        Wir bringen Werbern Transparenz und Übersicht in einem unübersichtlichen Markt.
        Durch zahlreiche Filter finden Werber in wenigen Schritten die passende Newsletter-Kampagne auf FastReach.
    </BaseCallToActionCard>
);