

module.exports = (sequelize, DataTypes) => {
    const roleModel = sequelize.define(
      'roles',
      {
        department_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role_name: {
          type: DataTypes.STRING,
        },
        url_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_by: {
          type: DataTypes.INTEGER,
          defaultValue:null
        },
        created_at: {
          type: DataTypes.STRING,
        }
        
      },
    );
    roleModel.associate = function (models) {
      // associations can be defined here
      roleModel.belongsTo(models.department,{
        foreignKey: 'department_id'
      })
    };
    return roleModel;
  };
  
  
  