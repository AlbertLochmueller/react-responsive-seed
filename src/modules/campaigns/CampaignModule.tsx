import * as React from 'react';
import {Inject, Module} from 'react.di';
import {CampaignService} from './services/CampaignService';
import {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router';
import {MyCampaignsContainer} from './containers/MyCampaignsContainer';
import {CampaignDetailsContainer} from './containers/CampaignDetailsContainer';
import {AuthService} from '../auth/AuthService';
import {LOGIN_PATH} from '../../components/Main/Main';

export const CAMPAIGN_DETAILS_ROUTES = '/:campaignId';

@Module({
    providers: [
        CampaignService,
    ]
})
@withRouter
export class CampaignModule extends Component<any> {

    @Inject authService: AuthService;

    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={`${match.url}${CAMPAIGN_DETAILS_ROUTES}`} component={CampaignDetailsContainer} />
                {
                    this.authService.getValidToken()
                        ? <Route exact path={match.url} component={MyCampaignsContainer} />
                        : <Route render={() => <Redirect to={LOGIN_PATH}/>}/>
                }
            </Switch>
        );
    }
}
