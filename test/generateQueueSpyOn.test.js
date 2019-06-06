const math = require("mathjs");
const generateQueue = require("../src/queueService");

const randomInt = jest.spyOn(math, "randomInt");

describe("generateQueue using jest.spyOn()", () => {
  it("should return an array with length of between 1-9 inclusive with positive value", () => {
    // jest.fn() is the same as jest.fn().mockImplementation()
    randomInt.mockImplementation(() => 5);
    expect(generateQueue()).toEqual([5, 5, 5, 5, 5]);
  });

  it("should return an array with length of between 1-9 with negative value", () => {
    randomInt.mockImplementationOnce(() => 5).mockImplementation(() => -4);
    expect(generateQueue()).toEqual([-4, -4, -4, -4, -4]);
  });
});
