import { render, screen, cleanup } from '@testing-library/react';
import GridColumn from '.';

describe("Robots", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridColumn />)
    expect(asFragment(<GridColumn />)).toMatchSnapshot()
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridColumn />)
    expect(asFragment(<GridColumn />)).toMatchSnapshot()
  });
});