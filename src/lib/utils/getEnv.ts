export default (
  key: string,
  options: { isOptional?: boolean } = {},
): string => {
  const { isOptional = false } = options;

  const value = process.env[key];

  if (!value && isOptional) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};
 