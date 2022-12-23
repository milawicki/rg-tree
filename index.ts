import { strictEqual } from 'assert';
import { Nullable, Operation, Operator } from './interfaces';

function add(number1: number, number2: number): number {
  return number1 + number2;
}

function subtract(number1: number, number2: number): number {
  return number1 - number2;
}

function multiply(number1: number, number2: number): number {
  return number1 * number2;
}

function divide(number1: number, number2: number): number {
  return number1 / number2;
}

function handleOperation(operation: Operator, number1: number, number2: number): number {
  const operations: Record<Operator, Operation> = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '÷': divide
  }

  return operations[operation](number1, number2);
}

class Node {
  readonly left?: Node;
  readonly right?: Node;

  constructor(private readonly value: number, private readonly operator?: Operator, left?: Node | number, right?: Node | number) {
    this.left = typeof left === 'number' ? new Node(left) : left;
    this.right = typeof right === 'number' ? new Node(right) : right;
  }

  result(): number {
    return this.operator 
      ? handleOperation(this.operator, this.left.result(), this.right.result())
      : this.value;
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
