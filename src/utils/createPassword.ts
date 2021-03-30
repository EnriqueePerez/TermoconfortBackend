import generatePassword from 'password-generator';

export function createPassword(): string {
  const createdPassword = generatePassword();
  return createdPassword;
}
