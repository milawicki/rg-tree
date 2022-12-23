import { strictEqual } from 'assert';
import { Nullable, Operation, Operator, TreeElement, ValueTypes } from './interfaces';

class Leaf<T extends ValueTypes> implements TreeElement<T> {
  constructor(private readonly value: T) { }

  result(): T {
    return this.value;
  }

  toString(): string {
    return '' + this.value;
  }
}

abstract class Node<T extends ValueTypes> implements TreeElement<T> {
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

class ArithmeticNode extends Node<number> {
  protected calculate(): number {
    const { operator, left, right } = this;

    if (!operator || !right) {
      throw new Error('All data need to not defined');
    }

    const operations: Record<Operator, Operation<number>> = {
      '+': (n1: number, n2: number): number => n1 + n2,
      '-': (n1: number, n2: number): number => n1 - n2,
      'x': (n1: number, n2: number): number => n1 * n2,
      '÷': (n1: number, n2: number): number => n1 / n2,
    };
  
    return operations[operator](left.result(), right.result());
  }
}

const tree = new ArithmeticNode(
  new ArithmeticNode(
    7, '+', new ArithmeticNode(
      new ArithmeticNode(3, '-', 2), 'x', 5)
    ),
  '÷', 6
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
