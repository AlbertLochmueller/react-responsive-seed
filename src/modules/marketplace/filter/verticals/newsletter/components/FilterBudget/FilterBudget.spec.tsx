// import * as React from 'react';
// import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import {FilterStatus, IFilterStatusProps} from "./FilterBudget";
// import {EVSEStatus} from "../../../evses/enums/EVSEStatus";
// import {IFilterEVSEStatus} from "../../interfaces/IFilterAge";
// import {Status} from "../../../evses/components/Status/Status";
//
// describe('filters.components.FilterStatus', () => {
//
//   const props: IFilterStatusProps = {
//     options: [{
//       id: 4,
//       option: EVSEStatus.OutOfService,
//       isExcluded: false
//     },
//       {
//         id: 1,
//         option: EVSEStatus.Available,
//         isExcluded: true
//       }],
//     onChange: options => {}
//   };
//
//   it('should contain Status Components', () => {
//     const wrapper = shallow(<FilterStatus {...props}/>);
//     expect(wrapper.hasClass("filter-status")).to.be.true;
//     expect(wrapper.find("status")).to.have.length(0);
//   });
//
//   it('should have active and inactive Filters in State', () => {
//     const wrapper = mount(<FilterStatus {...props}/>);
//     expect(wrapper.state('options')).to.have.length(2);
//   });
//
//   it('should toggle status filter activity (disable option)', () => {
//
//     const wrapper = mount(<FilterStatus {...props}/>);
//     const instance = wrapper.instance() as FilterStatus;
//     const entryState = wrapper.state('options');
//
//     const testacc: IFilterEVSEStatus = {
//       id: 1,
//       option: EVSEStatus.Available,
//       isExcluded: true
//     };
//
//     instance.handleToggleFilter(testacc);
//     const newState = instance.state;
//
//     expect(entryState === newState).to.be.false;
//   });
//
//   it('should toggle filter method on click', () => {
//     const wrapper = mount(<FilterStatus {...props}/>);
//     const entryOnChangeState = wrapper.state();
//     const instance = wrapper.instance() as FilterStatus;
//     const components = wrapper.find(Status).map(status => status);
//     const click = components[0].simulate('click');
//
//     const newState = instance.state;
//
//
//     expect(entryOnChangeState === newState).to.be.false;
//     expect(click).to.have.length(1);
//   });
//
// });
//
//
//
//
//
