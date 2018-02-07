// import * as React from 'react';
// import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import {FilterPaymentOptions, IFilterPaymentOptionsProps} from "./FilterSettlement";
// import {IFilterPaymentOption} from "../../interfaces/IFilterBudget";
// import {PaymentOption} from "../../../evses/components/PaymentOption/PaymentOption";
//
// describe('filters.components.FilterPaymentOptions', () => {
//
//   const props: IFilterPaymentOptionsProps = {
//     options: [{
//       id: 1,
//       option: "No Payment",
//       isExcluded: false
//     },
//       {
//         id: 2,
//         option: "Direct",
//         isExcluded: true
//       },
//       {
//         id: 3,
//         option: 'Contract',
//         isExcluded: false
//       },
//       {
//         id: 99,
//         option: 'Test',
//         isExcluded: false
//       }
//     ],
//     onChange: options => {}
//   };
//
//   it('should contain PaymentOptions Components', () => {
//     const wrapper = shallow(<FilterPaymentOptions {...props}/>);
//     expect(wrapper.hasClass("filter-payment-options")).to.be.true;
//     expect(wrapper.find("payment-option")).to.have.length(0);
//   });
//
//   it('should have active and inactive Filters in State', () => {
//     const wrapper = mount(<FilterPaymentOptions {...props}/>);
//     expect(wrapper.state('options')).to.have.length(4);
//   });
//
//   it('should toggle payment option filter activity (enable option)', () => {
//
//     const wrapper = mount(<FilterPaymentOptions {...props}/>);
//     const instance = wrapper.instance() as FilterPaymentOptions;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterPaymentOption = {
//       id: 1,
//       option: "Free publicly accessible",
//       isExcluded: false
//     };
//
//     instance.handleToggleFilter(data);
//     const newState = instance.state;
//
//     expect(entryState === newState).to.be.false;
//   });
//
//   it('should toggle filter method on click', () => {
//     const wrapper = mount(<FilterPaymentOptions {...props}/>);
//     const components = wrapper.find(PaymentOption).map(paymentOption => paymentOption);
//     const click = components[0].simulate('click');
//
//     expect(click).to.have.length(1);
//   });
//
// });
//
//
//
//
//
