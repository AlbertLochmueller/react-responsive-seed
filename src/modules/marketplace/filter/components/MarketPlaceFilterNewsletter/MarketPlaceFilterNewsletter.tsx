import * as React from 'react';
import {style} from 'typestyle';
import Paper from 'material-ui/Paper';
import {Component} from 'react';
import {NewsletterFilter} from '../../verticals/newsletter/interfaces/NewsletterFilter';
import {FilterSector} from '../../verticals/newsletter/components/FilterSector/FilterSector';
import {FilterBudget} from '../../verticals/newsletter/components/FilterBudget/FilterBudget';
import {FilterSex} from '../../verticals/newsletter/components/FilterSex/FilterSex';
import {FilterBillingTypes} from '../../verticals/newsletter/components/FilterBillingTypes/FilterBillingTypes';
import {FilterAdTypes} from '../../verticals/newsletter/components/FilterAdTypes/FilterAdTypes';
import {AdType} from '../../../../campaigns/enums/AdType';
import {BillingType} from '../../verticals/shared/enums/BillingType';
import {Sex} from '../../verticals/shared/enums/Sex';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../components/App/ui-theme';
import Divider from 'material-ui/Divider';
import {FilterAgeGroups} from '../../verticals/newsletter/components/FilterAgeGroups/FilterAgeGroups';
import {AgeGroup} from '../../../../campaigns/enums/AgeGroup';

export interface MarketPlaceFilterNewsletterProps {
    filters: NewsletterFilter;
    onChange(filters: NewsletterFilter);
}

export interface MarketPlaceFilterNewsletterState {
    filters: NewsletterFilter;
    filtersActive: {
        sector: boolean,
        budget: boolean,
        adTypes: boolean,
        billingTypes: boolean,
        sex: boolean,
        ageGroups: boolean,
    }
}

const marketPlaceFilterNewsletterClasses = {
    paper: style({
        padding: 0,
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    marketPlaceFilterNewsletter: style({
        padding: 12,
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    roleHeader: style({
        width: '100%' as any,
        height: 75,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
        background: theme.palette.background.paper,
    }),
    divider: style({
        height: 1,
        width: '100%' as any,
    })
};

export class MarketPlaceFilterNewsletter extends Component<MarketPlaceFilterNewsletterProps, MarketPlaceFilterNewsletterState> {

    constructor(props){
        super(props);

        this.state = {
            filters: {
                adTypes: [
                    {adType: AdType.text, active: false},
                    {adType: AdType.image, active: false},
                    {adType: AdType.standalone, active: false},
                    {adType: AdType.banner, active: false},
                    {adType: AdType.imageandtext, active: false},
                ],
                billingTypes: [
                    {billingType: BillingType.cpo, active: false},
                    {billingType: BillingType.cpl, active: false},
                    {billingType: BillingType.tkp, active: false},
                    {billingType: BillingType.fixum, active: false},
                ],
                sex: [
                    {sex: Sex.female, active: false},
                    {sex: Sex.male, active: false},
                ],
            ageGroups: [
                {ageGroup: AgeGroup.to18, active: false},
                {ageGroup: AgeGroup.to24, active: false},
                {ageGroup: AgeGroup.to34, active: false},
                {ageGroup: AgeGroup.to44, active: false},
                {ageGroup: AgeGroup.to54, active: false},
                {ageGroup: AgeGroup.to64, active: false},
                {ageGroup: AgeGroup.toDeath, active: false},
            ]
            },
            filtersActive: {
                sector: false,
                budget: false,
                adTypes: false,
                billingTypes: false,
                sex: false,
                ageGroups: false,
            }
        }
    }

    applyFilters(filters: NewsletterFilter) {

        this.setState({
            filters
        });
    }

    toggleActivation(filter: string, dedicatedAction?: boolean){
        this.setState({
            filtersActive: {
                ...this.state.filtersActive,
                [filter]: dedicatedAction == undefined ? !this.state.filtersActive[filter] : dedicatedAction
            }
        })
    }


    render() {
        const {filters, filtersActive} = this.state;

        return (
            <Paper elevation={2}
                   className={marketPlaceFilterNewsletterClasses.paper}>
                <div className={marketPlaceFilterNewsletterClasses.roleHeader}>
                    <Typography type="subheading"
                                noWrap={true}>
                        {'Filter'}
                    </Typography>
                </div>
                <Divider className={marketPlaceFilterNewsletterClasses.divider}/>
                <div className={marketPlaceFilterNewsletterClasses.marketPlaceFilterNewsletter}>
                    <FilterSector
                        sector={filters.sector}
                        active={filtersActive.sector}
                        toggle={(action) => this.toggleActivation('sector', action)}
                        onChange={sector => {sector ? this.applyFilters({...filters, sector}) : this.applyFilters(filters)}}/>
                    <FilterBudget
                        budget={filters.budget}
                        budgetRange={{minValue: 0, maxValue: 1000000}}
                        active={filtersActive.budget}
                        toggle={(action) => this.toggleActivation('budget', action)}
                        onChange={budget => {budget ? this.applyFilters({...filters, budget}) : this.applyFilters(filters)}}/>
                    <FilterAdTypes
                        adTypes={filters.adTypes}
                        active={filtersActive.adTypes}
                        toggle={(action) => this.toggleActivation('adTypes', action)}
                        onChange={adTypes => {adTypes ? this.applyFilters({...filters, adTypes}) : this.applyFilters(filters)}}/>
                    <FilterBillingTypes
                        billingTypes={filters.billingTypes}
                        active={filtersActive.billingTypes}
                        toggle={(action) => this.toggleActivation('billingTypes', action)}
                        onChange={billingTypes => {billingTypes ? this.applyFilters({...filters, billingTypes}) : this.applyFilters(filters)}}/>
                    <FilterSex
                        sex={filters.sex}
                        active={filtersActive.sex}
                        toggle={(action) => this.toggleActivation('sex', action)}
                        onChange={sex => {sex ? this.applyFilters({...filters, sex}) : this.applyFilters(filters)}}/>
                    <FilterAgeGroups
                        ageGroups={filters.ageGroups}
                        active={filtersActive.ageGroups}
                        toggle={(action) => this.toggleActivation('ageGroups', action)}
                        onChange={ageGroups => {ageGroups ? this.applyFilters({...filters, ageGroups}) : this.applyFilters(filters)}}/>
                </div>

            </Paper>
        )
    }
}