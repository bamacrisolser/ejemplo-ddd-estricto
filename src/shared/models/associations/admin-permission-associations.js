import Admin from '../admin-model.js';
import Permission from '../permission-model.js';
import AdminPermission from '../admin-permission-model.js';

AdminPermission.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'adminRef',
});

AdminPermission.belongsTo(Permission, {
  foreignKey: 'permission_id',
  as: 'permissionRef',
});

export default AdminPermission;
