// import * as React from 'react';
// import {mount} from 'enzyme';
// import {expect} from 'chai';
// import {RawFilterDetailsContainer} from "./FilterContainer";
// import {IFilter} from "../interfaces/IFilter";
// import {getMockFilter, getRouteComponentPropsMock} from "../../utils/mock";
//
// describe('filters.containers.FilterDetailsContainer', () => {
//
//   const filter: IFilter = getMockFilter();
//   const props = {
//     ...getRouteComponentPropsMock({filter}),
//     getStatus() {return Promise.resolve({data: filter.status}); },
//     getAuthenticationModes() {return Promise.resolve({data: filter.authenticationModes}); },
//     getPlugs() {return Promise.resolve({data: filter.plugs}); },
//     getChargingFacilities() {return Promise.resolve({data: filter.chargingFacilities}); },
//     getAccessibilities() {return Promise.resolve({data: filter.accessibility}); },
//     getPaymentOptions() {return Promise.resolve({data: filter.paymentOptions}); }
//   };
//   /*  const props: FilterDetailsContainerProps = getMockFilterRouteComponentProps(filter);*/
//
//   it('should return FilterDetails component', () => {
//
//     const wrapper = mount(<RawFilterDetailsContainer {...props}/>);
//     const entryState = wrapper.state('filter');
//     global['_jsdom'].reconfigure({url: 'http://www.google.de?exclude.status[]=1'});
//
//     const instance = wrapper.instance() as RawFilterDetailsContainer;
//     instance['applyPresetFilters']();
//     wrapper.update();
//     const newState = wrapper.state('filter');
//
//     expect(entryState !== newState).to.be.true;
//   });
//
//
//   describe('loadFilters()', () => {
//
//     it('should load preset filters', () => {
//       const wrapper = mount(<RawFilterDetailsContainer {...props}/>);
//       const instance = wrapper.instance() as RawFilterDetailsContainer;
//       const entryState = wrapper.state('filter');
//
//       return instance.loadFilters()
//         .then(() => {
//           wrapper.update();
//           const newState = wrapper.state('filter');
//           expect(entryState !== newState).to.be.true;
//         });
//     });
//
//   })
//   ;
// })
// ;
//
//
//
//
//
