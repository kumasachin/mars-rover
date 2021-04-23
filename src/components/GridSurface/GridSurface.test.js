import { render, screen, cleanup } from '@testing-library/react';
import GridSurface from './';

describe("Robots", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridSurface />)
    expect(asFragment(<GridSurface />)).toMatchSnapshot()
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<GridSurface />)
    expect(asFragment(<GridSurface />)).toMatchSnapshot()
  });
});