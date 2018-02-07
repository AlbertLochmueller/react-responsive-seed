import * as React from 'react';
import {Component} from 'react';
import {Ad} from '../../../../../interfaces/Ad';
import {AdElement} from '../AdElement/AdElement';
import {getDefaultAd} from '../AdsStep';

export interface AdGroupProps {
    adsValues: Ad[];
    checkFields: boolean;

    onChange(ads: Ad[], adsHasErrors: boolean);
}

export interface AdGroupState {
    ads: Ad[];
    fieldsAreValid: boolean[];
}

function checkFieldValidity(fields: boolean[]) {
    const result = fields.reduce((acc, val) => {
        return (acc && val);
    });

    if (result) {
        return true;
    }
    return false;
}

export class AdGroup extends Component<AdGroupProps, AdGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            ads: [getDefaultAd()],
            fieldsAreValid: [false],
        }
    }

    componentDidMount() {
        const {onChange} = this.props;
        const {ads, fieldsAreValid} = this.state;
        onChange(ads, checkFieldValidity(fieldsAreValid));
    }

    componentWillReceiveProps(nextProps: AdGroupProps) {
        const {adsValues} = this.props;
        let {ads, fieldsAreValid} = this.state;

        // console.log('ads length:', ads.length);


        if (nextProps.adsValues.length > ads.length) {
            fieldsAreValid = fieldsAreValid.concat([false]);

            return this.setState({
                ads: nextProps.adsValues,
                fieldsAreValid: fieldsAreValid
            }, () => {
                const {onChange} = this.props;
                onChange(nextProps.adsValues, checkFieldValidity(fieldsAreValid));
            })
        }

        return this.setState({
            ads: adsValues,
            fieldsAreValid: fieldsAreValid
        }, () => this.forceUpdate())
    }

    handleInputChange(ad, fieldsValid, index) {

        const {ads, fieldsAreValid} = this.state;
        const newAds = ads && ads.map((subAd, subIndex) => {
            if (index == subIndex) {
                fieldsAreValid[index] = fieldsValid;
                return ad
            }
            return subAd;
        });

        this.setState({
            ads: newAds
        }, () => this.checkState());
    }

    checkState() {
        const {ads, fieldsAreValid} = this.state;
        const {onChange} = this.props;

        onChange(ads, checkFieldValidity(fieldsAreValid));
    }

    handleRemove(index) {
        const {ads, fieldsAreValid} = this.state;
        let newAds = [getDefaultAd()];
        let newValidity = [false];

        const calculatedAds: Ad[] = ads.filter((value, subIndex) => {
            if (index !== subIndex) {
                return value;
            }
        });

        const calculatedValidity: boolean[] = fieldsAreValid.filter((value, subIndex) => {
            if (index !== subIndex) {
                return value;
            }
        });

        if (calculatedAds !== undefined && calculatedAds.length > 0) {
            newAds = calculatedAds;
        }
        if (calculatedValidity !== undefined && calculatedValidity.length > 0) {
            newValidity = calculatedValidity;
        }

        this.setState({
            ads: newAds,
            fieldsAreValid: newValidity
        }, () => this.checkState())
    }

    render() {
        const {checkFields} = this.props;
        const {ads} = this.state;

        return (
            <div>
                {ads && ads.map((value, index) => {
                    return (
                        <AdElement checkFields={checkFields}
                                   key={index}
                                   ad={value}
                                   onChange={(ad, fieldsValid) => this.handleInputChange(ad, fieldsValid, index)}
                                   onRemove={() => this.handleRemove(index)}
                        />
                    )
                })}
            </div>
        );
    }
}