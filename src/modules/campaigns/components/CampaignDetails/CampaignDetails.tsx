import * as React from 'react';
import {Component} from 'react';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import {lighten} from 'material-ui/styles/colorManipulator';
import {Campaign} from '../../interfaces/Campaign';
import Typography from 'material-ui/Typography';
import GridList, {default as GridListTile} from 'material-ui/GridList';
import {CampaignGeneralDescription} from '../../enums/CampaignGeneralDescription';
import {CampaignAudienceDescription} from '../../enums/CampaignAudienceDescription';
import {DistributionType} from '../../enums/DistributionType';
import {CampaignDetailsImageCarousel} from './CampaignDetailsImageCarousel/CampaignDetailsImageCarousel';

interface CampaignDetailsProps {
    edit: boolean;
    campaign: Campaign;
}

interface CampaignDetailsState {
    segmentIndex: number;
}

const campaignDetailsClasses = {
    campaignDetails: style({
        width: 900,
        padding: 24
    }),
    paper: style({
        padding: 24,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'flex-start' as any,
    }),
    campaignDetailsHeader: style({
        width: '100%' as any,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
        marginBottom: 24,
    }),
    headlineTypography: style({
        color: theme.palette.text.primary,
        // marginBottom: 12,
        height: 40,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
    }),
    contentTypography: style({
        color: theme.palette.text.secondary,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        height: 'inherit' as any,

    }),
    gridList: style({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'ellipsis' as any,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 12
    }),
    contactCard: style({
        height: 300,
        width: 250,
        border: `1px solid ${lighten(theme.palette.secondary.A400, 0.5)}`
    }),
    providerSegment: style({
      display: 'flex' as any,
      justifyContent: 'flex-start' as any,
    }),
    tabs: style({
        marginBottom: 24,
        width: '100%' as any,
        overflow: 'hidden' as any,
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.14)' as any,
        // borderBottom: `2px solid ${lighten(theme.palette.secondary.A400, 0.5)}`,
    }),
    tab: style({
        textTransform: 'none' as any,
    })
};

export class CampaignDetails extends Component<CampaignDetailsProps, CampaignDetailsState> {

    constructor(props) {
        super(props);

        this.state = {
            segmentIndex: 0,
        }
    }

    handleCategorySwitch(event, value) {
        this.setState({
            segmentIndex: value
        });
    }

    render() {
        const {edit, campaign} = this.props;
        const {segmentIndex} = this.state;

        console.log('Geladene Kampagne: ', campaign);

        return (
            <div className={campaignDetailsClasses.campaignDetails}>
                {edit ?
                    <div>
                        <Paper className={campaignDetailsClasses.paper}>
                            <div>bearbeitbar</div>
                            <div>bearbeitbar</div>


                            <div>bearbeitbar</div>
                            <div>bearbeitbar</div>
                            <div>bearbeitbar</div>
                            <div>bearbeitbar</div>
                            <div>bearbeitbar</div>

                        </Paper>
                    </div>
                    :
                    <div>
                        <Paper className={campaignDetailsClasses.paper}>
                            <div className={campaignDetailsClasses.campaignDetailsHeader}>
                                <CampaignDetailsImageCarousel images={campaign.images}/>
                                <div className={campaignDetailsClasses.contactCard}>hier entsteht die Kontaktkarte</div>
                            </div>


                            <Tabs className={campaignDetailsClasses.tabs}
                                  value={segmentIndex}
                                  onChange={(event, value) => this.handleCategorySwitch(event, value)}
                                  indicatorColor="primary"
                                  textColor="primary"
                            >
                                <Tab className={campaignDetailsClasses.tab} label="Übersicht"/>
                                <Tab className={campaignDetailsClasses.tab} label="Kennzahlen & Zielgruppe"/>
                                <Tab className={campaignDetailsClasses.tab} label="Anbieter"/>
                            </Tabs>

                            {segmentIndex == 0 &&
                            <div>
                                <Typography className={campaignDetailsClasses.headlineTypography}
                                            type="title">
                                    {campaign.campaignDescription.title}
                                </Typography>

                                <Typography className={campaignDetailsClasses.contentTypography}
                                            style={{paddingBottom: 24}}>
                                    {'Anbieter X' + ' | ' + DistributionType[campaign.general.distributionType.toLowerCase()]}
                                </Typography>

                                <Typography style={{
                                    color: theme.palette.secondary.A400,
                                    textAlign: 'justify',
                                    whiteSpace: 'pre-wrap' as any}}
                                            type="caption">
                                    {campaign.campaignDescription.description}
                                </Typography>
                            </div>
                            }

                            {segmentIndex == 1 &&
                            <div>
                                <Typography className={campaignDetailsClasses.headlineTypography}
                                            type="title">
                                    {'Kennzahlen \& Zielgruppe'}
                                </Typography>

                                <GridList cellHeight={40} cols={2} className={campaignDetailsClasses.gridList}>
                                    {Object.keys(campaign.general).map((generalKey) =>  (
                                            <GridListTile cols={1} key={generalKey} cellHeight={'auto'}>
                                                <Typography className={campaignDetailsClasses.contentTypography}>
                                                    {CampaignGeneralDescription[generalKey] + ': ' + campaign.general[generalKey]}
                                                </Typography>
                                            </GridListTile>
                                        )
                                    )}
                                </GridList>
                                <GridList cellHeight={40} cols={2} className={campaignDetailsClasses.gridList}>
                                    {Object.keys(campaign.audience).map((audienceKey) => (
                                            <GridListTile cols={1} key={audienceKey} cellHeight={'auto'}>
                                                <Typography className={campaignDetailsClasses.contentTypography}>
                                                    {CampaignAudienceDescription[audienceKey] + ': ' + campaign.audience[audienceKey]}
                                                </Typography>
                                            </GridListTile>
                                        )
                                    )}
                                </GridList>
                            </div>
                            }

                            {segmentIndex == 2 &&
                            <div>
                                <Typography className={campaignDetailsClasses.headlineTypography}
                                            type="title">
                                    {'Anbieter'}
                                </Typography>

                                <div className={campaignDetailsClasses.providerSegment}>
                                    <div style={{minWidth: 300}}>
                                        hier entsteht das Anbieterprofil
                                    </div>
                                    <Typography style={{color: theme.palette.secondary.A400, textAlign: 'justify', whiteSpace: 'pre-wrap' as any}}
                                                type="caption">
                                        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'}
                                    </Typography>
                                </div>
                            </div>
                            }

                        </Paper>
                    </div>
                }
            </div>
        )
    }
}