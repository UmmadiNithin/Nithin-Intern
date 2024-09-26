// middlewares/validationMiddleware.js
const { 
  registerSchema, 
  loginSchema, 
  profileUpdateSchema, 
  changePasswordSchema, 
  changeEmailSchema, 
  forgotPasswordSchema,
  resetPasswordSchema
} = require('../validations/userValidation');

const validationMiddleware = (req, res, next) => {
  let schema;

  switch (req.path) {
      case '/register':
          schema = registerSchema;
          break;
      case '/login':
          schema = loginSchema;
          break;
      case '/updateProfile':
          schema = profileUpdateSchema;
          break;
      case '/changePassword':
          schema = changePasswordSchema;
          break;
      case '/changeEmail':
          schema = changeEmailSchema;
          break;
      case '/forgotPassword':
          schema = forgotPasswordSchema;
          break;
      case '/resetPassword':
          schema = resetPasswordSchema;
          break;
      default:
          schema = null;
  }

  if (schema) {
      const { error } = schema.validate(req.body);
      if (error) {
          return res.status(400).json({
              result: {},
              message: error.details[0].message,
              status: 'error',
              responseCode: 400,
          });
      }
  }

  next();
};

module.exports = validationMiddleware;
