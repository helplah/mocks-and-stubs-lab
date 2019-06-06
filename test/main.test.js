const paymentService = require("../src/paymentService");

// Line 6-7 doesn't work because jest.fn() mocks the object and changes the reference to generateQueue
// it only works if you do `module = jest.fn()` which mocks a module of the function, instead of the whole function
/* 
let generateQueue = require("../src/queueService");
generateQueue = jest.fn(); */

jest.mock("../src/queueService");
const generateQueue = require("../src/queueService");

paymentService.makePayment = jest.fn();
paymentService.refundPayment = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

// Order matters too. The function you want to test must have all its dependencies mocked before you import the function over.
const processPayments = require("../src/main");

describe("processPayments using jest.fn()", () => {
  test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
    generateQueue.mockImplementation(() => []);
    processPayments();
    expect(paymentService.makePayment).toHaveBeenCalledTimes(0);
    expect(paymentService.refundPayment).toHaveBeenCalledTimes(0);
  });

  test("calls makePayment when next item in paymentQueue is positive", () => {
    generateQueue.mockImplementation(() => [1, 1]);
    processPayments();
    expect(paymentService.makePayment).toHaveBeenCalledTimes(2);
    expect(paymentService.refundPayment).toHaveBeenCalledTimes(0);
  });

  test("calls refundPayment when next item in paymentQueue is negative", () => {
    generateQueue.mockImplementation(() => [-1, -1]);
    processPayments();
    expect(paymentService.makePayment).toHaveBeenCalledTimes(0);
    expect(paymentService.refundPayment).toHaveBeenCalledTimes(2);
  });
});
