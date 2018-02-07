import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {theme} from '../../../../../../../components/App/ui-theme';
import Switch from 'material-ui/Switch';
import {Component} from 'react';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import IconButton from 'material-ui/IconButton';
import {IFilterBudget} from '../../interfaces/IFilterBudget';

export interface FilterBudgetProps {
    budgetRange?: IFilterBudget;
    budget?: number;
    active: boolean;

    onChange(budget?: number);

    toggle(action?: boolean);
}

export interface FilterBudgetState {
    collapsed: boolean;
}

const filterBudgetClasses = {
    filterBudget: style({
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

export class FilterBudget extends Component<FilterBudgetProps, FilterBudgetState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(budgetValue: number) {
        const {budget, onChange, toggle} = this.props;
        if (!budget) {
            toggle(true);
            onChange(budgetValue);
        } else {
            onChange(budgetValue);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {budget, budgetRange, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (budget) {
            disablingPossible = true
        }

        return (
            <div className={filterBudgetClasses.filterBudget}>
                <div className={filterBudgetClasses.header}>
                    <div className={filterBudgetClasses.collapseGroup}>
                        <IconButton onClick={() => this.toggleCollapse()}>
                            {collapsed ?
                                <KeyboardArrowRightIcon/>
                                :
                                <KeyboardArrowDownIcon/>
                            }
                        </IconButton>
                        <Typography className={filterBudgetClasses.typography}
                                    style={{textAlign: 'left'}}
                                    type="subheading"
                                    onClick={() => this.toggleCollapse()}>
                            {'Budget'}
                        </Typography>
                    </div>

                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&

                <div>
                    {'Kommt Noch'}
                </div>

                }
            </div>
        )
    }
}
