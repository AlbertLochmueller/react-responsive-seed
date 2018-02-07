// import * as React from 'react';
// import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import {FilterAccessibility, IFilterAccessibilityProps} from "./FilterName";
// import {IFilterAccessibility} from "../../interfaces/IFilterCampaignType";
// import {Accessibility} from "../../../evses/components/Accessibility/Accessibility";
//
// describe('filters.components.FilterAccessibility', () => {
//
//   const props: IFilterAccessibilityProps = {
//     options: [{
//       id: 1,
//       option: "Free publicly accessible",
//       isExcluded: false
//     },
//       {
//         id: 2,
//         option: "Restricted access",
//         isExcluded: true
//       },
//       {
//         id: 99,
//         option: "Unspecified",
//         isExcluded: true
//       }
//     ],
//     onChange: options => {}
//   };
//
//   it('should contain Accessibility Components', () => {
//     const wrapper = shallow(<FilterAccessibility {...props}/>);
//     expect(wrapper.hasClass("filter-accessibility")).to.be.true;
//     expect(wrapper.find("accessibility")).to.have.length(0);
//   });
//
//   it('should have active and inactive Filters in State', () => {
//     const wrapper = mount(<FilterAccessibility {...props}/>);
//     expect(wrapper.state('options')).to.have.length(3);
//   });
//
//   it('should toggle accessibility filter activity (enable option)', () => {
//
//     const wrapper = mount(<FilterAccessibility {...props}/>);
//     const instance = wrapper.instance() as FilterAccessibility;
//     const entryState = wrapper.state('options');
//
//     const data: IFilterAccessibility = {
//       id: 1,
//       option: "Free publicly accessible",
//       isExcluded: false
//     };
//
//     instance.handleToggleFilter(data);
//     const newState = instance.state;
//     expect(entryState === newState).to.be.false;
//   });
//
//   it('should toggle filter method on click', () => {
//     const wrapper = mount(<FilterAccessibility {...props}/>);
//     const components = wrapper.find(Accessibility).map(accessibility => accessibility);
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
