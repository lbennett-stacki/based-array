# based-array

A correct and based array implementation. 1-based indexing. obviously.

Inspired by [Why you're wrong about 0-based indexing](https://www.youtube.com/watch?v=0uQ3bkiW5SE) by [@tjdevries](https://github.com/tjdevries)

## Install

```bash
npm install --save based-array
yarn add based-array
pnpm add based-array
```

## Use

```typescript
import { BasedArray } from "based-array";

const funkyReduce = (arr: number[]) => {
  return arr.reduce((accum, item, index) => {
    return accum + item * index;
  }, 0);
};

let array = new BasedArray<number>(5).fill(1);
console.log(array[1]);
// 1
console.log(funkyReduce(array));
// 15

array = BasedArray.from([1, 2, 3, 4, 5]);
console.log(array[1]);
// 1
console.log(funkyReduce(array));
// 55
```

## Strict mode

```typescript
import { BasedArray } from "based-array";

let array = BasedArray.from([1, 2, 3, 4, 5]);
console.log(array[1]);
// 1
console.log(array[0]);
// undefined
// console.warn: you are counting from zero

BasedArray.strict();

array = BasedArray.from([1, 2, 3, 4, 5]);
console.log(array[1]);
// 1
console.log(array[0]);
// Throws error: CountingFromZeroError
```
