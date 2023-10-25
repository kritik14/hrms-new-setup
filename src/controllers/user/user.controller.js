const jwt =require('jsonwebtoken');
const crypto =require('crypto');
const axios =require('axios');
const db = require('../../models');   //{ emp_user:User,department:departmentModel,roles }
const sequelize=db.sequelize;
const { successResponse, errorResponse, uniqueId } =require('../../helpers');
const { Op } = require('sequelize');
const userModel=db.emp_user;
const departmentModel=db.department;
const roleModel=db.roles;
const permissionToUserModel=db.permission_to_user;
const permissionUrlModel=db.permission_url;
const {authenticatePass}=require('../../helpers');
const {signinToken}=require('../../helpers/auth');

exports.login = async (req, res) => {
  try {


    // const cryptr = new Cryptr(config.get("encryptCTC"));
    // const decryptedString = cryptr.decrypt("ed0b23bf2471943d8910a56a231bf5f2200bfa94859d787ea8b4dc5324358372ad89e0136bf4927d4d7f0e02dfe71a6d42cce700f882ad50920d9cf0cee771a307989cf0e306350da14e1ce003882ce49e99748d65a6a8ce975d0c224fd0d9e38be2ff901c8d");
    // console.log(decryptedString);

    let request = req.body;
    // let newDb = db;
    // if (config.get("env") === "development") {
    //   newDb = await db;
    // }
    let email = request.email.toLowerCase();
    let device_id = request.device_id;
    const accountStatus = await userModel.find({
      where: { email },
      attributes: ['account_status']
    });
    // let findUserAccountStatus = `SELECT account_status FROM emp_user WHERE email = '${email}'`
    // let accountStatus = await wait(newDb, findUserAccountStatus);

    if (!accountStatus || accountStatus.length == 0) {
      return errorResponse(req, res, "Invalid credential!",400);
    }
    if (accountStatus[0].account_status == "active") {

      let userDetail = await userModel.find({
        where: { email },
        include: [
          {
            model: departmentModel,
            attributes: [['name','employee_department']],
          },
          {
            model: roleModel,
            attributes: [['role_name','employee_designation']]
          },
          {
            model: userModel,
            attributes: [[sequelize.fn('concat',sequelize.col('first_name'), ' ',sequelize.col('last_name')),'employee_reporting_manager']]
          }
        ],
      });

      // let findUser = `SELECT eu.*,d.name as employee_department,r.role_name as employee_designation,
      // concat_ws(" ",eus.first_name,eus.last_name) as employee_reporting_manager
      // FROM emp_user eu
      // left join department d on d.id = eu.department_id
      // left join roles r on r.id = eu.role_id
      // left join emp_user eus on eus.id = eu.reported_to 
      // WHERE eu.email = '${email}'`;
      // let userDetail = await wait(newDb, findUser);

      let emp_user_id = userDetail[0].id;

      // add device ID
      await userModel.update({device_id},{
        where:{
          id:emp_user_id
        }
      })

      // add device ID 
      // let update_device_id = `update emp_user SET device_id  = '${device_id}' 
      // where id = ${emp_user_id}`;
      // await wait(newDb, update_device_id);




      if (!userDetail || userDetail.length == 0) {
        return errorResponse(req, res, "Something went wrong!",400);
      }
      let checkPassword = authenticatePass(userDetail[0].password, request.password, userDetail[0].salt);
      if (!checkPassword) {
        return errorResponse(req, res, "Invalid Credentials!",400);
      }
      let token = signinToken(email);
      // GET THE PERMISSION URL_IDS AND ACCESSABLE PAGES TO THE USER
      const data = await permissionToUserModel.find({
        where: { user_id:userDetail[0].id },
        attributes: ['url_id']
      });
      // let findSql = `SELECT url_id FROM permission_to_user WHERE user_id = ${userDetail[0].id}`;
      // let data = await wait(newDb, findSql);
      if (!data || data.length == 0) {
        return errorResponse(req, res, "Your account is not active, please contact to Admin.",400);
      }
      let url_id = data[0].url_id.split(",");
      // let ids = "(";
      // url_id.map((urlId, i) => {
      //   ids += urlId;
      //   if (i !== url_id.length - 1) {
      //     ids += ",";
      //   }
      // });
      // ids += ")";

      const urlData = await permissionUrlModel.find({
        where: { [Op.in]:url_id }
      });
      // let FindUrlData = `SELECT * FROM permission_url WHERE id  IN  ${ids}`;
      // let urlData = await wait(newDb, FindUrlData);

      return successResponse(req,res,"Login Successfull", {
        user: userDetail, token: token, urlData: urlData
      });
    } else {
      return errorResponse(req, res, "Sorry! Your account is InActive!",400);
    }
  } catch (error) {
    console.log(error);
   // common.internalServerError(res, "Unable to login", error);
   return errorResponse(req, res, "Unable to Login!",error);
  }
};
