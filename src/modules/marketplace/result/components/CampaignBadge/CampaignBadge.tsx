import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../components/App/ui-theme';
import {darken} from 'material-ui/styles/colorManipulator';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {CAMPAIGNS_PATH} from '../../../../../components/Main/Main';
import Divider from 'material-ui/Divider';
import {Ad} from '../../../../campaigns/interfaces/Ad';
import {Campaign} from '../../../../campaigns/interfaces/Campaign';
import * as placeholderImage from '../../../../layout/assets/logo_bigger.png';
import Button from 'material-ui/Button';
import {withRouter} from 'react-router';
import {DistributionType} from '../../../../campaigns/enums/DistributionType';
import {AdType} from '../../../../campaigns/enums/AdType';
import {REGISTER_PATH} from '../../../../users/components/UserNavControl/UserNavControl';


export interface CampaignBadgeProps {
    campaign: Campaign;
    fullAccess: boolean;
}

const campaignBadgeClasses = {
    campaignBadge: style({
        padding: 12,
        marginBottom: 12,
        width: '100%' as any,
        height: 125,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
        cursor: 'pointer' as any,
        transition: 'background 0.25s linear' as any,
        $nest: {
            '&:hover': {
                background: darken(theme.palette.common.lightWhite, 0.1)
            }
        }
    }),
    figurehead: style({
        width: 200,
        display: 'flex' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'center' as any,
    }),
    image: style({
        maxHeight: 100,
        maxWidth: 150,
        objectFit: 'contain' as any,
    }),
    divider: style({
        height: 100,
        width: 1,
    }),
    content: style({
        width: 600,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
    }),
    titleTypography: style({
        cursor: 'pointer' as any,
        color: theme.palette.text.primary,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: darken(theme.palette.text.primary, 0.2)
            }
        }
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    infoPart: style({
        display: 'flex',
        flexDirection: 'column' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'flex-start' as any,
    }),
    ctaPart: style({
        display: 'flex',
        flexDirection: 'column' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'flex-end' as any,
    }),
    typography: style({
        color: theme.palette.secondary.A400
    }),
};

function getAdTypes(ads: Ad[]) {
    let aggregate = '';
    let enumAggregate;
    ads.map((value) => {
        if (enumAggregate && enumAggregate.find(subValue => subValue !== value.adType) || !enumAggregate) {

            if (aggregate !== '') {
                aggregate = aggregate + ', ' + AdType[value.adType.toString().toLowerCase()];
                enumAggregate.concat(value.adType);
                return;
            } else {
                aggregate = AdType[value.adType.toString().toLowerCase()];
                enumAggregate = [value.adType];
                return;
            }
        }
    });

    return aggregate;
}

function getBillingTypes(ads: Ad[]) {
    let aggregate = '';
    ads.map((value) => {
        if (aggregate.indexOf(value.billingType) < 0) {
            if (aggregate !== '') {
                aggregate = aggregate + ', ' + value.billingType;
                return;
            } else {
                aggregate = value.billingType;
                return;
            }
        }
    });

    return aggregate;
}

export const CampaignBadge = withRouter(({campaign, fullAccess, history}: CampaignBadgeProps) => (
    <Paper elevation={2}
           className={campaignBadgeClasses.campaignBadge}
           onClick={() => fullAccess ?
               history.push(`${CAMPAIGNS_PATH}/${campaign.id}`)
               :
               history.push(REGISTER_PATH)
           }
    >
        <div className={campaignBadgeClasses.figurehead}>
            <img className={campaignBadgeClasses.image}
                 src={
                     campaign.images && fullAccess
                         ?
                         (campaign.images.header ? campaign.images.header.base64Image : placeholderImage)
                         :
                         placeholderImage}>
            </img>

            <Divider className={campaignBadgeClasses.divider}/>
        </div>


        <div className={campaignBadgeClasses.content}>
            {fullAccess ?
                <div className={campaignBadgeClasses.infoPart}>
                    <Link to={`${CAMPAIGNS_PATH}/${campaign.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Typography className={campaignBadgeClasses.titleTypography}
                                    type="subheading"
                                    noWrap={true}>
                            {campaign.campaignDescription.title}
                        </Typography>
                    </Link>
                    <Typography style={{color: theme.palette.secondary.A400}}
                                type="caption">
                        {campaign.general.range + ' Empfänger'}
                    </Typography>
                    <Typography style={{color: theme.palette.secondary.A400}}
                                type="caption">
                        {'Versand: ' + DistributionType[campaign.general.distributionType.toLowerCase()]}
                    </Typography>
                    <Typography style={{color: theme.palette.secondary.A400}}
                                type="caption">
                        {getAdTypes(campaign.ads) || 'Anzeigetypen unbekannt'}
                    </Typography>
                    <Typography style={{color: theme.palette.secondary.A400}}
                                type="caption">
                        {getBillingTypes(campaign.ads) || 'Abrechnungstypen unbekannt'}
                    </Typography>
                </div>
                :
                <div className={campaignBadgeClasses.infoPart}>
                    <Link to={`${CAMPAIGNS_PATH}/${campaign.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Typography className={campaignBadgeClasses.titleTypography}
                                    type="subheading"
                                    noWrap={true}>
                            {campaign.campaignDescription.title}
                        </Typography>
                    </Link>
                </div>
            }

            {fullAccess ?
                <div className={campaignBadgeClasses.ctaPart}>
                    <Typography style={{color: theme.palette.secondary.A400}}
                                type="caption">
                        {'Mind. Buchungsvolumen'}
                    </Typography>
                    <Typography
                        style={{color: theme.palette.secondary.A400, fontWeight: 'bold', margin: theme.spacing.unit}}
                        type="title">
                        {campaign.general.minVolume + '€'}
                    </Typography>
                    <Typography type="subheading" color="inherit">
                        <div className={campaignBadgeClasses.actionElement}>
                            <Button className={campaignBadgeClasses.button}
                                    raised color="primary"
                                    type="submit">
                                <Typography type="caption" color="inherit" noWrap={true}>
                                    Zur Kampagne
                                </Typography>
                            </Button>
                        </div>
                    </Typography>
                </div>
                :

                <div className={campaignBadgeClasses.ctaPart}>
                    {/*<Typography style={{color: theme.palette.secondary.A400}}*/}
                    {/*type="caption">*/}
                    {/*{'Mind. Buchungsvolumen'}*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*style={{color: theme.palette.secondary.A400, fontWeight: 'bold', margin: theme.spacing.unit}}*/}
                    {/*type="title">*/}
                    {/*{campaign.general.minVolume + '€'}*/}
                    {/*</Typography>*/}

                    <div className={campaignBadgeClasses.actionElement}>
                        <Typography type="caption" color="inherit" style={{margin: theme.spacing.unit}}>
                            {'Für Details'}
                        </Typography>
                        <Button className={campaignBadgeClasses.button}
                                raised color="primary"
                                type="submit">
                            <Typography type="caption" color="inherit" noWrap={true}>
                                {'Registrieren'}
                            </Typography>
                        </Button>
                    </div>
                </div>
            }

        </div>
    </Paper>
));