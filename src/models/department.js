

module.exports = (sequelize, DataTypes) => {
    const departmentModel = sequelize.define(
      'department',
      {
        name: {
          type: DataTypes.STRING,
        },
        url_id: {
          type: DataTypes.STRING,
        },
        software_id: {
          type: DataTypes.STRING,
        },
        code: {
          type: DataTypes.INTEGER,
          defaultValue:null
        },
        created_at: {
          type: DataTypes.STRING,
        },
        short_name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        default: {
            type: DataTypes.STRING,
        },
        grade: {
            type: DataTypes.STRING,
        }
      },
    );
    // departmentModel.associate = function (models) {
    //   // associations can be defined here
    //   departmentModel.belongsTo(models.department,{
    //     foreignKey: 'department_id'
    //   })
    // };
    return departmentModel;
  };
  