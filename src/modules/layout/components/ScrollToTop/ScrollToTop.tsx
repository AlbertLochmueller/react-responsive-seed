import * as React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router';

interface ScrollToTopProps {
    location: any;
}

export class ScrollToTop extends Component<ScrollToTopProps> {
    componentDidUpdate(prevProps) {
            window.scrollTo(0, 0)
    }

    render() {
        return this.props.children
    }
}