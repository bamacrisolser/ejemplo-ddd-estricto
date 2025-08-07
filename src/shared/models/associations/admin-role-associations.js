import Admin from '../admin-model.js';
import Role from '../role-model.js';
import AdminRole from '../admin-role-model.js';

AdminRole.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'roleRef',
});

AdminRole.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'adminRef',
});

export default AdminRole;
