const bcrypt = require('bcrypt');
const generatePassword = require('password-generator');

async function Hashed() {
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(password);
  console.log(hashedPassword);
}

Hashed();
