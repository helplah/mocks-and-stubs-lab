const math = require("mathjs");
const generateQueue = require("../src/queueService");

jest.mock("mathjs");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("generateQueue using jest.mock()", () => {
  it("should return an array with length of between 1-9 inclusive with positive value", () => {
    // jest.fn() is the same as jest.fn().mockImplementation()
    math.randomInt = jest.fn(() => 5);
    expect(generateQueue()).toEqual([5, 5, 5, 5, 5]);
  });

  it("should return an array with length of between 1-9 with negative value", () => {
    math.randomInt = jest
      .fn()
      .mockImplementationOnce(() => 5)
      .mockImplementation(() => -4);
    expect(generateQueue()).toEqual([-4, -4, -4, -4, -4]);
  });
});
