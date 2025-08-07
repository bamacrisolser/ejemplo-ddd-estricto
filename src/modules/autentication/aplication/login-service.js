import { methods as AdminRepository } from '../infraestructure/admin-repository.js';
import { methods as Validator } from '../interfaces/auth-validators.js';
import error from '../../../shared/helpers/error-constructor.js';
import createJWT from '../domain/create-jwt.js'
import createRefreshJWT from '../domain/create-refresh-jwt.js';
import validateJWT from '../domain/validate-jwt.js';

const login = async credentials => {
  Validator.loginParameters(credentials);

  const admin = await AdminRepository.getByCredentials(credentials);
  if (admin == null) throw error('Usuario no encontrado');

  let permissions = await AdminRepository.getPermisions(admin.admin_id);
  let rolePermissions = await AdminRepository.getRolePermisions(admin.admin_id);
  let permissionsList = permissions.map(row => row.name);
  let rolePermissionsList = rolePermissions.map(row => row.name);
  let allPermissions = [...new Set([...permissionsList, ...rolePermissionsList])];

  let token = createJWT(admin,allPermissions);
  let refreshToken = createRefreshJWT(admin)

  return {
    token: token,
    refresh_token: refreshToken,
  };
};

const relogin = async token => {
  try {
    if (!token) throw error("'x-refresh-token' header is mandatory", null, 401);
    const decoded = validateJWT(token)
    const adminId = decoded.admin.admin_id;

    const admin = await AdminRepository.findOne(adminId);
    if (!admin) throw error('User not found', null, 401);

    let permissions = await AdminRepository.getPermisions(adminId);
    let rolePermissions = await AdminRepository.getRolePermisions(adminId);
    let permissionsList = permissions.map(row => row.name);
    let rolePermissionsList = rolePermissions.map(row => row.name);
    let allPermissions = [...new Set([...permissionsList, ...rolePermissionsList])];

    let newToken = createJWT(admin, allPermissions);

    return { token: newToken };
  } catch (err) {
    throw error(err.message, null, 401);
  }
};

export const methods = {
  login,
  relogin,
};