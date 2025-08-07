import Admin from '../admin-model.js';
import Role from '../role-model.js';
import Permission from '../permission-model.js';
import AdminRole from '../admin-role-model.js';
import AdminPermission from '../admin-permission-model.js';

Admin.belongsToMany(Role, {
  through: AdminRole,
  foreignKey: 'admin_id',
  otherKey: 'role_id',
  as: 'roles',
});

Admin.belongsToMany(Permission, {
  through: AdminPermission,
  foreignKey: 'admin_id',
  otherKey: 'permission_id',
  as: 'permissions',
});

export default Admin;
