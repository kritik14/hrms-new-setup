
// route_key parent sort_order routes routes_name icon permission_type title
module.exports = (sequelize, DataTypes) => {  // id user_id url_id active role_id department_id
    const permissionUrl = sequelize.define(
      'permission_url',
      {
        route_key: {
          type: DataTypes.STRING
        },
        parent: {
          type: DataTypes.INTEGER,
        },
        sort_order: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        routes: {
          type: DataTypes.STRING,
          defaultValue:null
        },
        routes_name: {
          type: DataTypes.STRING,
        },
        icon: {
            type: DataTypes.STRING,
        },
        permission_type: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        }
      },
    );
    // permissionUrl.associate = function (models) {
    //   // associations can be defined here
    //   permissionUrl.belongsTo(models.department,{
    //     foreignKey: 'department_id'
    //   })
    // };
    return permissionUrl;
  };
  
  
  