import * as React from 'react';
import {style} from 'typestyle';
import {Component} from 'react';
import {
    MarketPlaceSortingHeader,
    SortingDirection
} from './components/MarketPlaceSortingHeader/MarketPlaceSortingHeader';
import {RouteComponentProps, withRouter} from 'react-router';
import {parse} from 'query-string';
import {mergeQueries} from '../../utils/routingHelper';

export interface MarketPlaceSortingProps extends RouteComponentProps<{}> {
    preset: string;
    onSort();
}

export interface MarketPlaceSortingState {
    identifier: string;
    order: SortingDirection;
}

const marketPlaceSortingClasses = {
    marketPlaceSorting: style({
        position: 'absolute' as any,
        marginBottom: 25,
        width: 800,
        textAlign: 'center' as 'center',
        display: 'inline-block' as any,
    }),
};

export class RawMarketPlaceSorting extends Component<MarketPlaceSortingProps, MarketPlaceSortingState> {

    constructor(props) {
        super(props);

        this.state = {
            identifier: '',
            order: SortingDirection.asc
        }
    }

    componentWillMount() {
        const queryParams = parse(location.search, {arrayFormat: 'bracket'});

        if (queryParams.sortDir && queryParams.sortValue) {
            this.setState({
                identifier: queryParams.sortValue,
                order: queryParams.sortDir
            })
        }
    }

    handleSortingAction(identifier: string, order: SortingDirection) {
        const queryParams = parse(location.search, {arrayFormat: 'bracket'});
        const {history, onSort} = this.props;

        history.push(`${this.props.match.url}?${mergeQueries(
            queryParams,
            {
                sortValue: identifier,
                sortDir: order
            })}`);

        onSort();
    }

    render() {
        const {order, identifier} = this.state;

        return (
            <div className={marketPlaceSortingClasses.marketPlaceSorting}>
                <MarketPlaceSortingHeader
                    initialSorting={{identifier, order}}
                    onSortAction={(identifier, order) => this.handleSortingAction(identifier, order)}/>
            </div>
        )
    }
}

export const MarketPlaceSorting = withRouter<any>(RawMarketPlaceSorting);

