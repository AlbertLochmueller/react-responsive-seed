// import * as React from 'react';
// import {mount} from 'enzyme';
// import {expect} from 'chai';
// import {FilterChargingPower, IFilterChargingPowerProps} from "./FilterCampaignType";
//
// describe('filters.components.FilterChargingPower', () => {
//
//   const props: IFilterChargingPowerProps = {
//     options: [{
//       id: 1,
//       option: "testfacility1",
//       power: "22.0",
//       isExcluded: false
//     },
//       {
//         id: 2,
//         option: "testfacility2",
//         power: "7.3",
//         isExcluded: false
//       },
//       {
//         id: 4,
//         option: "testfacility4",
//         power: "47.1",
//         isExcluded: false
//       },
//       {
//         id: 3,
//         option: "testfacility3",
//         power: "1.8",
//         isExcluded: false
//       }
//     ],
//     onChange: options => {}
//   };
//
//   it('should have power levels and therefore contain Range Slider component', () => {
//     const wrapper = mount(<FilterChargingPower {...props}/>);
//     const state = wrapper.state('marks');
//     const hasMarks = !!Object.keys(state).length;
//
//     expect(hasMarks).to.equal(true);
//     expect(wrapper.find(<div/>)).to.have.length(0);
//   });
//
//   it('should have Filters in State', () => {
//     const wrapper = mount(<FilterChargingPower {...props}/>);
//     expect(wrapper.state('options')).to.have.length(4);
//   });
//
//   it('should exclude power levels due to slider range adjustment', () => {
//
//     const wrapper = mount(<FilterChargingPower {...props}/>);
//     const instance = wrapper.instance() as FilterChargingPower;
//     const entryState = wrapper.state('options');
//
//     const data = [7, 25];
//
//     instance.handleToggleFilter(data);
//     const newState = instance.state;
//
//     expect(entryState === newState).to.be.false;
//   });
//
// });
//
//
//
//
//
