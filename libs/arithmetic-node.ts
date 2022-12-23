import { Node } from '.';
import { Operator, Operation } from '../interfaces';

export class ArithmeticNode extends Node<number> {
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
