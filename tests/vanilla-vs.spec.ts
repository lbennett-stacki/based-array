import { describe, it, expect } from "vitest";
import { BasedArray } from "../src";
import { State } from "../src/symbols";

type ArrayTest = (vanilla: Array<number>, based: BasedArray<number>) => void;

const NumberNotUsedWhenCounting = 0;

const length: ArrayTest = (vanilla, based) => {
  expect(based.length).toEqual(vanilla.length);
  expect(based[State]).toEqual(vanilla);
};

const pop: ArrayTest = (vanilla, based) => {
  const popVanilla = vanilla.pop();
  const popBased = based.pop();

  expect(popBased).toEqual(popVanilla);
  expect(based[State]).toEqual(vanilla);
};

const push: ArrayTest = (vanilla, based) => {
  const pushVanilla = vanilla.push(6);
  const pushBased = based.push(6);

  expect(pushBased).toEqual(pushVanilla);
  expect(based[State]).toEqual(vanilla);
};

const concat: ArrayTest = (vanilla, based) => {
  const concatVanilla = vanilla.concat([6, 7, 8]);
  const concatBased = based.concat([6, 7, 8]);

  expect(concatBased).toEqual(concatVanilla);
  expect(based[State]).toEqual(vanilla);
};

const join: ArrayTest = (vanilla, based) => {
  const joinVanilla = vanilla.join(",");
  const joinBased = based.join(",");

  expect(joinBased).toEqual(joinVanilla);
  expect(based[State]).toEqual(vanilla);
};

const reverse: ArrayTest = (vanilla, based) => {
  const reverseVanilla = vanilla.reverse();
  const reverseBased = based.reverse();

  expect(reverseBased).toEqual(reverseVanilla);
  expect(based[State]).toEqual(vanilla);
};

const shift: ArrayTest = (vanilla, based) => {
  const shiftVanilla = vanilla.shift();
  const shiftBased = based.shift();

  expect(shiftBased).toEqual(shiftVanilla);
  expect(based[State]).toEqual(vanilla);
};

const slice: ArrayTest = (vanilla, based) => {
  const sliceVanilla = vanilla.slice(0, 1);
  const sliceBased = based.slice(1, 2);

  expect(sliceBased).toEqual(sliceVanilla);
  expect(based[State]).toEqual(vanilla);
};

const splice: ArrayTest = (vanilla, based) => {
  const spliceVanilla = vanilla.splice(0, 1);
  const spliceBased = based.splice(1, 1);

  expect(spliceBased).toEqual(spliceVanilla);
  expect(based[State]).toEqual(vanilla);
};

const unshift: ArrayTest = (vanilla, based) => {
  const unshiftVanilla = vanilla.unshift(6);
  const unshiftBased = based.unshift(6);

  expect(unshiftBased).toEqual(unshiftVanilla);
  expect(based[State]).toEqual(vanilla);
};

const indexOf: ArrayTest = (vanilla, based) => {
  const indexOfVanilla = vanilla.indexOf(1);
  const indexOfBased = based.indexOf(1);

  expect(indexOfBased).toEqual(indexOfVanilla + 1);
  expect(based[State]).toEqual(vanilla);
};

const map: ArrayTest = (vanilla, based) => {
  const mapVanilla = vanilla.map((item, index) => {
    return item * item * (index + 1);
  });
  const mapBased = based.map((item, index) => {
    expect(index).not.toEqual(0);
    return item * item * index;
  });

  expect(mapBased).toEqual(mapVanilla);
  expect(based[State]).toEqual(vanilla);
};

const sort: ArrayTest = (vanilla, based) => {
  const sortVanilla = vanilla.sort((a, b) => a - b);
  const sortBased = based.sort((a, b) => a - b);

  expect(sortBased[State]).toEqual(sortVanilla);
  expect(based[State]).toEqual(vanilla);
};

const every: ArrayTest = (vanilla, based) => {
  const everyVanilla = vanilla.every((item, index) => {
    return item === index + 1;
  });
  const everyBased = based.every((item, index) => {
    expect(index).not.toEqual(0);
    return item === index;
  });

  expect(everyBased).toEqual(everyVanilla);
  expect(based[State]).toEqual(vanilla);
};

const some: ArrayTest = (vanilla, based) => {
  const someVanilla = vanilla.some((item, index) => {
    return item === index + 1;
  });
  const someBased = based.some((item, index) => {
    expect(index).not.toEqual(0);
    return item === index;
  });

  expect(someBased).toEqual(someVanilla);
  expect(based[State]).toEqual(vanilla);
};

const forEach: ArrayTest = (vanilla, based) => {
  const forEachVanilla = vanilla.forEach((item, index) => {
    expect(item).toEqual(index + 1);
  });
  const forEachBased = based.forEach((item, index) => {
    expect(item).toEqual(index);
  });

  expect(forEachBased).toEqual(forEachVanilla);
  expect(based[State]).toEqual(vanilla);
};

