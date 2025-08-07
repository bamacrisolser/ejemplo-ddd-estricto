import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const AdminRole = sequelize.define(
  'AdminRole',
  {
    admin_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admins',
        key: 'admin_id',
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role_id',
      },
    },
    status: {
      type: DataTypes.BOOLEAN, // tinyint(1) => boolean
      allowNull: false,
      defaultValue: true,
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'admin_role',
    timestamps: false,
    underscored: true,
  }
);

export default AdminRole;
