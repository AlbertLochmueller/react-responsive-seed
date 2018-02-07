import * as React from 'react';
import {Component} from 'react';
import Card from 'material-ui/Card';
import {style} from 'typestyle';
import {Headline} from './Headline/Headline';
import Typography from 'material-ui/Typography';
import {Footer} from './Footer/Footer';
import {Inject} from 'react.di';
import {RegisterCTA} from './CallToAction/RegisterCTA/RegisterCTA';
import {theme} from '../../../../components/App/ui-theme';
import {NewsletterHttpService} from '../../shared/services/NewsletterHttpService';

const startClasses = {
    root: style({
        textAlign: 'center' as 'center',
        display: 'flex' as any,
        justifyContent: 'center' as any,
        flexWrap: 'wrap' as any
    }),
    fullWidth: style({
        borderTop: '1px solid #f4f4f4',
        zIndex: theme.zIndex.layer,
        marginBottom: 8,
        width: '100%',
        height: 425,
        display: 'inline-block' as any,
        boxShadow: 'none' as any,
    }),
    headlineTypography: style({
        fontWeight: 'bold' as any,
        textAlign: 'center' as any,
        color: theme.palette.text.primary
    }),
    contentTypography: style({
        color: theme.palette.secondary.A400,
        textAlign: 'center' as any,
    }),
    cardArea: style({
        height: 800,
        backgroundColor: '#ffffff' as any,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        flexWrap: 'wrap' as any,
        width: '90%',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '90%',
        },
    }),
    registerCTA: style({
        width: 600,
        [theme.breakpoints.up('lg')]: {
            width: 1200,
        },
        // [theme.breakpoints.down('lg')]: {
        //     width: 900,
        // },
        [theme.breakpoints.down('md')]: {
            width: 600,
        },
        [theme.breakpoints.up('md')]: {
            width: 1200,
        },
    }),
    dividingSection: style({
        width: '100%',
        margin: '50px auto',
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-evenly' as any,
        height: 100,
        [theme.breakpoints.down('md')]: {
            height: 0,
            display: 'none' as any,
        },
    })
};

interface ProvideCampaignsState {
    loading: boolean;
}

export class ProvideCampaigns extends Component<{}, ProvideCampaignsState> {

    @Inject newsletterHttpService: NewsletterHttpService;

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentWillMount() {
    }

    async handleNewsletterSubscription(email: string) {
        this.setState({loading: true});
        try {
            const {headers} = await this.newsletterHttpService.subscribe(email);
            console.log('Address sent, response: ', headers);
        } catch (e) {
            this.setState({loading: false});
            console.log('Error: ', e);
        }
    }


    render() {
        return (
            <div>
                <div className={startClasses.root}>
                    <Card className={startClasses.fullWidth}>
                        <Headline/>
                    </Card>
                    <div className={startClasses.dividingSection}>
                        <Typography className={startClasses.headlineTypography} type="headline">
                            {'Deine Vorteile als Kampagnen-Anbieter auf Fastreach'}
                        </Typography>
                        <Typography className={startClasses.contentTypography} type="subheading">
                            {'In wenigen Schritten Kampagnen inserieren, verhandeln & Angebote erstellen'}
                        </Typography>
                    </div>
                    <div className={startClasses.cardArea}>
                        cards
                    </div>

                    <div className={startClasses.registerCTA}>
                        <RegisterCTA/>
                    </div>

                    <Footer submitMail={(email) => this.handleNewsletterSubscription(email)}/>
                </div>
            </div>
        )
    }
}

