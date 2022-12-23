import { TreeElement, ValueTypes } from "../interfaces";

export class Leaf<T extends ValueTypes> implements TreeElement<T> {
  constructor(private readonly value: T) { }

  result(): T {
    return this.value;
  }

  toString(): string {
    return '' + this.value;
  }
}
