export type ScrapedValuesStringified = {
  dateTime: string | null;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

// type guard for array of ScrapedValuesStringified
export function isScrapedValuesStringifiedArray(
  values: unknown
): values is ScrapedValuesStringified[] {
  return Array.isArray(values) && values.every((value) => typeof value === 'object'); // false positive for array of arrays
}
