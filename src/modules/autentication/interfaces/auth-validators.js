import error from '../../../shared/helpers/error-constructor.js';

function loginParameters(credentials) {
  const { email, password } = credentials;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(email);

  if (!email) throw error("El parámetro 'email' es necesario");
  if (!isEmail) throw error("El parámetro 'email' debe ser un correo electrónico");
  if (!password) throw error("El parámetro 'password' es necesario");
}

export const methods = {
  loginParameters,
};