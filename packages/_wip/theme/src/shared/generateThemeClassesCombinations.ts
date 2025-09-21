import type { TTheme } from '../shared/theme.type.js';

function _generateThemeClassesCombinations(
  classNames: Record<string, string[]>,
): string[] {
  const keys = Object.keys(classNames);
  const combinations: string[] = [];

  function combine(prefix: string, index: number) {
    if (index === keys.length) {
      if (prefix.trim()) {
        combinations.push(prefix.trim());
      }
      return;
    }

    const key = keys[index];
    const values = classNames[key];

    // Include combinations without the current key
    combine(prefix, index + 1);

    // Include combinations with each value of the current key
    values.forEach((value) => {
      combine(`${prefix} ${value}`, index + 1);
    });
  }

  combine('', 0);
  return combinations;
}

export default function generateThemeClassesCombinations(
  themeJson: TTheme,
): string[] {
  const classesByParameter: Record<string, string[]> = {};

  for (let [i, parameter] of themeJson.parameters.entries()) {
    if (!classesByParameter[parameter.id]) {
      classesByParameter[parameter.id] = [];
    }

    const sortedOptions = parameter.options
      .filter((o) => o.value)
      .map((o) => o.value)
      .sort();

    for (let [j, option] of sortedOptions.entries()) {
      classesByParameter[parameter.id].push(option);
    }
  }
  let allCombinations = _generateThemeClassesCombinations(classesByParameter);

  // filter using the "valid" keys
  if (themeJson.combinations) {
    allCombinations = allCombinations.filter((c) => {
      const options = c.split(' '),
        paramId = options.shift();

      const validOptions = themeJson.combinations?.[paramId as string] ?? ['*'];

      if (validOptions.includes('*')) {
        return true;
      }

      return options.every((k) => validOptions.includes(k));
    });
  }

  return allCombinations;
}
