export const filterFormikErrors = <T extends object>(
  errors: T,
  touched: { [key: string]: boolean },
  values: T
) => {
  const touchedKeys = Object.entries(touched).map(([key, value]) => {
    if (value) return key;
  });
  const finalErrors: string[] = [];

  Object.entries(errors).forEach(([key, value]) => {
    if (touchedKeys.includes(key) && values) finalErrors.push(value);
  });

  return finalErrors;
};
