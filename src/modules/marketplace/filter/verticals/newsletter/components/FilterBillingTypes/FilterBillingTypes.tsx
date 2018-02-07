import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {theme} from '../../../../../../../components/App/ui-theme';
import Switch from 'material-ui/Switch';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {Component} from 'react';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import IconButton from 'material-ui/IconButton';
import {IFilterBillingTypes} from '../../interfaces/IFilterBillingTypes';
import {BillingType} from '../../../shared/enums/BillingType';

export interface FilterBillingTypesProps {
    billingTypes?: IFilterBillingTypes[];
    active: boolean;

    onChange(billingTypes?: IFilterBillingTypes[]);

    toggle(action?: boolean);
}

export interface FilterBillingTypesState {
    collapsed: boolean;
}

const filterBillingTypesClasses = {
    filterBillingTypes: style({
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'center' as any,
    }),
    header: style({
        width: '100%' as any,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
    }),
    typography: style({
        color: theme.palette.secondary.A400,
        cursor: 'pointer' as any,
    }),
    listItem: style({
        width: '100%' as any,
        display: 'flex' as any,
        alignItems: 'center' as any,
        textAlign: 'left' as any,
    }),
    collapseGroup: style({
        display: 'flex' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
    })
};

export class FilterBillingTypes extends Component<FilterBillingTypesProps, FilterBillingTypesState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(billingType: BillingType) {
        const {billingTypes, onChange, toggle} = this.props;
        const isAnyActive = billingTypes && billingTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        if (!isAnyActive) {
            toggle(true)
        }
        if (billingTypes) {
            const descr = Object
                .keys(BillingType)
                .find(key => BillingType[key] === billingType);
            const newBillingTypes = billingTypes.map((billingType, index) => {
                const subDescr = Object
                    .keys(BillingType)
                    .find(key => BillingType[key] === billingType.billingType);

                if (subDescr == descr) {
                    return {
                        billingType: billingType.billingType,
                        active: !billingType.active,
                    }
                } else return billingType;
            });

            const isAnyActive = newBillingTypes && newBillingTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
            if (!isAnyActive) {
                toggle(false)
            }
            onChange(newBillingTypes);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {billingTypes, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (billingTypes) {
            disablingPossible = billingTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        }

        return (
            <div className={filterBillingTypesClasses.filterBillingTypes}>
                <div className={filterBillingTypesClasses.header}>
                    <div className={filterBillingTypesClasses.collapseGroup}>
                    <IconButton onClick={() => this.toggleCollapse()}>
                        {collapsed ?
                            <KeyboardArrowRightIcon/>
                            :
                            <KeyboardArrowDownIcon/>
                        }
                    </IconButton>
                    <Typography className={filterBillingTypesClasses.typography}
                                style={{textAlign: 'left'}}
                                type="subheading"
                                onClick={() => this.toggleCollapse()}>
                        {'Abrechnung'}
                    </Typography>
                    </div>
                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&
                (billingTypes ?
                        <List style={{width: '100%'}}>
                            {billingTypes.map(billingType => (
                                <ListItem key={billingType.billingType} dense button className={filterBillingTypesClasses.listItem}>
                                    <ListItemText secondary={`${billingType.billingType}`}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onChange={() => this.handleChange(billingType.billingType)}
                                            checked={billingType.active}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        :
                        <div>
                            {'</>'}
                        </div>
                )
                }
            </div>
        )
    }
}




