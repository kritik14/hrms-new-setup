exports.successResponse = (req, res, msg,data, code = 200) => res.send({
  code,
  data,
  msg,
  success: true,
});

exports.errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(500).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

exports.validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

exports.uniqueId = (length = 13) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const crypto = require("crypto");

let makeSalt = function (byteSize) {
  let defaultByteSize = 16;
  return crypto.randomBytes(defaultByteSize).toString("base64");
};
 

//Encrypt password
exports.encryptPassword = (password, saltKey) => {
  let createdSalt = saltKey ? saltKey : makeSalt();

  if (!password || !createdSalt) {
    return { salt: null, password: null };

  }

  let defaultIterations = 10000;
  let defaultKeyLength = 60;
  let salt = new Buffer(createdSalt, "base64");
  let digest = "sha512";


  return {
    salt: createdSalt,
    password: crypto
      .pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest)
      .toString("base64"),
  };
};

exports.authenticatePass = (encrPass, password, salt) => {
return encrPass === encryptPassword(password, salt).password;
};




// module.exports = {
//   encryptPassword: encryptPassword,
//   authenticatePass: authenticatePass,
// };


