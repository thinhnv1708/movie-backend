import StatusCode from './StatusCode';
import httpCode from './HttpStatus';

export default {
  [StatusCode.SUCCESS]: httpCode.SUCCESS,
  [StatusCode.DATA_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.INVALID_PARAMETER]: httpCode.BAD_REQUEST,
  [StatusCode.INTERNAL_SERVER_ERROR]: httpCode.INTERNAL_SERVER_ERROR,
};
