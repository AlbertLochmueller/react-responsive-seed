import * as React from 'react';
import {style} from 'typestyle';
import {Component} from 'react';
import {CollapsedHeader} from './CollapsedHeader/CollapsedHeader';
import {ExpandedHeader} from './ExpandedHeader/ExpandedHeader';
import {theme} from '../../../../components/App/ui-theme';
import {Vertical} from '../../../campaigns/enums/Vertical';
import {HeaderSubmit} from './HeaderSearch/HeaderSearch';
import {RouteComponentProps, withRouter} from 'react-router';
import {parse} from 'query-string';
import {mergeQueries, removeQueryKey} from '../../../utils/routingHelper';

export interface MarketPlaceHeaderProps extends RouteComponentProps<{}> {
    preset: string;
    onSearch();
}

export interface MarketPlaceHeaderState {
    collapsed: boolean;
    query: string;
}

const marketPlaceHeaderClasses = {
    marketPlaceHeader: style({
        width: '100%',
    }),
    expanded: style({
        height: 400,
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    collapsed: style({
        height: 50,
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
};

export class RawMarketPlaceHeader extends Component<MarketPlaceHeaderProps, MarketPlaceHeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            query: ''
        }
    }

    componentWillMount() {
        const queryParams = parse(location.search, {arrayFormat: 'bracket'});

        if (!!queryParams.contains) {
            this.setState({
                query: queryParams.contains
            })
        }
    }

    toggle() {
        const {collapsed} = this.state;
        this.setState({
            collapsed: !collapsed
        })
    }

    // TODO interact with service in container
    handleInput(value: HeaderSubmit) {
        const queryParams = parse(location.search, {arrayFormat: 'bracket'});
        const {history, onSearch} = this.props;

        this.setState({query: value.query});

        if (value.query !== '') {

            if (value.search) {
                history.push(`${this.props.match.url}?${mergeQueries(
                    queryParams, {contains: value.query})}`);
                onSearch();
            }
        } else {
            if (value.search) {
                history.push(`${this.props.match.url}?${removeQueryKey(queryParams, 'contains')}`);
                onSearch();
            }
        }

    }

    switchVertical(vertical: Vertical) {
        // TODO switch the whole marketplace vertical
        console.log('Vertical: ', vertical);
    }


    render() {
        const {collapsed, query} = this.state;

        return (
            <div className={marketPlaceHeaderClasses.marketPlaceHeader}>
                {collapsed ? (
                    <div className={marketPlaceHeaderClasses.collapsed}>
                        <CollapsedHeader
                            toggle={() => this.toggle()}
                            submit={(value) => this.handleInput(value)}
                            switchVertical={(vertical) => this.switchVertical(vertical)}
                            query={query}
                        />
                    </div>
                ) : (
                    <div className={marketPlaceHeaderClasses.expanded}>
                        <ExpandedHeader
                            toggle={() => this.toggle()}
                            submit={(value) => this.handleInput(value)}
                            switchVertical={(vertical) => this.switchVertical(vertical)}
                            query={query}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export const MarketPlaceHeader = withRouter<any>(RawMarketPlaceHeader);
