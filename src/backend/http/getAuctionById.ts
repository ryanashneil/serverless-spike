import { DynamoDB } from 'aws-sdk';
import { IAuction } from 'backend/utils/interfaces';
import { middleware } from 'backend/utils/middleware';
import { APIGatewayEvent, ProxyResult, Handler } from 'aws-lambda';

const db = new DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME || '';

const getAuctionById: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
    const { id } = event.pathParameters!;

    const Query: DynamoDB.DocumentClient.Get = {
        TableName,
        Key: { id }
    };

    const result = await db.get(Query).promise();
    const auction = result.Item as IAuction;

    if (!auction) {
        return {
            statusCode: 404,
            body: 'Auction Not found'
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    };
};

export const main = middleware(getAuctionById);
