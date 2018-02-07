import * as React from 'react';
import * as classNames from 'classnames';
import {ChangeEvent, Component, KeyboardEvent, MouseEvent} from "react";
import './AutoComplete.scss';

interface IAutoCompleteState {
  hasFocus: boolean;
  focusedItemIndex?: number;
}

interface IAutoCompleteProps<T> {
  results: T[];
  placeholder: string;
  useInlineBlaBla?: boolean;
  delay?: number;
  itemPropName?: string;
  cancelPreviousSearch();
  onSearch(searchTerm: string);
  onSelect(item: T);
}

export class AutoComplete extends Component<IAutoCompleteProps<any>, IAutoCompleteState> {

  timeoutId: any;

  constructor() {
    super();

    this.state = {
      hasFocus: false
    };
  }

  handleInputChange(e: ChangeEvent<any>) {
    const searchTerm = e.currentTarget.value;
    const {delay, onSearch, cancelPreviousSearch} = this.props;

    cancelPreviousSearch();
    clearTimeout(this.timeoutId);

    if (searchTerm) {
      this.timeoutId = setTimeout(() => onSearch(searchTerm), delay || 300);
    }
  }

  handleFocus(hasFocus: boolean) {
    let delay = 0;

    // TODO@robin this need to be improved, 'cause
    // TODO@robin it is more a quick fix than a
    // TODO@robin satisfying solution
    // When focus is lost, menu gets hidden; To prevent
    // this, "hasFocus=false" state will be set with
    // a delay, to give time to click on menu item.
    if (hasFocus === false) {
      delay = 100;
    }

    setTimeout(() => this.setState({hasFocus}), delay);
  }

  handleKeyUp({keyCode, preventDefault}: KeyboardEvent<any>) {
    preventDefault();

    const {results} = this.props;
    const {focusedItemIndex} = this.state;
    const hasResults = !!results.length;

    if (!hasResults) {
      this.setState({focusedItemIndex: undefined});
      return;
    }
    const isArrowUp = keyCode === 38;
    const isArrowDown = keyCode === 40;
    const isReturn = keyCode === 13;

    if (isReturn) {
      if (focusedItemIndex !== undefined) {
        this.handleSelectItem(focusedItemIndex);
      }
    } else if (isArrowUp || isArrowDown) {
      this.setFocusedItemIndex(isArrowUp, isArrowDown, results);
    }
  }

  handleSelectItem(index: number, e?: MouseEvent<any>) {
    if (e) {
      e.preventDefault();

      // In case of mouse click event, reset focus index
      this.setState({focusedItemIndex: undefined});
    }

    const {searchInput} = this.refs;
    const {results, onSelect} = this.props;
    onSelect(results[index]);
    (searchInput as HTMLInputElement).blur();
  }

  setFocusedItemIndex(isArrowUp, isArrowDown, results: any[]) {
    const {focusedItemIndex} = this.state;
    const lastIndex = results.length - 1;

    if (isArrowUp) {
      if (focusedItemIndex === undefined) {
        this.setState({focusedItemIndex: lastIndex});
      } else if (focusedItemIndex === 0) {
        this.setState({focusedItemIndex: undefined});
      } else {
        this.setState({focusedItemIndex: focusedItemIndex - 1});
      }
    } else if (isArrowDown) {
      if (focusedItemIndex === undefined) {
        this.setState({focusedItemIndex: 0});
      } else if (focusedItemIndex === lastIndex) {
        this.setState({focusedItemIndex: undefined});
      } else {
        this.setState({focusedItemIndex: focusedItemIndex + 1});
      }
    }
  }


  render() {

    const {hasFocus, focusedItemIndex} = this.state;
    const {placeholder, children, results, itemPropName} = this.props;
    const resultTemplateComponent = children as any;
    const showMenu = !!results.length && hasFocus;
    let resultComponents: any[] = [];

    if (resultTemplateComponent) {
      resultComponents = results.map(item => React.cloneElement(resultTemplateComponent, {
        [itemPropName || 'item']: item
      }));
    }

    return (
      <div className="form-autocomplete">
        <div className={classNames('form-autocomplete-input', 'form-input', {
          'is-focused': hasFocus
        })}>
          <input className="form-input"
                 type="text"
                 ref="searchInput"
                 onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
                 onKeyUp={e => this.handleKeyUp(e)}
                 onFocus={() => this.handleFocus(true)}
                 onBlur={() => this.handleFocus(false)}
                 onChange={e => this.handleInputChange(e)}
                 placeholder={placeholder}/>
        </div>
        <ul className={classNames('menu', showMenu ? 'show' : 'hide')}>
          {resultComponents.map((component, index) => (
            <li className="menu-item" key={index}>
              <a href="#"
                 onClick={e => this.handleSelectItem(index, e)}
                 className={classNames({
                   'is-focused': index === focusedItemIndex
                 })}>
                {component}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
