# based-array

A correct and based array implementation. 1-based indexing. obviously.

```bash
npm install --save based-array
yarn add based-array
pnpm add based-array
```

```typescript
import { BasedArray } from "based-array";

const funkyReduce = (arr: number[]) => {
  return array.reduce((accum, item, index) => {
    return accum + item * index;
  }, 0);
};

let array = new BasedArray(5).fill(1);
console.log(funkyReduce(array));
// 15

array = BasedArray.from([1, 2, 3, 4, 5]);
console.log(funkyReduce(array));
// 55
```
