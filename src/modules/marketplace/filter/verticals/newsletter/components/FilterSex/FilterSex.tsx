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
import {IFilterSex} from '../../interfaces/IFilterSex';
import {Sex} from '../../../shared/enums/Sex';

export interface FilterSexProps {
    sex?: IFilterSex[];
    active: boolean;

    onChange(sex?: IFilterSex[]);

    toggle(action?: boolean);
}

export interface FilterSexState {
    collapsed: boolean;
}

const filterSexClasses = {
    filterSex: style({
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

export class FilterSex extends Component<FilterSexProps, FilterSexState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(sexValue: Sex) {
        const {sex, onChange, toggle} = this.props;
        const isAnyActive = sex && sex.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        if (!isAnyActive) {
            toggle(true)
        }
        if (sex) {
            const descr = Object
                .keys(Sex)
                .find(key => Sex[key] === sexValue);
            const newSex = sex.map((sex, index) => {
                const subDescr = Object
                    .keys(Sex)
                    .find(key => Sex[key] === sex.sex);

                if (subDescr == descr) {
                    return {
                        sex: sex.sex,
                        active: !sex.active,
                    }
                } else return sex;
            });
            const isAnyActive = newSex && newSex.reduce((acc, val): boolean => !acc ? val.active : acc, false);
            if (!isAnyActive) {
                toggle(false)
            }
            onChange(newSex);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {sex, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (sex) {
            disablingPossible = sex.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        }

        return (
            <div className={filterSexClasses.filterSex}>
                <div className={filterSexClasses.header}>
                    <div className={filterSexClasses.collapseGroup}>
                        <IconButton onClick={() => this.toggleCollapse()}>
                            {collapsed ?
                                <KeyboardArrowRightIcon/>
                                :
                                <KeyboardArrowDownIcon/>
                            }
                        </IconButton>
                        <Typography className={filterSexClasses.typography}
                                    style={{textAlign: 'left'}}
                                    type="subheading"
                                    onClick={() => this.toggleCollapse()}>
                            {'Geschlecht'}
                        </Typography>
                    </div>
                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&
                (sex ?
                        <List style={{width: '100%'}}>
                            {sex.map(sexValue => (
                                <ListItem key={sexValue.sex} dense button className={filterSexClasses.listItem}>
                                    <ListItemText secondary={`${sexValue.sex}`}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onChange={() => this.handleChange(sexValue.sex)}
                                            checked={sexValue.active}
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




