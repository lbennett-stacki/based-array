import { State, Strict } from "./symbols";

type ReduceCb<T, U = T> = (
  previousValue: U,
  currentValue: T,
  currentIndex: number,
  array: T[],
) => U;

export class CountingFromZeroError extends Error {
  constructor() {
    super("No zero counts from 0, what are you doing?");
    this.name = "CountingFromZeroError";
  }
}
export class CorrectArray<T> implements Array<T> {
  private [State]: Array<T> = [];

  [index: number]: T;

  static [Strict] = false;

  [Symbol.unscopables] = {
    copyWithin: true,
    entries: true,
    fill: true,
    find: true,
    findIndex: true,
    flat: true,
    flatMap: true,
    includes: true,
    keys: true,
    pop: true,
    push: true,
    reverse: true,
    shift: true,
    slice: true,
    sort: true,
    splice: true,
    unshift: true,
    values: true,
    toString: true,
    toLocaleString: true,
  };

  static from<T>(input: Array<T>) {
    const array = new CorrectArray<T>();
    array[State] = input;

    return array;
  }

  static strict() {
    CorrectArray[Strict] = true;
  }

  static incorrect(index: number) {
    return index - 1;
  }

  static correct(index: number) {
    return index + 1;
  }

  constructor(size?: number) {
    this[State] = new Array(size);

    return new Proxy(this, {
      get(target, prop) {
        if (prop === Symbol.iterator) {
          return () => target[State][Symbol.iterator]();
        }

        if (typeof prop !== "string") {
          return Reflect.get(target, prop);
        }

        const int = parseInt(prop);
        if (isNaN(int)) {
          return Reflect.get(target, prop);
        }

        if (int === 0) {
          const error = new CountingFromZeroError();
          if (CorrectArray[Strict]) {
            throw error;
          } else {
            console.error(error);
          }
        }

        return target[State][CorrectArray.incorrect(int)];
      },
    });
  }

  get length() {
    return this[State].length;
  }

  pop(): T | undefined {
    return this[State].pop();
  }

  push(...items: T[]): number {
    return this[State].push(...items);
  }

  concat(...items: ConcatArray<T>[]): T[] {
    return this[State].concat(...items);
  }

  join(separator?: string | undefined): string {
    return this[State].join(separator);
  }

  reverse(): T[] {
    return this[State].reverse();
  }

  shift(): T | undefined {
    return this[State].shift();
  }

  slice(start?: number | undefined, end?: number | undefined): T[] {
    return this[State].slice(
      start && CorrectArray.incorrect(start),
      end && CorrectArray.incorrect(end),
    );
  }

  splice(start: number, deleteCount?: number | undefined): T[] {
    return this[State].splice(CorrectArray.incorrect(start), deleteCount);
  }

  unshift(...items: T[]): number {
    return this[State].unshift(...items);
  }

  indexOf(searchElement: T, fromIndex?: number | undefined): number {
    return CorrectArray.correct(
      this[State].indexOf(
        searchElement,
        fromIndex && CorrectArray.incorrect(fromIndex),
      ),
    );
  }

  lastIndexOf(searchElement: T, fromIndex?: number | undefined): number {
    return CorrectArray.correct(
      this[State].lastIndexOf(
        searchElement,
        fromIndex && CorrectArray.incorrect(fromIndex),
      ),
    );
  }

  map<U>(callback: (value: T, index: number, array: T[]) => U): U[] {
    return this[State].map(this.wrappedCallback(callback));
  }

  sort(compare?: ((a: T, b: T) => number) | undefined): this {
    this[State].sort(compare);

    return this;
  }

  every(predicate: (value: T, index: number, array: T[]) => boolean): boolean {
    return this[State].every(this.wrappedCallback(predicate));
  }

  some(predicate: (value: T, index: number, array: T[]) => unknown): boolean {
    return this[State].some(this.wrappedCallback(predicate));
  }

