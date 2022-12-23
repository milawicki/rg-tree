import { ValueTypes } from ".";

export interface TreeElement<T extends ValueTypes> {
  result: () => T,
  toString: () =>  string
}
