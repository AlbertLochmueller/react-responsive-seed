import * as React from 'react';
import {Component} from 'react';
import {style} from 'typestyle';
import {theme} from '../../components/App/ui-theme';
import {MarketPlaceHeader} from './header/components/MarketPlaceHeader';
import {MarketPlaceFilter} from './filter/components/MarketPlaceFilter';
import {MarketPlaceSorting} from './sorting/MarketPlaceSorting';
import {MarketPlaceResult} from './result/MarketPlaceResult';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import * as loadingImage from '../campaigns/assets/loading.gif';
import Typography from 'material-ui/Typography';

const marketPlaceClasses = {
    marketPlace: style({
        width: '100%',
        textAlign: 'center' as 'center',
        display: 'flex' as any,
        // flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        flexWrap: 'wrap' as any
    }),
    marketPlaceHeader: style({
        marginBottom: 25,
        width: '100%',
        display: 'inline-block' as any,
    }),
    marketPlaceBody: style({
        display: 'flex' as any,
        flexDirection: 'row' as any,
        flexWrap: 'nowrap' as any,
        justifyContent: 'center' as any,
        // textAlign: 'center' as any,
        height: 1600,
    }),
    marketPlaceFilter: style({
        position: 'relative' as any,
        width: 275,
        height: 'inherit' as any,
        margin: theme.spacing.unit,
    }),
    marketPlaceView: style({
        width: 800,
        height: 'inherit' as any,
        position: 'relative' as any,
        margin: theme.spacing.unit,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'flex-start' as any,
        flexWrap: 'wrap' as any
    }),
    marketPlaceResult: style({
        position: 'absolute' as any,
        // margin: theme.spacing.unit,
        width: 800,
        top: '7%',
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    loadingItem: style({
        height: 100,
        width: 100,
    }),
    emptyItem: style({
        position: 'absolute' as any,
        height: 100,
        top: '7%',
        width: '100%',
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    })
};

export interface MarketPlaceProps {
    campaigns: any;
    loading: boolean;
    fullAccess: boolean;
    onFilter();
}

interface MarketPlaceState {
    // campaigns: Campaign[];
}

export class MarketPlace extends Component<MarketPlaceProps, MarketPlaceState> {


    constructor(props) {
        super(props);

        this.state = {}

    }

    componentWillMount() {
    }

    componentWillReceiveProps(){

    }


    render() {
        const {campaigns, loading, fullAccess, onFilter} = this.props;

        return (
            <div className={marketPlaceClasses.marketPlace}>
                <Card className={marketPlaceClasses.marketPlaceHeader}>
                    <MarketPlaceHeader onSearch={() => onFilter()}/>
                </Card>

                <div className={marketPlaceClasses.marketPlaceBody}>
                    <div className={marketPlaceClasses.marketPlaceFilter}>
                        <MarketPlaceFilter/>
                    </div>
                    <div className={marketPlaceClasses.marketPlaceView}>
                        <MarketPlaceSorting onSort={() => onFilter()} preset={''}/>
                        {loading ?

                            <div className={marketPlaceClasses.marketPlaceResult}>
                                <div className={marketPlaceClasses.loadingItem}>
                                    <Paper elevation={2}>
                                        <img src={loadingImage}/>
                                    </Paper>
                                </div>
                            </div>
                            :
                            campaigns.length ?
                            <MarketPlaceResult campaigns={campaigns} fullAccess={fullAccess}/>
                                :
                                <Paper elevation={2} className={marketPlaceClasses.emptyItem}>
                                    <Typography style={{color: theme.palette.secondary.A400,}}
                                                type="subheading"
                                                noWrap={true}>
                                        {'Keine Ergebnisse :( '}
                                    </Typography>
                                </Paper>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