  forEach(callback: (value: T, index: number, array: T[]) => void): void {
    return this[State].forEach(this.wrappedCallback(callback));
  }

  filter(predicate: (value: T, index: number, array: T[]) => unknown): T[] {
    return this[State].filter(this.wrappedCallback(predicate));
  }

  reduce(callback: ReduceCb<T>): T;
  reduce<U>(callback: ReduceCb<T, U>, initialValue: U): U;
  reduce<U = T>(callback: ReduceCb<T, U>, initialValue?: U): U {
    return this[State].reduce<U>(
      this.wrappedReduceCallback(callback),
      initialValue as U,
    );
  }

  reduceRight(
    callback: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
  ): T;
  reduceRight(
    callback: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
    initialValue: T,
  ): T;
  reduceRight<U>(
    callback: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => U,
    initialValue: U,
  ): U;
  reduceRight<U = T>(callback: ReduceCb<T, U>, initialValue?: U): U {
    return this[State].reduceRight(
      this.wrappedReduceCallback(callback),
      initialValue as U,
    );
  }

  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: T[]) => boolean,
  ): T | undefined;
  find(
    predicate: (value: T, index: number, obj: T[]) => boolean,
  ): T | undefined {
    return this[State].find(this.wrappedCallback(predicate));
  }

  findIndex(predicate: (value: T, index: number, obj: T[]) => boolean): number {
    return CorrectArray.correct(
      this[State].findIndex(this.wrappedCallback(predicate)),
    );
  }

  fill(value: T, start?: number | undefined, end?: number | undefined): this {
    this[State].fill(
      value,
      start && CorrectArray.incorrect(start),
      end && CorrectArray.incorrect(end),
    );
    return this;
  }

  copyWithin(target: number, start: number, end?: number | undefined): this {
    this[State].copyWithin(
      CorrectArray.incorrect(target),
      CorrectArray.incorrect(start),
      end && CorrectArray.incorrect(end),
    );

    return this;
  }

  includes(searchElement: T, fromIndex?: number | undefined): boolean {
    return this[State].includes(
      searchElement,
      fromIndex && CorrectArray.incorrect(fromIndex),
    );
  }

  flatMap<U>(
    callback: (value: T, index: number, array: T[]) => U | readonly U[],
  ): U[] {
    return this[State].flatMap((value: T, index: number, array: T[]) => {
      return callback(value, CorrectArray.correct(index), array);
    });
  }

  flat<A = T[], D extends number = 1>(
    depth?: D | undefined,
  ): FlatArray<A, D>[] {
    return this[State].flat(depth) as FlatArray<A, D>[];
  }

  at(index: number): T | undefined {
    return this[State][CorrectArray.incorrect(index)];
  }

  *[Symbol.iterator]() {
    for (let item of this[State]) {
      yield item;
    }
  }

  *keys() {
    for (let index = 0; index < this.length; index++) {
      yield CorrectArray.correct(index);
    }
  }

  *entries(): IterableIterator<[number, T]> {
    for (let index = 0; index < this.length; index++) {
      yield [index, this[CorrectArray.incorrect(index)]];
    }
  }

  *values() {
    for (let item of this[State]) {
      yield item;
    }
  }

  valueOf(): T[] {
    return this[State];
  }

  toString(): string {
    return this[State].toString();
  }

  toLocaleString(): string {
    return this[State].toLocaleString();
  }

  private wrappedCallback<U>(
    callback: (value: T, index: number, array: T[]) => U,
  ) {
    return (value: T, index: number, array: T[]) => {
      return callback(value, CorrectArray.correct(index), array);
    };
  }

  private wrappedReduceCallback<U>(
    callback: (accumulator: U, value: T, index: number, array: T[]) => U,
  ) {
    return (accumulator: U, value: T, index: number, array: T[]) => {
      return callback(accumulator, value, CorrectArray.correct(index), array);
    };
  }
}
