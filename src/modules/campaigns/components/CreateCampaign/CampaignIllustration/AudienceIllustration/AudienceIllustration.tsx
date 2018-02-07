import * as React from 'react';
import {BaseIllustration} from '../BaseIllustration/BaseIllustration';
import * as audienceIllustration from '../../../../assets/audienceIllustration.png';


export const AudienceIllustration = () => (
    <BaseIllustration image={audienceIllustration}>
        Bestimme die Zielgruppe deiner Kampagne für ein optimales Ergebnis!
    </BaseIllustration>
);