import { strictEqual } from 'assert';
import { Nullable, Operator } from './interfaces';

class Node {
  constructor(
    private readonly operator: Nullable<Operator>, 
    private readonly value: Nullable<number>,
    private readonly left: Node,
    private readonly right: Node
  ) {}

  result(): number {
    switch (this.operator) {
      case '+':
        return this.left.result() + this.right.result();
      case '-':
        return this.left.result() - this.right.result();
      case 'x':
        return this.left.result() * this.right.result();
      case '÷':
        return this.left.result() / this.right.result();
      default:
        return this.value;
    }
  }

  toString(): string {
    return this.operator ? `(${this.left.toString()} ${ this.operator } ${this.right.toString()})` : '' + this.value;
  }
}

const tree = new Node(
  '÷',
  null,
  new Node(
    '+',
    null,
    new Node(null, 7, null, null),
    new Node(
      'x',
      null,
      new Node('-', null, new Node(null, 3, null, null), new Node(null, 2, null, null)),
      new Node(null, 5, null, null)
    )
  ),
  new Node(null, 6, null, null)
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
