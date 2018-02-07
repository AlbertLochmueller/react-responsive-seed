import * as React from 'react';
import {NegotiationsContainer} from '../../modules/negotiations/containers/NegotiationsContainer';
import {InvoicesContainer} from '../../modules/invoices/containers/InvoicesContainer';
import {DashboardContainer} from '../../modules/dashboard/containers/DashboardContainer';
import {MarketPlaceContainer} from '../../modules/marketplace/containers/MarketPlaceContainer';
import {SettingsContainer} from '../../modules/settings/containers/SettingsContainer';
import {Switch as RouterSwitch, Route, Redirect} from 'react-router-dom';
import {AuthService} from '../../modules/auth/AuthService';
import {UserModule} from '../../modules/users/UserModule';
import {HttpModule} from '../../modules/http/HttpModule';
import {HISTORY_TOKEN} from '../../modules/common/history';
import {CommonModule} from '../../modules/common/CommonModule';
import {Component} from 'react';
import {Inject, Module} from 'react.di';
import {AuthModule} from '../../modules/auth/AuthModule';
import {Start} from '../../modules/start/advertiser/components/Start';
import {ProvideCampaigns} from '../../modules/start/provider/components/ProvideCampaigns';
import {CampaignModule} from '../../modules/campaigns/CampaignModule';
import {Agreements} from '../../modules/agreements/Agreements';

export const LOGIN_PATH = '/login';
export const DASHBOARD_PATH = '/dashboard';
export const CAMPAIGNS_PATH = '/campaigns';
export const MARKETPLACE_PATH = '/marketplace';
export const NEGOTIATIONS_PATH = '/negotiations';
export const INVOICES_PATH = '/invoices';
export const AGREEMENTS_PATH = '/agreements';
export const SETTINGS_PATH = '/settings';
export const OFFER_PATH = '/offer';
export const START_PATH = '/start';

@Module({
    imports: [
        AuthModule,
        CommonModule,
        HttpModule,
        UserModule,
    ],
    providers: []
})
export class Main extends Component<{}, {}> {
    @Inject(HISTORY_TOKEN) history: History;
    @Inject authService: AuthService;

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <RouterSwitch>
                    <Route exact path={'/'} render={() => {
                        if (this.authService.getValidToken()) {
                            return <DashboardContainer/>;
                        }
                        return <Redirect to={START_PATH}/>;
                    }}/>
                    <Route path={START_PATH} component={Start}/>
                    <Route path={OFFER_PATH} component={ProvideCampaigns}/>
                    <Route path={MARKETPLACE_PATH} component={MarketPlaceContainer}/>
                    <Route path={CAMPAIGNS_PATH} component={CampaignModule} />,
                    {
                        this.authService.getValidToken()
                            ? [
                                    <Route key={DASHBOARD_PATH} path={DASHBOARD_PATH} component={DashboardContainer}/>,
                                    <Route key={NEGOTIATIONS_PATH} path={NEGOTIATIONS_PATH} component={NegotiationsContainer}/>,
                                    <Route key={INVOICES_PATH} path={INVOICES_PATH} component={InvoicesContainer}/>,
                                    <Route key={AGREEMENTS_PATH} path={AGREEMENTS_PATH} component={Agreements}/>,
                                    <Route key={SETTINGS_PATH} path={SETTINGS_PATH} component={SettingsContainer}/>,
                            ]
                            : <Route render={() => <Redirect to={LOGIN_PATH}/>}/>
                    }
                </RouterSwitch>
            </div>
        );
    }
}