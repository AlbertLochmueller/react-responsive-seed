// import * as React from 'react';
// import {mount} from 'enzyme';
// import {expect} from 'chai';
// import {FilterDetails, IFilterDetailsProps} from "./FilterDetails";
// import {FilterPlugs} from "../FilterPlugs/FilterPlugs";
// import {FilterAuthentication} from "../FilterAuthentication/FilterAuthentication";
// import {FilterStatus} from "../FilterStatus/FilterStatus";
// import {FilterChargingPower} from "../FilterChargingPower/FilterCampaignType";
// import {FilterPaymentOptions} from "../FilterPaymentOptions/FilterPaymentOptions";
// import {FilterAccessibility} from "../FilterAccessibility/FilterAccessibility";
// import {getMockFilter} from "../../../utils/mock";
// import {Status} from "../../../evses/components/Status/Status";
// import {Plug} from "../../../evses/components/Plug/Plug";
// import {PaymentOption} from "../../../evses/components/PaymentOption/PaymentOption";
// import {Authentication} from "../../../evses/components/Authentication/Authentication";
// import {Accessibility} from "../../../evses/components/Accessibility/Accessibility";
//
// describe('filters.components.FilterDetails', () => {
//
//   const singleFilter: IFilterDetailsProps = {
//     filter: {
//       plugs: [{
//         id: 7,
//         option: "Type F Schuko",
//         isExcluded: false
//       },
//         {
//           id: 18,
//           option: "CHAdeMO",
//           isExcluded: true
//         }]
//     },
//     onChange: options => {
//     }
//   };
//
//   const fullFilter: IFilterDetailsProps = {
//     filter: getMockFilter(),
//     onChange: options => {}
//   };
//
//
//   it('should only include a plug component due to filter choice', () => {
//     const wrapper = mount(<FilterDetails {...singleFilter}/>);
//     expect(wrapper.find(FilterPlugs)).to.have.length(1);
//     expect(wrapper.find(FilterAuthentication)).to.have.length(0);
//   });
//
//   it('should execute onChange on plug component click', () => {
//     const wrapper = mount(<FilterDetails {...singleFilter}/>);
//     const click = wrapper.find(FilterPlugs).simulate('click');
//     expect(click).to.have.length(1);
//   });
//
//   it('should render complete filter choice', () => {
//     const wrapper = mount(<FilterDetails {...fullFilter}/>);
//     const filterStatus = wrapper.find(FilterStatus);
//     const filterPlugs = wrapper.find(FilterPlugs);
//     const filterChargingPower = wrapper.find(FilterChargingPower);
//     const filterPaymentOptions = wrapper.find(FilterPaymentOptions);
//     const filterAuthentication = wrapper.find(FilterAuthentication);
//     const filterAccessibility = wrapper.find(FilterAccessibility);
//
//
//     expect(filterStatus).to.have.length(1);
//     expect(filterStatus.find(Status).map(status => status)[0].simulate('click')).to.have.length(1);
//
//     expect(filterPlugs).to.have.length(1);
//     expect(filterPlugs.find(Plug).map(plug => plug)[0].simulate('click')).to.have.length(1);
//
//     expect(filterChargingPower).to.have.length(1);
//
//     expect(filterPaymentOptions).to.have.length(1);
//     expect(filterPaymentOptions.find(PaymentOption).map(paymentOption => paymentOption)[0].simulate('click')).to.have.length(1);
//
//     expect(filterAuthentication).to.have.length(1);
//     expect(filterAuthentication.find(Authentication).map(authentication => authentication)[0].simulate('click')).to.have.length(1);
//
//     expect(filterAccessibility).to.have.length(1);
//     expect(filterAccessibility.find(Accessibility).map(accessibility => accessibility)[0].simulate('click')).to.have.length(1);
//   });
//
// });
//
//
//
//
//
