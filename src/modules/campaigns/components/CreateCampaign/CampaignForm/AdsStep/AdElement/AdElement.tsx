import * as React from 'react';
import {style} from 'typestyle';
import {theme} from '../../../../../../../components/App/ui-theme';
import {NumberInput} from '../../../../../../layout/components/Input/NumberInput/NumberInput';
import {MenuSelect} from '../../../../../../layout/components/MenuSelect/MenuSelect';
import {AdType} from '../../../../../enums/AdType';
import {BillingType} from '../../../../../../marketplace/filter/verticals/shared/enums/BillingType';
import Button from 'material-ui/Button';
import RemoveIcon from 'material-ui-icons/Remove';
import {Ad} from '../../../../../interfaces/Ad';
import {Component} from 'react';

export interface AdElementProps {
    ad: Ad;
    checkFields: boolean;

    onChange(ad: Ad, fieldsValid: boolean);

    onRemove();
}

export interface AdElementState {
    adTypeHasErrors: boolean;
    billingTypeHasErrors: boolean;
    priceHasErrors: boolean;
}

const adElementClasses = {
    adElement: style({
        width: '100%' as any,
    }),
    row: style({
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary,
        marginBottom: 24,
    }),
    higherWidth: style({
        width: '30%' as any,
    }),
    lesserWidth: style({
        width: '20%' as any,
    }),
    actionWidth: style({
        width: '10%' as any,
        height: 'inherit' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'flex-end' as any,
    })
};

function validate(field: string, value: any) {
    switch (field) {
        case 'adType': {
            return (!!value);
        }
        case 'billingType': {
            return (!!value);
        }
        case 'price': {
            return (value >= 1);
        }
    }
    return true;
}

export class AdElement extends Component<AdElementProps, AdElementState> {

    constructor(props) {
        super(props);

        const {ad} = this.props;

        this.state = {
            adTypeHasErrors: !validate('adType', ad.adType),
            billingTypeHasErrors: !validate('billingType', ad.billingType),
            priceHasErrors: !validate('price', ad.price),
        };
    }

    checkValues(replaceField: string, replaceFieldOk: boolean) {

        const {ad} = this.props;

        const adTypeOk = (replaceField === 'adType') ? replaceFieldOk : validate('adType', ad.adType);
        const billingTypeOk = (replaceField === 'billingType') ? replaceFieldOk : validate('billingType', ad.billingType);
        const priceOk = (replaceField === 'price') ? replaceFieldOk : validate('price', ad.price);

        this.setState({
            adTypeHasErrors: !adTypeOk,
            priceHasErrors: !priceOk,
            billingTypeHasErrors: !billingTypeOk,
        });

        return (adTypeOk && billingTypeOk && priceOk);
    }

    handleInputChange(event) {
        const {onChange, ad} = this.props;
        const target = event.target;
        const name = target.name;

        const valueOk = validate(name, target.value);
        const newAd = {...ad, [name]: target.value};

        onChange(newAd, (this.checkValues(name, valueOk) && valueOk));
    }

    removeElement() {
        const {onRemove} = this.props;
        onRemove();
    }

    render() {
        const {ad, checkFields} = this.props;
        const {priceHasErrors, billingTypeHasErrors, adTypeHasErrors} = this.state;

        return (
            <div className={adElementClasses.row}>
                <div className={adElementClasses.higherWidth}>
                    <MenuSelect hasError={checkFields ? adTypeHasErrors : false}
                                name={'adType'}
                                id={'select-ad-type'}
                                value={ad.adType}
                                label={'Anzeigentyp'}
                                options={AdType}
                                onChange={(event) => this.handleInputChange(event)}/>
                </div>
                <div className={adElementClasses.lesserWidth}>
                    <MenuSelect hasError={checkFields ? billingTypeHasErrors : false}
                                name={'billingType'}
                                id={'select-billing-type'}
                                value={ad.billingType}
                                label={'Abrechnung'}
                                options={BillingType}
                                onChange={(event) => this.handleInputChange(event)}/>
                </div>
                <div className={adElementClasses.higherWidth}>
                    <NumberInput hasError={checkFields ? priceHasErrors : false}
                                 name={'price'}
                                 label={'Preis'}
                                 value={ad.price}
                                 min={0}
                                 unit={'€'}
                                 onChange={(event) => this.handleInputChange(event)}/>
                </div>
                <div className={adElementClasses.actionWidth}>
                    <Button fab mini
                            color="contrast"
                            aria-label="delete"
                            style={{marginRight: 5}}
                            onClick={() => this.removeElement()}>
                        <RemoveIcon/>
                    </Button>
                </div>
            </div>
        );
    }

}