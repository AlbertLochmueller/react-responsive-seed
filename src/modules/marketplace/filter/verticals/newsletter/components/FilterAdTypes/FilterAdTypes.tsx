import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {theme} from '../../../../../../../components/App/ui-theme';
import Switch from 'material-ui/Switch';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {IFilterAdTypes} from '../../interfaces/IFilterAdTypes';
import {Component} from 'react';
import {AdType} from '../../../../../../campaigns/enums/AdType';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import IconButton from 'material-ui/IconButton';

export interface FilterAdTypesProps {
    adTypes?: IFilterAdTypes[];
    active: boolean;

    onChange(adTypes?: IFilterAdTypes[]);

    toggle(action?: boolean);
}

export interface FilterAdTypesState {
    collapsed: boolean;
}

const filterAdTypesClasses = {
    filterAdTypes: style({
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

export class FilterAdTypes extends Component<FilterAdTypesProps, FilterAdTypesState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(adType: AdType) {
        const {adTypes, onChange, toggle} = this.props;
        const isAnyActive = adTypes && adTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        if (!isAnyActive) {
            toggle(true)
        }
        if (adTypes) {
            const descr = Object
                .keys(AdType)
                .find(key => AdType[key] === adType);
            const newAdTypes = adTypes.map((adType, index) => {
                const subDescr = Object
                    .keys(AdType)
                    .find(key => AdType[key] === adType.adType);

                if (subDescr == descr) {
                    return {
                        adType: adType.adType,
                        active: !adType.active,
                    }
                } else return adType;
            });

            const isAnyActive = newAdTypes && newAdTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
            if (!isAnyActive) {
                toggle(false)
            }
            onChange(newAdTypes);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {adTypes, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (adTypes) {
            disablingPossible = adTypes.reduce((acc, val): boolean => !acc ? val.active : acc, false);
        }

        return (
            <div className={filterAdTypesClasses.filterAdTypes}>
                <div className={filterAdTypesClasses.header}>
                    <div className={filterAdTypesClasses.collapseGroup}>
                        <IconButton onClick={() => this.toggleCollapse()}>
                            {collapsed ?
                                <KeyboardArrowRightIcon/>
                                :
                                <KeyboardArrowDownIcon/>
                            }
                        </IconButton>
                        <Typography className={filterAdTypesClasses.typography}
                                    style={{textAlign: 'left'}}
                                    type="subheading"
                                    onClick={() => this.toggleCollapse()}>
                            {'Anzeigetypen'}
                        </Typography>
                    </div>

                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&
                (adTypes ?
                    <List style={{width: '100%'}}>
                        {adTypes.map(adType => (
                            <ListItem key={adType.adType} dense button className={filterAdTypesClasses.listItem}>
                                <ListItemText secondary={`${adType.adType}`}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={() => this.handleChange(adType.adType)}
                                        checked={adType.active}
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
