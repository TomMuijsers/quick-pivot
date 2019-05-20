import { expect } from 'chai';
import { accumulator } from '../../src/logic.js';

const data = [
  {name: 'patrick', borough: 'brooklyn', age: '28', gender: 'm'},
  {name: 'greg', borough: 'brooklyn', age: '29', gender: 'm'},
  {name: 'niles', borough: 'manhattan', age: '30', gender: 'm'},
  {name: 'jared', borough: 'manhattan', age: '29', gender: 'm'},
  {name: 'markus', borough: 'manhattan', age: '28', gender: 'm'},
  {name: 'sarah', borough: 'queens', age: '30', gender: 'f'},
  {name: 'vishakh', borough: 'queens', age: '28', gender: 'm'},
  {name: 'jessica', borough: 'brooklyn', age: '28', gender: 'f'},
];

const dataWithNulls = [
  {name: 'patrick', borough: 'brooklyn', age: '28', gender: 'm'},
  {name: 'greg', borough: 'brooklyn', age: null, gender: 'm'},
  {name: 'niles', borough: 'manhattan', age: '30', gender: 'm'},
  {name: 'jared', borough: 'manhattan', age: '29', gender: 'm'},
  {name: 'markus', borough: 'manhattan', age: null, gender: 'm'},
  {name: 'sarah', borough: 'queens', age: '30', gender: 'f'},
  {name: 'vishakh', borough: 'queens', age: null, gender: 'm'},
  {name: 'jessica', borough: 'brooklyn', age: null, gender: 'f'},
];

export default () => {
  describe('accumulation category check', () => {
    it('average', () => {
      const accumulatedResults = accumulator(data, 'age', 'average');

      expect(accumulatedResults).to.equal(28.75);
    });
    it('count', () => {
      const accumulatedResults = accumulator(data, 'age', 'count');

      expect(accumulatedResults).to.equal(8);
    });
    it('min', () => {
      const accumulatedResults = accumulator(data, 'age', 'min');

      expect(accumulatedResults).to.equal(28);
    });
    it('max', () => {
      const accumulatedResults = accumulator(data, 'age', 'max');

      expect(accumulatedResults).to.equal(30);
    });
    it('sum', () => {
      const accumulatedResults = accumulator(data, 'age', 'sum');

      expect(accumulatedResults).to.equal(230);
    });
    it('default', () => {
      const accumulatedResults = accumulator(data, 'age', 'default');

      expect(accumulatedResults).to.equal(8);
    });
  });

  describe('accumulation category check with ignore nulls', () => {
    it('average', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'average', 'ignore');

      expect(accumulatedResults).to.equal(29.25);
    });
    it('count', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'count', 'ignore');

      expect(accumulatedResults).to.equal(4);
    });
    it('min', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'min', 'ignore');

      expect(accumulatedResults).to.equal(28);
    });
    it('max', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'max', 'ignore');

      expect(accumulatedResults).to.equal(30);
    });
    it('sum', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'sum', 'ignore');

      expect(accumulatedResults).to.equal(117);
    });
    it('default', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'default', 'ignore');

      expect(accumulatedResults).to.equal(4);
    });
  });

  describe('accumulation category check with force nulls', () => {
    it('average', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'average', 'force');

      expect(accumulatedResults).to.equal(null);
    });
    it('count', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'count', 'force');

      expect(accumulatedResults).to.equal(null);
    });
    it('min', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'min', 'force');

      expect(accumulatedResults).to.equal(null);
    });
    it('max', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'max', 'force');

      expect(accumulatedResults).to.equal(null);
    });
    it('sum', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'sum', 'force');

      expect(accumulatedResults).to.equal(null);
    });
    it('default', () => {
      const accumulatedResults = accumulator(dataWithNulls, 'age', 'default', 'force');

      expect(accumulatedResults).to.equal(null);
    });
  });

  it('should take an accumulation start value', () => {
    const accumulatedResults = accumulator(data, 'age', 'count', undefined, 2);

    expect(accumulatedResults).to.equal(10);
  });

  it('should accept an accumulation function which receives an accumulation ' +
    'value, current value, index, and array',
    () => {
      function accFunction(acc, curr, index, array) {
        acc += Number(curr.age);
        if (index === array.length - 1) return acc / array.length;
        return acc;
      }

      const accumulatedResultsWithInit = accumulator(data, accFunction, 100);
      const accumulatedResultsNoInit = accumulator(data, accFunction);

      expect(accumulatedResultsWithInit).to.equal(41.25);
      expect(accumulatedResultsNoInit).to.equal(28.75);
    });
};
