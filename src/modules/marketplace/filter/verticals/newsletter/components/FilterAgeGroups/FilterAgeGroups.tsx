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
import {IFilterAgeGroups} from '../../interfaces/IFilterAgeGroups';
import {AgeGroup} from '../../../../../../campaigns/enums/AgeGroup';

export interface FilterAgeGroupsProps {
    ageGroups?: IFilterAgeGroups[];
    active: boolean;

    onChange(ageGroups?: IFilterAgeGroups[]);

    toggle(action?: boolean);
}

export interface FilterAgeGroupsState {
    collapsed: boolean;
}

const filterAgeGroupsClasses = {
    filterAgeGroups: style({
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

export class FilterAgeGroups extends Component<FilterAgeGroupsProps, FilterAgeGroupsState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(ageGroup: AgeGroup) {
        const {ageGroups, onChange, toggle} = this.props;
        const isAnyActive = ageGroups && ageGroups.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        if (!isAnyActive) {
            toggle(true)
        }
        if (ageGroups) {
            const descr = Object
                .keys(AgeGroup)
                .find(key => AgeGroup[key] === ageGroup);
            const newAgeGroups = ageGroups.map((ageGroup, index) => {
                const subDescr = Object
                    .keys(AgeGroup)
                    .find(key => AgeGroup[key] === ageGroup.ageGroup);

                if (subDescr == descr) {
                    return {
                        ageGroup: ageGroup.ageGroup,
                        active: !ageGroup.active,
                    }
                } else return ageGroup;
            });

            const isAnyActive = newAgeGroups && newAgeGroups.reduce((acc, val): boolean => !acc ? val.active : acc, false);
            if (!isAnyActive) {
                toggle(false)
            }
            onChange(newAgeGroups);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {ageGroups, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (ageGroups) {
            disablingPossible = ageGroups.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        }

        return (
            <div className={filterAgeGroupsClasses.filterAgeGroups}>
                <div className={filterAgeGroupsClasses.header}>
                    <div className={filterAgeGroupsClasses.collapseGroup}>
                        <IconButton onClick={() => this.toggleCollapse()}>
                            {collapsed ?
                                <KeyboardArrowRightIcon/>
                                :
                                <KeyboardArrowDownIcon/>
                            }
                        </IconButton>
                        <Typography className={filterAgeGroupsClasses.typography}
                                    style={{textAlign: 'left'}}
                                    type="subheading"
                                    onClick={() => this.toggleCollapse()}>
                            {'Altersgruppen'}
                        </Typography>
                    </div>

                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&
                (ageGroups ?
                        <List style={{width: '100%'}}>
                            {ageGroups.map(ageGroup => (
                                <ListItem key={ageGroup.ageGroup} dense button className={filterAgeGroupsClasses.listItem}>
                                    <ListItemText secondary={`${ageGroup.ageGroup}`}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onChange={() => this.handleChange(ageGroup.ageGroup)}
                                            checked={ageGroup.active}
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
