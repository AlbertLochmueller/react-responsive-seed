// import * as React from 'react';
// import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import {FilterPlugs, IFilterPlugsProps} from "./FilterSex";
// import {IFilterPlug} from "../../interfaces/IFilterSector";
// import {Plug} from "../../../evses/components/Plug/Plug";
//
// describe('filters.components.FilterPlugs', () => {
//
//   const props: IFilterPlugsProps = {
//     options: [{
//       id: 7,
//       option: "Type F Schuko",
//       category: "Other",
//       isExcluded: false
//     },
//       {
//         id: 18,
//         option: "CHAdeMO",
//         isExcluded: true
//       },
//       {
//         id: 11,
//         option: 'Type 2 Outlet',
//         isExcluded: false
//       }, {
//         id: 13,
//         option: 'Type 3 Outlet',
//         isExcluded: false
//       }, {
//         id: 3,
//         option: 'AVCON Connector',
//         isExcluded: false
//       }, {
//         id: 99,
//         option: 'Test',
//         isExcluded: false
//       },
//       {
//         id: 15,
//         option: 'IEC 60309 Three Phase',
//         isExcluded: false
//       }, {
//         id: 10,
//         option: 'Type 1 Connector (Cable Attached)',
//         isExcluded: false
//       }, {
//         id: 17,
//         option: 'CCS Combo 1 Plug (Cable Attached)',
//         isExcluded: false
//       }
//
//     ],
//     onChange: options => {
//     }
//   };
//
//   it('should contain Plugs Components', () => {
//     const wrapper = shallow(<FilterPlugs {...props}/>);
//     expect(wrapper.hasClass("filter-plugs")).to.be.true;
//     expect(wrapper.find("plug")).to.have.length(0);
//   });
//
//   it('should have active and inactive Filters in State', () => {
//     const wrapper = mount(<FilterPlugs {...props}/>);
//     expect(wrapper.state('options')).to.have.length(9);
//   });
//
//   it('should toggle plug filter activity (regular category)', () => {
//
//     const wrapper = mount(<FilterPlugs {...props}/>);
//     const instance = wrapper.instance() as FilterPlugs;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterPlug = {
//       id: 18,
//       option: "CHAdeMO",
//       isExcluded: true
//     };
//
//     instance.handleToggleFilter(data);
//     const newState = instance.state;
//
//     expect(entryState === newState).to.be.false;
//   });
//
//   it('should toggle plug filter activity (regular category)', () => {
//
//     const wrapper = mount(<FilterPlugs {...props}/>);
//     const instance = wrapper.instance() as FilterPlugs;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterPlug = {
//       id: 18,
//       option: "CHAdeMO",
//       category: "CCS_CHAdeMO",
//       isExcluded: true
//     };
//
//     instance.handleToggleFilter(data);
//     const newState = instance.state;
//
//     expect(entryState === newState).to.be.false;
//   });
//
//   it('should toggle plug filter activity (other category)', () => {
//
//     const wrapper = mount(<FilterPlugs {...props}/>);
//     const instance = wrapper.instance() as FilterPlugs;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterPlug = {
//       id: 7,
//       option: "Type F Schuko",
//       category: "Other",
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
//     const wrapper = mount(<FilterPlugs {...props}/>);
//     const components = wrapper.find(Plug).map(plug => plug);
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
