import Role from '../role-model.js';
import Permission from '../permission-model.js';
import RolePermission from '../role-permission-model.js';

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
  otherKey: 'permission_id',
  as: 'permissions',
});

Role.hasMany(RolePermission, {
  foreignKey: 'role_id',
  as: 'rolePermissions',
});

export default Role;
