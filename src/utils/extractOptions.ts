export function parseOption(optionString) {
  const match = optionString.match(/(.*)\s\((\+\d+,\d+원)\)/);

  if (match && match.length === 3) {
    const name = match[1];
    const price = Number(match[2].replace(/[+,원]/g, ''));

    return { name, price };
  }

  throw new Error(`Invalid option string: ${optionString}`);
}
