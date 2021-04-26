import { render, cleanup } from '@testing-library/react';
import GridColumn from './GridColumn';
import React from 'react';
import Enzyme, {  mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe("", () => {
  afterEach(cleanup);
  const props = {
    "dimension":{"x":16,"y":16},"lostCell":{"x":[],"y":[]},"isLostRow":"","rowIndex":15,"robotDetail":[]
  }

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridColumn />)
    expect(asFragment(<GridColumn {...props} />)).toMatchSnapshot()
  });
});



describe('<Grid /> should pre loading sceent', () => {

  const props = {
    "dimension":{"x":16,"y":16},"lostCell":{"x":[],"y":[]},"isLostRow":"","rowIndex":15,"robotDetail":[]
  }

  it('should have the columns', async () => {
    const container01 = mount(<GridColumn 
      {...props}
      
    />);
      expect(
        container01.find("td.grid-column").length
      ).toEqual(16)
  });
});