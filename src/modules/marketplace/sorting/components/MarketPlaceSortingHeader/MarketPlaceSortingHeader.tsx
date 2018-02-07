import * as React from 'react';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import Paper from 'material-ui/Paper';
import {TableSortLabel} from 'material-ui/Table';
import {Component} from 'react';
import Typography from 'material-ui/Typography';


export interface MarketPlaceSortingHeaderProps {
    initialSorting: {
      identifier: string,
      order: SortingDirection,
    };
    onSortAction(identifier: string, order: SortingDirection);
}

export enum SortingDirection {
    asc = "asc",
    desc = "desc",
}

export interface MarketPlaceSortingHeaderState {
    orderBy?: string;
    order: SortingDirection;
}

const sortingProperties = [
    {value: 'title', label: 'Titel'},
    {value: 'provider', label: 'Anbieter'},
    {value: 'range', label: 'Reichweite'},
    {value: 'minVolume', label: 'Buchungsvolumen'},
    ];

const marketPlaceSortingHeaderClasses = {
    marketPlaceSortingHeader: style({
        padding: 12,
        marginBottom: 12,
        width: '100%' as any,
        height: 75,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    sortingItem: style({
        width: 150,
        // textOverflow: 'ellipsis' as any,
        margin: theme.spacing.unit,
        textAlign: 'center' as any,
    }),
    typography: style({
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.text.primary
            }
        }
    })
};

export class MarketPlaceSortingHeader extends Component<MarketPlaceSortingHeaderProps, MarketPlaceSortingHeaderState> {

    constructor(props){
        super(props);

        this.state = {
            orderBy: '',
            order: SortingDirection.asc
        }
    }

    componentWillMount() {
        const {initialSorting} = this.props;

        this.setState({
            orderBy: initialSorting.identifier,
            order: initialSorting.order
        });
    }

    handleSorting(newOrderBy: string) {
        const {order, orderBy} = this.state;
        const {onSortAction} = this.props;

        if (newOrderBy == orderBy) {
            this.setState({
                order: order == SortingDirection.asc ? SortingDirection.desc : SortingDirection.asc
            }, () => {
                onSortAction(newOrderBy, this.state.order)
            })
        } else {
            this.setState({
                orderBy: newOrderBy,
                order: SortingDirection.asc
            }, () => {
                onSortAction(newOrderBy, this.state.order)
            })
        }

    }

    render() {
        const {order, orderBy} = this.state;

        return (
            <Paper elevation={2}
                   className={marketPlaceSortingHeaderClasses.marketPlaceSortingHeader}>
                {sortingProperties.map((property, index) => (
                    <TableSortLabel
                        key={property.value}
                        className={marketPlaceSortingHeaderClasses.sortingItem}
                        active={(orderBy !== undefined) ? (orderBy === property.value) : false}
                        direction={order || undefined}
                        onClick={() => this.handleSorting(property.value)}
                    >
                        <Typography className={marketPlaceSortingHeaderClasses.typography}
                                    type="caption">
                            {property.label}
                        </Typography>
                    </TableSortLabel>
                ))}
            </Paper>
        )
    }
}