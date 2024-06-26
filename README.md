![basedArray 1](https://github.com/lbennett-stacki/based-array/assets/5678671/fe40340b-1934-4a29-ad57-8f81d6c73680)

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

## Testing

Every based array method is tested against its vanilla counterpart
in a thrilling batte over in [tests/vanilla-vs.spec](./tests/vanilla-vs.spec.ts).

The example above is tested in [tests/readme-example.spec](./tests/readme-example.spec.ts).

### Performance

You can run a simple performance test.

```bash
➜  based-array git:(main) ✗ npm run perf

Starting performance test with 10,000 items.

Vanilla: 0.809ms
Based: 0.657ms
Vanilla: 0.524ms
Based: 0.548ms

Finished performance test.
```

_No but honestly you shouldn't trust these perf test results, it makes no sense for it to be anything but slower than vanilla Array, maybe will get better tests to demonstrate when I'm bored again._
