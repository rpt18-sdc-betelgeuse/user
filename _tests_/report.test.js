import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Report from '../client/src/components/Report.jsx';

Enzyme.configure({ adapter: new Adapter() });


describe('Report Component Tests', () => {
  it('confirm Report component renders', () => {
    const wrapper = shallow(<Report />);
    const text = wrapper.find('.report_text');
    expect(text.text()).toBe('Report');
  });
});

