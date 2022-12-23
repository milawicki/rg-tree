import { strictEqual } from 'assert';
import { ArithmeticNode } from './libs';

const tree = new ArithmeticNode(
  new ArithmeticNode(
    7, '+', new ArithmeticNode(
      new ArithmeticNode(3, '-', 2), 'x', 5)
    ),
  '÷', 6
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
