import * as React from 'react';
import {Campaign} from '../../../interfaces/Campaign';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../components/App/ui-theme';
import {darken} from 'material-ui/styles/colorManipulator';
import Paper from 'material-ui/Paper';
import {Link, withRouter} from 'react-router-dom';
import {CAMPAIGNS_PATH} from '../../../../../components/Main/Main';
import * as campaignStats from '../assets/campaignStats.png';
import * as editCampaign from '../assets/editCampaign.svg';
import * as campaignSettings from '../assets/campaignSettings.svg';
import {RouteComponentProps} from 'react-router';


export interface MyCampaignsItemProps extends RouteComponentProps<{}> {
    campaign: Campaign;
}

const myCampaignsItemClasses = {
    myCampaignsItem: style({
        margin: theme.spacing.unit,
        padding: '0 12px' as any,
        width: '100%' as any,
        height: 60,
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
    title: style({
        width: 400,
        margin: theme.spacing.unit,
    }),
    details: style({
        width: 400,
        display: 'flex' as any,
        justifyContent: 'space-around' as any,
        margin: theme.spacing.unit,
    }),
    actions: style({
        width: 150,
        margin: theme.spacing.unit,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
    }),
    actionIcons: style({
        height: 35,
        objectFit: 'contain' as any,
        margin: 'auto' as any,
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
    typography: style({
        color: theme.palette.secondary.A400
    }),
    active: style({
        color: theme.palette.primary.A400
    }),
    inactive: style({
        color: theme.palette.error.A400
    })
};

export const MyCampaignsItem = withRouter(({campaign, match, history}: MyCampaignsItemProps) => (
            <Paper elevation={2}
                   className={myCampaignsItemClasses.myCampaignsItem}
                   // onClick={() => {history.push(`${match.url}/${campaign.id}`)}}
            >
                <div className={myCampaignsItemClasses.title}>
                    <Link to={`${match.url}/${campaign.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Typography className={myCampaignsItemClasses.titleTypography}
                                    type="subheading"
                                    noWrap={true}>
                            {campaign.campaignDescription.title}
                        </Typography>
                    </Link>
                </div>
                <div className={myCampaignsItemClasses.details}>
                    <Typography className={myCampaignsItemClasses.typography}
                                type="subheading"
                                noWrap={true}>
                        {'Fastreach.de'}
                    </Typography>
                    <Typography className={myCampaignsItemClasses.typography}
                                type="subheading"
                                noWrap={true}>
                        {'Jan Remek'}
                    </Typography>
                    <Typography className={myCampaignsItemClasses.active}
                                type="subheading"
                                noWrap={true}>
                        {'Aktiv'}
                    </Typography>
                </div>
                <div className={myCampaignsItemClasses.actions}>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} to={`${match.url}/${campaign.id}?edit`}>
                        <img className={myCampaignsItemClasses.actionIcons} src={editCampaign}/>
                    </Link>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} to={CAMPAIGNS_PATH}>
                        <img className={myCampaignsItemClasses.actionIcons} src={campaignStats}/>
                    </Link>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} to={CAMPAIGNS_PATH}>
                        <img className={myCampaignsItemClasses.actionIcons} src={campaignSettings}/>
                    </Link>
                </div>
            </Paper>
));