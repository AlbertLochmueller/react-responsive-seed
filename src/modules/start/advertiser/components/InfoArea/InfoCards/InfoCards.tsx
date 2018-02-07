import * as React from 'react';
import {InfoCard} from '../InfoCard/InfoCard';
import {style} from 'typestyle';
import * as findCampaignsIcon from '../../../assets/magnifier.png';
import * as negotiateIcon from '../../../assets/request.png';
import * as offerIcon from '../../../assets/offer.png';
import * as startCampaignIcon from '../../../assets/paper-plane.png';
import {theme} from '../../../../../../components/App/ui-theme';

const infoCardsClasses = {
  infoCards: style({
      margin: '40px 0px 40px 0px',
      width: '100%',
      display: 'flex' as any,
      flexDirection: 'row' as any,
      flexWrap: 'wrap' as any,
      justifyContent: 'center' as any,
      [theme.breakpoints.down('lg')]: {
          width: 700
      },
      [theme.breakpoints.down('md')]: {
          width: '90%'
      },
  })
};

export const InfoCards = () => (
    <div className={infoCardsClasses.infoCards}>
        <InfoCard
            headLine={"Kampagnen finden"}
            content={"Finde mit Hilfe von zahlreichen Filtern die richtige Newsletter-Kampagne!"}
            image={findCampaignsIcon}
        />
        <InfoCard
            headLine={"Verhandeln"}
            content={"Frage ein Angebot an, mache ein Gegenangebot und verhandle."}
            image={negotiateIcon}
        />
        <InfoCard
            headLine={"Offizielles Angebot"}
            content={"Erhalte automatisch ein offizielles Angebot, sobald du dich einigst."}
            image={offerIcon}
        />
        <InfoCard
            headLine={"Kampagne starten"}
            content={"Eine Rechnung erhältst du vom Anbieter selbst."}
            image={startCampaignIcon}
        />
    </div>
);