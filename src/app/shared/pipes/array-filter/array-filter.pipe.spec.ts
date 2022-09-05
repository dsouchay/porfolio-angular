import { ArrayFilterPipe } from './array-filter.pipe';

describe('ArrayFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayFilterPipe();
    expect(pipe).toBeTruthy();
  });
  it('must return same value if no args passed', () => {
    const value = [{mode: 'a', value: 'One'}, {mode: 'b', value: 'Two'}];
    const pipe = new ArrayFilterPipe();
    const transformed = pipe.transform(value);
    expect( transformed.length ).toEqual(value.length);
  });
  it('must return less values args passed', () => {
    const value = [{mode: 'a', value: 'One'}, {mode: 'b', value: 'Two'}];
    const pipe = new ArrayFilterPipe();
    const transformed = pipe.transform(value, 'mode', 'a');
    expect( transformed.length ).toBeLessThan(value.length);
  });
  it('must return 0 values if args passed but no matches', () => {
    const value = [{mode: 'a', value: 'One'}, {mode: 'b', value: 'Two'}];
    const pipe = new ArrayFilterPipe();
    const transformed = pipe.transform(value, 'mode', 'c');
    expect( transformed.length ).toBe(0);
  });
});
