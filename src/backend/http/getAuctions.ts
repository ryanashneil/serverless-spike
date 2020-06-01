import { DynamoDB } from 'aws-sdk';
import { IAuction } from 'backend/utils/interfaces';
import { middleware } from 'backend/utils/middleware';
import { ProxyResult, Handler } from 'aws-lambda';

const db = new DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME || '';

const getAuctions: Handler = async (): Promise<ProxyResult> => {
    let auctions: IAuction[] = [];

    const result = await db.scan({ TableName }).promise();
    auctions = result.Items as IAuction[];

    return {
        statusCode: 200,
        body: JSON.stringify(auctions)
    };
};

export const main = middleware(getAuctions);
