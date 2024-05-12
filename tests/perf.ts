import { BasedArray } from "../src";

const arraySize = 10_000;
const baseArray = Array(arraySize)
  .fill(0)
  .map((_, i) => i);

function warmUp(array: number[]) {
  for (const index of array.keys()) {
    const item = array[index];
    index * index + Math.sqrt(item);
  }
}

function doWork(array: number[]) {
  return array.map((item, index) => {
    return (array[index] = item * item + Math.sqrt(item));
  });
}

function testVanilla() {
  const array = Array.from(baseArray);

  warmUp(array);

  console.time("Vanilla");
  doWork(array);
  console.timeEnd("Vanilla");
}

function testBased() {
  const array = BasedArray.from(baseArray);

  warmUp(array);

  console.time("Based");
  doWork(array);
  console.timeEnd("Based");
}

function main() {
  console.info(
    `Starting performance test with ${arraySize.toLocaleString()} items.\n`,
  );
  testVanilla();
  testBased();
  testVanilla();
  testBased();
  console.info(`\nFinished performance test.`);
}

main();
