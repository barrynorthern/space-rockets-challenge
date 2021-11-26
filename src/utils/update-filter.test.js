import { updateFilter } from "./update-filter";

let filters = {}
const set = fn => filters = fn(filters);

describe('updateFilter', () => {
    it('should set a filter value by key', () => {
      updateFilter('foo', 1, set);
      expect(filters).toEqual({foo: 1});
    });
    it('should set another filter value by key', () => {
      updateFilter('bar', 2, set);
      expect(filters).toEqual({foo: 1, bar: 2});
    });
    it('should remove a filter value by key', () => {
      updateFilter('foo', undefined, set);
      expect(filters).toEqual({bar: 2});
    });
    it('should change a filter value by key', () => {
      updateFilter('bar', 4, set);
      expect(filters).toEqual({bar: 4});
    });
});