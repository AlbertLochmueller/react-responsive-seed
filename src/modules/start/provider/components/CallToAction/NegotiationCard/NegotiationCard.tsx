import * as React from 'react';
import {BaseCallToActionCard} from '../BaseCallToActionCard/BaseCallToActionCard';
import * as negotiationCard from '../../../assets/negotiationCard.png';
import {REGISTER_PATH} from '../../../../../users/components/UserNavControl/UserNavControl';

// function getMedia() {
//     const negotiationCardLogo = negotiationCard;
//     return negotiationCardLogo;
// }

export const NegotiationCard = () => (
    <BaseCallToActionCard
        image={negotiationCard}
        imageTitle="Besser Verhandeln"
        submitText="Jetzt Registrieren"
        target={REGISTER_PATH}
    >
        Du bist mit dem aktuellen Preis nicht zufrieden? Über FastReach kannst du jedem Anbieter ganz einfach
        ein Gegenangebot stellen und solange verhandeln, bis du mit deinem Ergebnis zufrieden bist.
        Durch automatische Benachrichtigungen bleibst du über deine aktuellen Verhandlungen
        immer auf dem neuesten Stand!
    </BaseCallToActionCard>
);