const filter: ArrayTest = (vanilla, based) => {
  const filterVanilla = vanilla.filter((item, index) => {
    return item === index + 1;
  });
  const filterBased = based.filter((item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return item === index;
  });

  expect(filterBased).toEqual(filterVanilla);
  expect(based[State]).toEqual(vanilla);
};

const reduce: ArrayTest = (vanilla, based) => {
  const reduceVanilla = vanilla.reduce((prev, item, index) => {
    return prev + item + (index + 1);
  }, 0);
  const reduceBased = based.reduce((prev, item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return prev + item + index;
  }, 0);

  expect(reduceBased).toEqual(reduceVanilla);
  expect(based[State]).toEqual(vanilla);
};

const reduceRight: ArrayTest = (vanilla, based) => {
  const reduceRightVanilla = vanilla.reduceRight((prev, item, index) => {
    return prev + item + (index + 1);
  }, 0);
  const reduceRightBased = based.reduceRight((prev, item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return prev + item + index;
  }, 0);

  expect(reduceRightBased).toEqual(reduceRightVanilla);
  expect(based[State]).toEqual(vanilla);
};

const find: ArrayTest = (vanilla, based) => {
  const findVanilla = vanilla.find((item, index) => {
    return item === index + 1;
  });
  const findBased = based.find((item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return item === index;
  });

  expect(findBased).toEqual(findVanilla);
  expect(based[State]).toEqual(vanilla);
};

const findIndex: ArrayTest = (vanilla, based) => {
  const findIndexVanilla = vanilla.findIndex((item) => {
    return item === 2;
  });
  const findIndexBased = based.findIndex((item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return item === 2;
  });

  expect(findIndexBased).toEqual(findIndexVanilla + 1);
  expect(based[State]).toEqual(vanilla);
};

const fill: ArrayTest = (vanilla, based) => {
  const fillVanilla = vanilla.fill(0, 0, 1);
  const fillBased = based.fill(0, 1, 2);

  expect(fillBased[State]).toEqual(fillVanilla);
  expect(based[State]).toEqual(vanilla);
};

const copyWithin: ArrayTest = (vanilla, based) => {
  const copyWithinVanilla = vanilla.copyWithin(0, 1, 2);
  const copyWithinBased = based.copyWithin(1, 2, 3);

  expect(copyWithinBased[State]).toEqual(copyWithinVanilla);
  expect(based[State]).toEqual(vanilla);
};

const includes: ArrayTest = (vanilla, based) => {
  const includesVanilla = vanilla.includes(2);
  const includesBased = based.includes(2);

  expect(includesBased).toEqual(includesVanilla);
  expect(based[State]).toEqual(vanilla);
};

const flatMap: ArrayTest = (vanilla, based) => {
  const flatMapVanilla = vanilla.flatMap((item, index) => {
    return [item, index + 1];
  });
  const flatMapBased = based.flatMap((item, index) => {
    expect(index).not.toEqual(NumberNotUsedWhenCounting);
    return [item, index];
  });

  expect(flatMapBased).toEqual(flatMapVanilla);
  expect(based[State]).toEqual(vanilla);
};

const flat: ArrayTest = (vanilla, based) => {
  const flatVanilla = vanilla.flat(1);
  const flatBased = based.flat(1);

  expect(flatBased).toEqual(flatVanilla);
  expect(based[State]).toEqual(vanilla);
};

const at: ArrayTest = (vanilla, based) => {
  const atVanilla = vanilla.at(0);
  const atBased = based.at(1);

  expect(atBased).toEqual(atVanilla);
  expect(based[State]).toEqual(vanilla);
};

const valueOf: ArrayTest = (vanilla, based) => {
  const valueOfVanilla = vanilla.valueOf();
  const valueOfBased = based.valueOf();

  expect(valueOfBased).toEqual(valueOfVanilla);
  expect(based[State]).toEqual(vanilla);
};

const toString: ArrayTest = (vanilla, based) => {
  const toStringVanilla = vanilla.toString();
  const toStringBased = based.toString();

  expect(toStringBased).toEqual(toStringVanilla);
  expect(based[State]).toEqual(vanilla);
};

const toLocaleString: ArrayTest = (vanilla, based) => {
  const toLocaleStringVanilla = vanilla.toLocaleString();
  const toLocaleStringBased = based.toLocaleString();

  expect(toLocaleStringBased).toEqual(toLocaleStringVanilla);
  expect(based[State]).toEqual(vanilla);
};

const tests = {
  length,
  pop,
  push,
  concat,
  join,
  reverse,
  shift,
  slice,
  splice,
  unshift,
  indexOf,
  map,
  sort,
  every,
  some,
  forEach,
  filter,
  reduce,
  reduceRight,
  find,
  findIndex,
  fill,
  copyWithin,
  includes,
  flatMap,
  flat,
  at,
  valueOf,
  toString,
  toLocaleString,
};

describe("BasedArray", () => {
  for (const [name, test] of Object.entries(tests)) {
    it(`.${name} makes the same or more sense than vanilla`, () => {
      const base = [1, 2, 3, 4, 5];
      const vanilla = Array.from(base);
      const based = BasedArray.from(base);

      test(vanilla, based);
    });
  }
});
