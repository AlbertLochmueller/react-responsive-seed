import * as React from 'react';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import Input, {InputAdornment} from 'material-ui/Input';
import Button from 'material-ui/Button';
import {Component} from 'react';
import * as classNames from 'classnames';
import SendIcon from 'material-ui-icons/Send';
import ClearIcon from 'material-ui-icons/Clear';

export interface HeaderSubmit {
    query: string;
    search: boolean;
}

export interface HeaderSearchProps {
    collapsed: boolean;
    query: string;

    submit(value: HeaderSubmit);
}

export interface HeaderSearchState {
    query: string;
}

const headerSearchClasses = {
    expanded: style({
        width: '100%',
        height: 50,
        textAlign: 'center' as any,
        boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.2), 2px 4px 4px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
    }),
    collapsed: style({
        height: '100%',
        borderRadius: 0,
    }),
    button: style({
        textTransform: 'none' as any,
        padding: '8px 32px',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        boxShadow: 'none' as any,
        // display: 'inline-block' as any,
        // width: 'auto' as any,
        whiteSpace: 'nowrap' as any,
        background: 'linear-gradient(90deg, #1f877d 30%, #26A69A 90%)',
    }),
    test: style({
        height: 'inherit' as any,
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400
            }
        }
    }),
    searchElement: style({
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
};

export class HeaderSearch extends Component<HeaderSearchProps, HeaderSearchState> {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        }
    }

    handleInputChange(query: string) {
        this.setState({query});

        const {submit} = this.props;
        submit({query, search: false});
    }

    render() {
        const {query} = this.state;
        const {submit, collapsed} = this.props;

        return (
            <div>
                {collapsed ? (
                    <div className={headerSearchClasses.collapsed}>
                        <div className="has-icon-right" style={{margin: 'auto'}}>
                            <input type="text" onChange={e => this.handleInputChange(e.target.value)}
                                   onKeyUp={(e) => (e.keyCode === 13) ? submit({query, search: true}) : null}
                                   value={(query !== '') ? query : ''}
                                   className={classNames(headerSearchClasses.test, 'form-input')}
                                   placeholder="Newsletter-Kampagne"/>
                            <SendIcon
                                className={classNames(headerSearchClasses.searchElement, 'form-icon')}
                                onClick={() => submit({query, search: true})}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={headerSearchClasses.expanded}>
                        <div className="input-group">
                            <Input type="text" onChange={e => this.handleInputChange(e.target.value)}
                                   onKeyUp={(e) => (e.keyCode === 13) ? submit({query, search: true}) : null}
                                   style={
                                       {
                                           height: 'inherit',
                                           borderWidth: 3,
                                           borderColor: '#1f877d',
                                           display: 'flex',
                                           alignItems: 'center'
                                       }}
                                   className="form-input"
                                   value={(query !== '') ? query : ''}
                                   placeholder="Kampagne"
                                   startAdornment={(query !== '') && <InputAdornment
                                       position="start">
                                       <ClearIcon
                                           className={headerSearchClasses.searchElement}
                                           onClick={() => {
                                           this.handleInputChange('');
                                           submit({query: '', search: true})
                                       }}/>
                                   </InputAdornment>}
                            />
                            <Button className={headerSearchClasses.button}
                                    raised color="primary"
                                    type="submit"
                                    onClick={() => submit({query, search: true})}>{'Kampagnen finden'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}