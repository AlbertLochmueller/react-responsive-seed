import * as React from 'react';
import {Component} from 'react';
import {MarketPlace} from '../MarketPlace';
import {Inject} from 'react.di';
import {CampaignService} from '../../campaigns/services/CampaignService';
import {AuthService} from '../../auth/AuthService';

interface MarketPlaceContainerState {
    loading: boolean;
    campaigns: any;
}

export class MarketPlaceContainer extends Component<{}, MarketPlaceContainerState> {

    @Inject campaignService: CampaignService;
    @Inject authService: AuthService;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            campaigns: [],
        };
    }

    componentWillMount() {
        this.campaignService.getCampaigns(location.search)
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

    applyFilters() {
        this.setState({
            loading: true
        });

        this.campaignService.getCampaigns(location.search)
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
            });
    }

    render() {
        const {campaigns, loading} = this.state;

        return (
            <MarketPlace 
            campaigns={campaigns}
            onFilter={() => this.applyFilters()}
            loading={loading}
            fullAccess={this.authService.hasValidToken()}
            />);
    }
}
