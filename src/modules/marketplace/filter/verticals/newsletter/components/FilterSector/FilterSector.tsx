import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {theme} from '../../../../../../../components/App/ui-theme';
import Switch from 'material-ui/Switch';
import {Component} from 'react';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import IconButton from 'material-ui/IconButton';
import {MenuSelect} from '../../../../../../layout/components/MenuSelect/MenuSelect';
import {Sector} from '../../../../../../campaigns/enums/Sector';

export interface FilterSectorProps {
    sector?: Sector;
    active: boolean;

    onChange(sector?: Sector);

    toggle(action?: boolean);
}

export interface FilterSectorState {
    collapsed: boolean;
}

const filterSectorClasses = {
    filterSector: style({
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

export class FilterSector extends Component<FilterSectorProps, FilterSectorState> {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        }
    }

    handleChange(sectorValue: Sector) {
        const {sector, onChange, toggle} = this.props;
        if (!sector) {
            toggle(true);
            onChange(sectorValue);
        } else {
            onChange(sectorValue);
        }
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render() {
        const {sector, active, toggle} = this.props;
        const {collapsed} = this.state;

        let disablingPossible = false;
        if (sector) {disablingPossible = true}

        return (
            <div className={filterSectorClasses.filterSector}>
                <div className={filterSectorClasses.header}>
                    <div className={filterSectorClasses.collapseGroup}>
                        <IconButton onClick={() => this.toggleCollapse()}>
                            {collapsed ?
                                <KeyboardArrowRightIcon/>
                                :
                                <KeyboardArrowDownIcon/>
                            }
                        </IconButton>
                        <Typography className={filterSectorClasses.typography}
                                    style={{textAlign: 'left'}}
                                    type="subheading"
                                    onClick={() => this.toggleCollapse()}>
                            {'Branche'}
                        </Typography>
                    </div>

                    <Switch
                        disabled={!disablingPossible}
                        onChange={() => toggle()}
                        checked={active}
                    />
                </div>

                {!collapsed &&

                <MenuSelect name={'sector'}
                            id={'select-sector'}
                            value={sector ? sector : ''}
                            label={''}
                            hasError={false}
                            options={Sector}
                            onChange={(event) => this.handleChange(event.target.value)}/>
                }
            </div>
        )
    }
}
