import StatusCode from './StatusCode';

export default {
  // Success
  [StatusCode.SUCCESS]: 'Success',
  
  // General errors
  [StatusCode.DATA_NOT_FOUND]: 'Data Not Found',
  [StatusCode.INVALID_PARAMETER]: 'Invalid Parameter',
  [StatusCode.UNAUTHROIZED]: 'Unauthorized Access',
  [StatusCode.FORBIDDEN]: 'Access Forbidden',
  [StatusCode.INVALID_REFRESH_TOKEN]: 'Invalid Refresh Token',

  // IAM related errors
  [StatusCode.EMAIL_ALREADY_EXISTS]: 'Email Already Exists',
  [StatusCode.SOME_POLICY_NOT_FOUND]: 'Policy Not Found',
  [StatusCode.SOME_ACTION_NOT_FOUND]: 'Action Not Found',
  [StatusCode.USER_ALREADY_ACTIVATED]: 'User Already Activated',
  [StatusCode.CANNOT_MODIFY_DEFAULT_POLICY]: 'Cannot Modify Default Policy',
  [StatusCode.USER_TOKEN_NOT_FOUND]: 'User Token Not Found',
  [StatusCode.USER_TOKEN_EXPIRED]: 'User Token Expired',
  [StatusCode.USER_NOT_FOUND]: 'User Not Found',
  [StatusCode.INVALID_CREDENTIALS]: 'Invalid Credentials',
  [StatusCode.USER_NOT_ACTIVATED]: 'User Not Activated',
  [StatusCode.INVALID_PASSWORD]: 'Invalid Password',

  // Email errors
  [StatusCode.SEND_EMAIL_FAILED]: 'Failed to Send Email',

  // Internal errors
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};
