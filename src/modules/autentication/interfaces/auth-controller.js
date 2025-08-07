import { methods as AuthService } from '../aplication/login-service.js';
import { methods as Response } from '../../../shared/helpers/response-handler.js';

const getUserToken = async (req, res, next) => {
  try {
    const token = await AuthService.login(req.body);
    const message = 'Token generado';
    const additionalData = token;

    Response.successHandler(req, res, { message, additionalData });
    return;
  } catch (error) {
    next(error);
  }
};

const refreshUserToken = async (req, res, next) => {
  try {
    const token = req.headers['x-refresh-token'];
    const newToken = await AuthService.relogin(token);
    const message = 'Token actualizado';
    const additionalData = newToken;

    Response.successHandler(req, res, { message, additionalData });
    return;
  } catch (error) {
    next(error);
  }
};

export const methods = {
  getUserToken,
  refreshUserToken,
};