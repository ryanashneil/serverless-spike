import middy from '@middy/core';
import cors from '@middy/http-cors';
import normalizer from '@middy/http-event-normalizer';
import errorHandler from '@middy/http-error-handler';

import { Handler } from 'aws-lambda';

export const middleware = (handler: Handler) => middy(handler).use([cors(), normalizer(), errorHandler()]);
