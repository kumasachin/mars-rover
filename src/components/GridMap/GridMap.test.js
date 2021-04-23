import { render, screen, cleanup } from '@testing-library/react';
import GridMap from './';

describe("Robots", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridMap />)
    expect(asFragment(<GridMap />)).toMatchSnapshot()
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridMap />)
    expect(asFragment(<GridMap />)).toMatchSnapshot()
  });
});