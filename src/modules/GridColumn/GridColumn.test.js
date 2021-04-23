import { render, screen, cleanup } from '@testing-library/react';
import GridColumn from './GridColumn';

describe("Robots", () => {
  afterEach(cleanup);
  const props = {
    dimension: {x: 2, y:2}, 
    lostCell:{}, 
    rowIndex:"1", 
    robotDetail:[]
  }

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridColumn />)
    expect(asFragment(<GridColumn {...props} />)).toMatchSnapshot()
  });
});