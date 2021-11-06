import { formatDateTimeLocal } from "./format-date";

describe('format-date', () => {
    it('should give expect output for local date with no offset', () => {
      expect(formatDateTimeLocal('2021-10-15T22:00:00')).toEqual('October 15, 2021, 10:00:00 PM');
    });
    it('should give expect output for local date with +ve offset', () => {
      expect(formatDateTimeLocal('2021-10-15T22:00:00+03:00')).toEqual('October 15, 2021, 10:00:00 PM UTC+03:00');
    });
    it('should give expect output for local date with -ve offset', () => {
      expect(formatDateTimeLocal('2021-10-15T22:00:00-03:00')).toEqual('October 15, 2021, 10:00:00 PM UTC-03:00');
    });
  })