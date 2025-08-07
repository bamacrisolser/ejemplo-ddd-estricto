import Permission from '../permission-model.js';
import RolePermission from '../role-permission-model.js';

Permission.hasMany(RolePermission, {
  foreignKey: 'permission_id',
  as: 'rolePermissions',
});

export default Permission;
