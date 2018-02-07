import * as React from 'react';
import {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import {parse} from 'query-string';
import {CampaignDetails} from '../components/CampaignDetails/CampaignDetails';
import {style} from 'typestyle';
import {Campaign} from '../interfaces/Campaign';
import {CampaignService} from '../services/CampaignService';
import {Inject} from 'react.di';
import Paper from 'material-ui/Paper';
import * as loadingImage from '../assets/loading.gif';

type CampaignDetailsContainerProps = RouteComponentProps<{ campaignId: string }>;

const campaignDetailsContainerClasses = {
    campaignDetailsContainer: style({
        width: '100%' as any,
        height: '100%' as any,
        display: 'flex' as any,
        justifyContent: 'center' as any,
    }),
    loadingItem: style({
        position: 'absolute' as any,
        top: '50%' as any,
        left: '50%' as any,
        height: 100,
        width: 100,
    })
};

interface CampaignDetailsContainerState {
    campaign: Campaign;
    loading: boolean;
}

export class CampaignDetailsContainer extends
    Component<CampaignDetailsContainerProps, CampaignDetailsContainerState> {

    @Inject campaignService: CampaignService;

    componentWillMount() {
        const {match: {params: {campaignId}}} = this.props;
        this.setState({
            loading: true,
        });

        this.campaignService.getCampaign(parseFloat(campaignId))
            .then((result) => {
                this.setState({
                    campaign: result.data.content[0],
                });
            })
            .then(() => {
                this.setState({
                    loading: false
                })
            })
            .catch((err) => {
                console.log('Error while loading: ', err)
            });
    }

    render() {
        const {campaign, loading} = this.state;
        const queryParams = parse(location.search, {arrayFormat: 'bracket'});
        const canEdit = 'edit' in queryParams;
        return (
            <div className={campaignDetailsContainerClasses.campaignDetailsContainer}>
                {loading ?

                    <div className={campaignDetailsContainerClasses.loadingItem}>
                        <div style={{position: 'relative', top: '-50%', left: '-50%'}}>
                            <Paper elevation={2}>
                                <img src={loadingImage}/>
                            </Paper>
                        </div>
                    </div>
                    :
                    campaign &&
                    (canEdit ?
                            <CampaignDetails edit={true} campaign={campaign}/>
                            :
                            <CampaignDetails edit={false} campaign={campaign}/>)
                }

            </div>
        );
    }
}