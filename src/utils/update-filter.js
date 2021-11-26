export const updateFilter = (key, value, set) => {
  if (value === undefined || value == null || value === "") {
    set(current => {
      const { [key]: _, ...rest } = current;
      return rest;
    });
  } else {
    set(current => ({ ...current, [key]: value }));
  }
};