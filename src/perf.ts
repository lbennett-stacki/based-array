import { BasedArray } from ".";

function testVanilla() {
  // Configure
  const arraySize = 100;
  const arrayToTest = Array(arraySize)
    .fill(0)
    .map((_, i) => i);

  // Warm up
  for (const index of arrayToTest.keys()) {
    const item = arrayToTest[index];
    index * index + Math.sqrt(item);
  }

  // Test
  console.time("map");
  arrayToTest.map((item, index) => {
    return (arrayToTest[index] = item * item + Math.sqrt(item));
  });
  console.timeEnd("map");
}

function testBased() {
  // Configure
  const arraySize = 100;
  const arrayToTest = BasedArray.from(
    Array(arraySize)
      .fill(0)
      .map((_, i) => i),
  );

  // Warm up
  for (const index of arrayToTest.keys()) {
    console.log("warm up index", index);
    const item = arrayToTest[index];
    index * index + Math.sqrt(item);
  }

  // Test
  console.time("map");
  console.log("mapeen 1");
  arrayToTest.map((item, index) => {
    console.log(index, "gooo");
    return (arrayToTest[index] = item * item + Math.sqrt(item));
  });
  console.timeEnd("map");
}

function main() {
  if (process.env.VANILLA === "true") {
    return testVanilla();
  }

  return testBased();
}

main();
