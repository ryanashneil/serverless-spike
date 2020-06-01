import { SES } from 'aws-sdk';
import { APIGatewayEvent, ProxyResult, Handler } from 'aws-lambda';

const ses = new SES({ region: 'us-east-1' });
const EmailSource = process.env.EMAIL || '';

const sendEmail: Handler = async (event: APIGatewayEvent): Promise<void> => {
    const params: SES.SendEmailRequest = {
        Source: EmailSource,
        Destination: {
            ToAddresses: ['ryanashneil@gmail.com']
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Hello~'
                }
            },
            Subject: {
                Data: 'Test email'
            }
        }
    };
    await ses.sendEmail(params).promise();
};

export const main = sendEmail;
