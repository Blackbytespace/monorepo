export type TAstToken = {
  type: string;
  value: {
    unit: string;
    value: number;
    type?: string;
  };
};

export default function toRem<T>(
  astToken: T,
): T extends number ? number : TAstToken {
  let finalValue = astToken as TAstToken;

  // handle simple number
  if (typeof finalValue === 'number') {
    return (finalValue * 0.0625) as T extends number ? number : TAstToken;
  }

  // cases where we don't need to convert to rem
  const isSimpleNumber = typeof finalValue === 'number',
    isRemValue = finalValue.value?.unit === 'rem',
    isNumberToken =
      finalValue.type === 'token' && finalValue.value?.type === 'number';
  if (isSimpleNumber || isRemValue || isNumberToken) {
    return finalValue as T extends number ? number : TAstToken;
  }

  // handle value 0
  if (finalValue.value?.value === 0) {
    finalValue.type = 'length';
    finalValue.value = {
      unit: 'rem',
      value: 0,
    };
    return finalValue as T extends number ? number : TAstToken;
  }

  // px values
  if (finalValue.type === 'length' && finalValue.value?.unit === 'px') {
    finalValue.value.unit = 'rem';
    finalValue.value.value *= 0.0625;
    return finalValue as T extends number ? number : TAstToken;
  }

  // return the final value that has not been modified
  return finalValue as T extends number ? number : TAstToken;
}
