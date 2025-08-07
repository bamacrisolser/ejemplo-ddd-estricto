import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Admin = sequelize.define(
  'Admin',
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    paternal_surname: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    maternal_surname: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    account_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'admins',
    timestamps: false,
    underscored: true,
  }
);

export default Admin;
