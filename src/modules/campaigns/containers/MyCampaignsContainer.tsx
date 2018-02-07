import * as React from 'react';
import {Component} from 'react';
import {MyCampaigns} from '../components/MyCampaigns/MyCampaigns';
import {Campaign} from '../interfaces/Campaign';
import {Inject} from 'react.di';
import {CampaignService} from '../services/CampaignService';
import Paper from 'material-ui/Paper';
import * as loadingImage from '../assets/loading.gif';
import {style} from 'typestyle';

interface MyCampaignsContainerState {
    loading: boolean;
    campaigns?: Campaign[];
}

const myCampaignsContainerClasses = {
    myCampaignsContainer: style({
        width: '100%' as any,
        height: '100%' as any,
    }),
    loadingItem: style({
        position: 'absolute' as any,
        top: '50%' as any,
        left: '50%' as any,
        height: 100,
        width: 100,
    })
};

export class MyCampaignsContainer extends Component<{}, MyCampaignsContainerState> {

    @Inject campaignService: CampaignService;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentWillMount() {
        this.campaignService.getMyCampaigns()
            .then((result) => {
                this.setState({
                    campaigns: result.data.content,
                });
            })
            .then(() => {
                this.setState({
                    loading: false
                })
            })
            .catch((err) => {
                console.log('Error while loading: ', err)
            })
    }

    render() {
        const {campaigns, loading} = this.state;

        console.log('kampagnen: ', campaigns);

        return (
            <div className={myCampaignsContainerClasses.myCampaignsContainer}>
                {loading ?

                    <div className={myCampaignsContainerClasses.loadingItem}>
                        <div style={{position: 'relative', top: '-50%', left: '-50%'}}>
                            <Paper elevation={2}>
                                <img src={loadingImage}/>
                            </Paper>
                        </div>
                    </div>
                    :
                    campaigns &&
                    <MyCampaigns campaigns={campaigns}/>
                }
            </div>
        );
    }
}
