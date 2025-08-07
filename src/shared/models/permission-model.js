import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Permission = sequelize.define(
  'Permission',
  {
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'permissions',
    timestamps: false,
    underscored: true,
  }
);

export default Permission;
