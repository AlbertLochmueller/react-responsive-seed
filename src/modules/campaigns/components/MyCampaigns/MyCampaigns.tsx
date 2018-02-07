import * as React from 'react';
import {Component} from 'react';
import {Campaign} from '../../interfaces/Campaign';
import {MyCampaignsNav} from './MyCampaignsNav/MyCampaignsNav';
import {style} from 'typestyle';
import Divider from 'material-ui/Divider';
import {MyCampaignsItem} from './MyCampaignsItem/MyCampaignsItem';

export interface MyCampaignsProps {
    campaigns: Campaign[];

}

interface MyCampaignsState {
    adCount: number;
}

const myCampaignsClasses = {
    myCampaigns: style({
        padding: 24,
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
    }),
    divider: style({
        width: '100%' as any,
        margin: '24px 0' as any,
    }),
};

export class MyCampaigns extends Component<MyCampaignsProps, MyCampaignsState> {
    constructor(props) {
        super(props);

        this.state = {
            adCount: 0
        }
    }

    handleFilter() {
        alert('filters activated');
    }

    componentWillMount() {
        const {campaigns} = this.props;

        if (campaigns.length) {
            const adCount = campaigns.reduce((value, campaign) => {
                return value + campaign.ads.length || 0;
            }, 0);
            this.setState({
                adCount
            })
        } else {
            this.setState({
                adCount: 0
            })
        }
    }


    render() {
        const {campaigns} = this.props;
        const {adCount} = this.state;

        return (
            <div className={myCampaignsClasses.myCampaigns}>
                <MyCampaignsNav adCount={adCount}
                                campaignCount={campaigns.length || 0}
                                filter={() => this.handleFilter()}/>
                <Divider className={myCampaignsClasses.divider}/>
                {campaigns.map((campaign, index) => {
                    return <MyCampaignsItem campaign={campaign} key={index}/>
                })}
            </div>

        )
    }
}
