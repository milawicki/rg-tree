import { strictEqual } from 'assert';
import { Nullable, Operation, Operator, TreeElement } from './interfaces';

class Leaf implements TreeElement {
  constructor(private readonly value: number) { }

  result(): number {
    return this.value;
  }

  toString(): string {
    return '' + this.value;
  }
}

class Node implements TreeElement {
  readonly left: TreeElement;
  readonly right?: TreeElement;

  constructor(value: number)
  constructor(left: TreeElement | number, operator: Operator, right: TreeElement | number)
  constructor(left: TreeElement | number, private readonly operator?: Operator, right?: TreeElement | number) {
    this.left = typeof left === 'number' ? new Leaf(left) : left;
    this.right = typeof right === 'number' ? new Leaf(right) : right;
  }

  private calculate(): number {
    const { operator, left, right } = this;

    const operations: Record<Operator, Operation> = {
      '+': (n1: number, n2: number): number => n1 + n2,
      '-': (n1: number, n2: number): number => n1 - n2,
      'x': (n1: number, n2: number): number => n1 * n2,
      '÷': (n1: number, n2: number): number => n1 / n2,
    };
  
    return operations[operator](left.result(), right.result());
  }

  result(): number {
    return this.operator ? this.calculate() : this.left.result();
  }

  toString(): string {
    return this.operator ? `(${ this.left } ${ this.operator } ${ this.right })` : '' + this.left;
  }
}

const tree = new Node(
  new Node(
    7, '+', new Node(
      new Node(3, '-', 2), 'x', 5)
    ),
  '÷', 6
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
