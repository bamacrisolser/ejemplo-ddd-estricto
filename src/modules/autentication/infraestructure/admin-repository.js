import dotenv from 'dotenv';
import { QueryTypes } from 'sequelize';
import sequelize from '../../../config/sequelize.js';
import Admin from '../../../shared/models/admin-model.js';
import AdminPermission from '../../../shared/models/admin-permission-model.js';
import AdminRole from '../../../shared/models/admin-role-model.js';
import Role from '../../../shared/models/role-model.js';
dotenv.config();

const getByCredentials = async credentials => {
  const { email, password } = credentials;
  const admin = await Admin.findOne({
    where: {
      email,
      password,
    },
    attributes: {
      exclude: ['password', 'created_datetime', 'profile_photo', 'maternal_surname'],
    },
  });

  if (!admin) return null;
  return admin.get();
};

const findOne = async adminId => {
  const admin = await Admin.findByPk(adminId, {
    attributes: { exclude: ['password'] },
  });
  return admin;
};

const findOneByEmail = async email => {
  const admin = await Admin.findOne({
    where: {
      email,
    },
    attributes: { exclude: ['password'] },
  });
  return admin;
};

const findMany = async filters => {
  let { limit, page, id, email, phone, status } = filters;
  const offset = (page - 1) * limit;
  const where = {};

  if (id) where.admin_id = id;
  if (email) where.email = email;
  if (phone) where.phone = phone;
  if (status) where.account_status_id = status;

  const { count, rows } = await Admin.findAndCountAll({
    where,
    limit,
    offset,
    attributes: { exclude: ['password'] },
  });

  const pages = Math.ceil(count / limit);

  const admins = {
    count: count,
    total_pages: pages,
    current_page: page,
    filters: filters,
    admins: rows,
  };

  return admins;
};

const create = async data => {
  const { admin_id } = await Admin.create(data);
  return admin_id;
};

const update = async (adminId, changes) => {
  const admin = await Admin.update(changes, {
    where: {
      admin_id: adminId,
    },
  });
  return admin;
};

const changePassword = async (adminId, newPassword) => {
  await Admin.update({ password: newPassword }, { where: { admin_id: adminId } });
};

const getPermisions = async adminId => {
  const query = `
        select 
            b.permission_id,
            b.name
        from 
            admin_permission a
            left join 
            permissions b on a.permission_id=b.permission_id 
        where 
            admin_id = ?
    `;
  let permisions = await sequelize.query(query, {
    replacements: [adminId],
    type: QueryTypes.SELECT,
  });
  if (!permisions) return [];
  return permisions;
};

const setPermissions = async (adminId, permissionsInput) => {
  await AdminPermission.destroy({
    where: { admin_id: adminId },
  });
  await AdminPermission.bulkCreate(permissionsInput);
};

const getRoles = async adminId => {
  const adminRoles = await Admin.findByPk(adminId, {
    attributes: [],
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['role_id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  const adminRolesList = adminRoles.roles;
  return adminRolesList;
};

const setRoles = async (adminId, roleInput) => {
  await AdminRole.destroy({
    where: { admin_id: adminId },
  });
  await AdminRole.bulkCreate(roleInput);
};

const getRolePermisions = async adminId => {
  const query = `
        select 
            c.permission_id,
            c.name
        from 
            admin_role a
            left join 
            roles_permissions b on a.role_id=b.role_id 
            left join 
            permissions c on b.permission_id=c.permission_id
        where 
            admin_id = ?
    `;
  let permisions = await sequelize.query(query, {
    replacements: [adminId],
    type: QueryTypes.SELECT,
  });
  if (!permisions) return [];
  return permisions;
};

export const methods = {
  findOne,
  findOneByEmail,
  findMany,
  create,
  update,
  changePassword,
  getByCredentials,
  getPermisions,
  setPermissions,
  getRolePermisions,
  getRoles,
  setRoles,
};
