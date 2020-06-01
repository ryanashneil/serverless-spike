import { Context, Callback, CustomAuthorizerEvent, Handler, AuthResponse } from 'aws-lambda';
import { IUser } from 'backend/utils/interfaces';

const generatePolicy = (principalId: string, Effect: 'Allow' | 'Deny', Resource: string): AuthResponse => ({
    principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [{ Action: 'execute-api:Invoke', Effect, Resource }]
    }
});

const checkAuthorization: Handler = (event: CustomAuthorizerEvent, ctx: Context, callback: Callback): void => {
    const auth = event.authorizationToken;
    if (!auth) {
        callback('Unauthorized');
    } else {
        const context: IUser = { email: auth };
        const authResponse = {
            ...generatePolicy('user', 'Allow', event.methodArn),
            context
        };
        callback(null, authResponse);
    }
};

export const main = checkAuthorization;
