import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, ProxyResult, Handler } from 'aws-lambda';
import { middleware } from 'backend/utils/middleware';

const db = new DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME || '';

const placeBid: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
    const { id } = event.pathParameters!;
    const { amount } = JSON.parse(event.body!);

    const Query: DynamoDB.DocumentClient.UpdateItemInput = {
        TableName,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount': amount
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await db.update(Query).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes)
    };
};

export const main = middleware(placeBid);
