import Role from '../role-model.js';
import Permission from '../permission-model.js';
import RolePermission from '../role-permission-model.js';

RolePermission.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'roleRef',
});

RolePermission.belongsTo(Permission, {
  foreignKey: 'permission_id',
  as: 'permissionRef',
});

export default RolePermission;
