import { expect } from 'chai';
import { hasValue } from '../../src/logic.js';

export default () => {
  it('should return false if value is null', () => {
    const hasValueResult = hasValue(null);

    expect(hasValueResult).to.equal(false);
  });

  it('should return false if value is an empty string', () => {
    const hasValueResult = hasValue('');

    expect(hasValueResult).to.equal(false);
  });

  it('should return false if value is undefined', () => {
    const hasValueResult = hasValue(undefined);

    expect(hasValueResult).to.equal(false);
  });

  it('should return true if value is a number', () => {
    const hasValueResult = hasValue(3);

    expect(hasValueResult).to.equal(true);
  });

  it('should return true if value is a (non-empty) string', () => {
    const hasValueResult = hasValue('3');

    expect(hasValueResult).to.equal(true);
  });
};
