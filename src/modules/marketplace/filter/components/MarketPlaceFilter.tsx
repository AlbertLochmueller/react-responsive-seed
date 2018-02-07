import * as React from 'react';
import './FilterDetails.scss';
import {style} from 'typestyle';
import {MarketPlaceFilterNewsletter} from './MarketPlaceFilterNewsletter/MarketPlaceFilterNewsletter';

const marketPlaceFilterClasses = {
    marketPlaceFilter: style({
        position: 'absolute' as any,
        // margin: theme.spacing.unit,
        width: '100%',
        height: '100%',
        // textAlign: 'center' as 'center',
        display: 'block' as any,
    }),
};

export interface MarketPlaceFilterProps {
    // filter: IFilter;
    // onChange(filter: IFilter);
}

// TODO Implement switch according to vertical
export const MarketPlaceFilter = (/*{filter, onChange}: MarketPlaceFilterProps*/) => (
    <div className={marketPlaceFilterClasses.marketPlaceFilter}>
        <MarketPlaceFilterNewsletter filters={{}} onChange={() => ''}/>
    </div>
    /*<NewsletterFilter/>*/
);
