import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const AdminPermission = sequelize.define(
  'AdminPermission',
  {
    admin_permission_id: {
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
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'permission_id',
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
    tableName: 'admin_permission',
    timestamps: false,
    underscored: true,
  }
);

export default AdminPermission;
