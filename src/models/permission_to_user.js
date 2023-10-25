
// route_key parent sort_order routes routes_name icon permission_type title
module.exports = (sequelize, DataTypes) => {  // id user_id url_id active role_id department_id
    const permissionToUser = sequelize.define(
      'permission_to_user',
      {
        department_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
        },
        url_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        active: {
          type: DataTypes.INTEGER,
          defaultValue:null
        },
        role_id: {
          type: DataTypes.INTEGER,
        }
        
      },
    );
    permissionToUser.associate = function (models) {
      // associations can be defined here
      permissionToUser.belongsTo(models.department,{
        foreignKey: 'department_id'
      })
    };
    return permissionToUser;
  };
  
  
  