import { render, screen, cleanup } from '@testing-library/react';
import GridRow from './GridRow';

describe("Robots", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridRow />)
    expect(asFragment(<GridRow />)).toMatchSnapshot()
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridRow />)
    expect(asFragment(<GridRow />)).toMatchSnapshot()
  });
});