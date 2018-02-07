import * as React from 'react';
import {BaseCallToActionCard} from '../BaseCallToActionCard/BaseCallToActionCard';
import * as connectionCard from '../../../assets/connectionCard.png';
import {REGISTER_PATH} from '../../../../../users/components/UserNavControl/UserNavControl';

// function getMedia() {
//     const connectionCardLogo = connectionCard;
//     return connectionCardLogo;
// }

export const ConnectionCard = () => (
    <BaseCallToActionCard
        image={connectionCard}
        imageTitle="Verbinden, was zusammen gehört"
        target={REGISTER_PATH}
        submitText="Registrieren">
        FastReach verbindet Unternehmen, die Newsletter-Kampagnen suchen und Unternehmen,
        die Kampagnen anbieten auf dem ersten Marktplatz für E-Mail und Newsletter-Kampagnen.
        Aspekte wie die Kampagnensuche, die Verhandlung
        und die Buchung sind speziell auf die Bedürfnisse beider Parteien angepasst.
    </BaseCallToActionCard>
);