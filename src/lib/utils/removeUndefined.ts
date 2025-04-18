export const removeUndefined = <T>(obj: T): Partial<T> => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== undefined) {
        result[key] =
          typeof value === 'object' ? removeUndefined(value) : value;
      }
    }
  }

  return result;
};
