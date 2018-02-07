// import * as React from 'react';
// import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import {FilterAuthentication, IFilterAuthenticationProps} from "./FilterSector";
// import {IFilterAuthenticationMode} from "../../interfaces/IFilterSettlement";
// import {Authentication} from "../../../evses/components/Authentication/Authentication";
//
// describe('filters.components.FilterAuthentication', () => {
//
//   const props: IFilterAuthenticationProps = {
//     options: [{
//       id: 5,
//       option: "Direct Payment",
//       isExcluded: false
//     },
//       {
//         id: 1,
//         option: "NFC RFID Classic",
//         isExcluded: true
//       },
//       {
//         id: 4,
//         option: "REMOTE",
//         isExcluded: false
//       },
//       {
//         id: 99,
//         option: "Test",
//         isExcluded: true
//       }
//     ],
//     onChange: options => {}
//   };
//
//   it('should contain Authentication Components', () => {
//     const wrapper = shallow(<FilterAuthentication {...props}/>);
//     expect(wrapper.hasClass("filter-authentication")).to.be.true;
//     expect(wrapper.find("authentication")).to.have.length(0);
//   });
//
//   it('should have active and inactive Filters in State', () => {
//     const wrapper = mount(<FilterAuthentication {...props}/>);
//     expect(wrapper.state('options')).to.have.length(4);
//   });
//
//   it('should toggle authentication filter activity (enable option)', () => {
//
//     const wrapper = mount(<FilterAuthentication {...props}/>);
//     const instance = wrapper.instance() as FilterAuthentication;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterAuthenticationMode = {
//       id: 5,
//       option: "Direct Payment",
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
//     const wrapper = mount(<FilterAuthentication {...props}/>);
//     const components = wrapper.find(Authentication).map(authentication => authentication);
//     const click = components[0].simulate('click');
//
//     expect(click).to.have.length(1);
//   });
// });
//
//
//
//
//
