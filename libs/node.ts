import { Operator, TreeElement, ValueTypes } from "../interfaces";
import { Leaf } from ".";

export abstract class Node<T extends ValueTypes> implements TreeElement<T> {
  readonly left: TreeElement<T>;
  readonly right?: TreeElement<T>;

  constructor(value: T)
  constructor(left: TreeElement<T> | T, operator: Operator, right: TreeElement<T> | T)
  constructor(left: TreeElement<T> | T, protected readonly operator?: Operator, right?: TreeElement<T> | T) {
    this.left = typeof left !== 'object' ? new Leaf(left) : left;
    this.right = typeof right !== 'object' ? right && new Leaf(right) : right;
  }

  protected abstract calculate(): T;

  result(): T {
    return this.operator ? this.calculate() : this.left.result();
  }

  toString(): string {
    return this.operator ? `(${ this.left } ${ this.operator } ${ this.right })` : '' + this.left;
  }
}
