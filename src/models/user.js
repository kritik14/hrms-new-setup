

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'emp_user',
    {
      emp_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      salt: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      joining_date: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      company_id: {
        type: DataTypes.STRING,
        defaultValue: '1',
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: 'Jaipur',
      },
      department_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      role_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      panel_role: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      reported_to: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      random_string: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      ctc: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      account_status: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      notice_period: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      is_password_changed: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      is_auto_approve_asset: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_auto_approve_mrf: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      role_right: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      candidate_ref_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      assigned_to_hr_for_creating_emp_id_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      emp_id_created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      emp_id_created_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      emp_id_created_status: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email_type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email_id_created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      email_id_created_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      email_id_created_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email_password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email_update_verify: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      request_for_id_card: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      send_welcome_letter: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      welcome_letter_send_type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      send_welcome_letter_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      send_welcome_letter_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      is_survey_done: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      account_type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      emp_probation: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      device_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      branch_office: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      emp_attendance_source: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      is_esi: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      is_pf: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      working_from: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

    },
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.roles,{
      foreignKey: 'role_id'
    })
    User.belongsTo(models.emp_user,{
      foreignKey: 'reported_to'
    })
    User.belongsTo(models.department,{
      foreignKey: 'department_id'
    })
  };
  return User;
};

