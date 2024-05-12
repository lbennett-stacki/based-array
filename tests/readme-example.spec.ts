import { describe, it, expect } from "vitest";
import { BasedArray } from "../src";

const funkyReduce = (arr: number[]) => {
  return arr.reduce((accum, item, index) => {
    return accum + item * index;
  }, 0);
};

const funkyReduceVanillaOffset = (arr: number[]) => {
  return arr.reduce((accum, item, index) => {
    return accum + item * (index + 1); // NOTE: plus one because vanilla
  }, 0);
};

describe("README example", () => {
  it("works with BasedArray", () => {
    let array = new BasedArray<number>(5).fill(1);
    let result = funkyReduce(array);

    expect(result).toBe(15);

    array = BasedArray.from([1, 2, 3, 4, 5]);
    result = funkyReduce(array);

    expect(result).toBe(55);
  });

  it("works with vanilla", () => {
    let array = new Array<number>(5).fill(1);
    let result = funkyReduce(array);

    expect(result).toBe(10);

    array = Array.from([1, 2, 3, 4, 5]);
    result = funkyReduce(array);

    expect(result).toBe(40);
  });

  it("works with vanilla and is the same as based if you do more work", () => {
    let array = new Array<number>(5).fill(1);
    let result = funkyReduceVanillaOffset(array);

    expect(result).toBe(15);

    array = Array.from([1, 2, 3, 4, 5]);
    result = funkyReduceVanillaOffset(array);

    expect(result).toBe(55);
  });
});
