import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Planet from './Planet';
import {useFetch} from "../../hooks/use-fetch";

Enzyme.configure({ adapter: new Adapter() })


const data = {
  response: {
    "map": {
      "x": 1611,
      "y": 16
    },
    "lostCell": {
      "x": [

      ],
      "y": [

      ]
    },
    "robots": [
      {
        "name": "Chintu1",
        "color": "green",
        "currentPosition": "0 0 N",
        "x": 0,
        "y": 1,
        "d": "N",
        "instructions": "FFFFFFFFFFFFFFFFFFF"
      },
      {
        "name": "Chintu2",
        "color": "green",
        "currentPosition": "0 14 N",
        "x": 0,
        "y": 1,
        "d": "N",
        "instructions": "FRFFFFFFF"
      }
    ]
  }
};

jest.mock('../../hooks/use-fetch', () => ({
  useFetch: () => (data)
}));
describe("Planet Grid rendering", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Planet />)
    expect(asFragment(<Planet />)).toMatchSnapshot()
  });
});

describe('<Planet /> should pre loading sceent', () => {

  it('should have the button to start robot movement', () => {
    const container = mount(<Planet name="mars" />);

    expect(
      container.html()
    ).toBe("<div>Loading...</div>");
  });

  it('should have the button to start robot movement', async () => {
    const container01 = mount(<Planet name="mars" data={data.response.robots} />);
      expect(
        container01.find("button.init")
      ).toBeDefined()
  });

  it('should have render the robots', async () => {
    const container01 = mount(<Planet name="mars" data={data.response.robots} />);
    container01.find("button.init").simulate("click");
    expect(
        container01.find(".robot").length
      ).toBe(2);
  });

  it('should change ui on click on buttoon', async () => {
    const container01 = mount(<Planet name="mars" data={data.response.robots} />);
    const preClickHtml = container01.html();
    container01.find("button.init").simulate("click");
    expect(container01.html()).toEqual(preClickHtml)
  });
});