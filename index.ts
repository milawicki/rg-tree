import { strictEqual } from 'assert';
import { Nullable, Operation, Operator } from './interfaces';

class Node {
  readonly left?: Node;
  readonly right?: Node;

  constructor(private readonly value: number, private readonly operator?: Operator, left?: Node | number, right?: Node | number) {
    this.left = typeof left === 'number' ? new Node(left) : left;
    this.right = typeof right === 'number' ? new Node(right) : right;
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
    return this.operator ? this.calculate() : this.value;
  }

  toString(): string {
    return this.operator ? `(${ this.left } ${ this.operator } ${ this.right })` : '' + this.value;
  }
}

const tree = new Node(
  null,
  '÷',
  new Node(null, '+',
    7,
    new Node(null, 'x', new Node(null, '-', 3, 2), 5)
  ),
  6
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
