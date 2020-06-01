import { v4 as id } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { IAuction, IUser } from 'backend/utils/interfaces';
import { middleware } from 'backend/utils/middleware';
import { APIGatewayEvent, ProxyResult, Handler } from 'aws-lambda';

const db = new DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME || '';

const creationAuction: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
    const body = JSON.parse(event.body!);
    const { email } = <IUser>event.requestContext.authorizer;

    const date = new Date();
    const endDate = new Date();
    endDate.setHours(date.getHours() + 1);
    
    const auction: IAuction = {
        id: id(),
        title: body.title,
        status: 'OPEN',
        createdAt: date.toISOString(),
        endDate: endDate.toISOString(),
        owner: email,
        highestBid: {
            amount: 0
        }
    };

    const Item: DynamoDB.DocumentClient.Put = {
        TableName,
        Item: auction
    };

    await db.put(Item).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(auction)
    };
};

export const main = middleware(creationAuction);
