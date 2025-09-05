export function validateCpf(cpf: string) {
  if (!cpf) return false;
  cpf = sanitizeCpf(cpf);
  const hasValidLength = cpf.length === 11;
  if (!hasValidLength || isAllDigitsEqual(cpf)) return false;
  const firstDigit = calculateDigit(cpf, 10);
  const secondDigit = calculateDigit(cpf, 11);
  return extractDigits(cpf) == `${firstDigit}${secondDigit}`;
}

function sanitizeCpf(cpf: string) {
  return cpf.replace(/[^0-9]/g, '');
}

function isAllDigitsEqual(cpf: string) {
  const firstDigit = cpf[0];
  return [...cpf].every((digit) => digit === firstDigit);
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function extractDigits(cpf: string) {
  return cpf.slice(9);
}
