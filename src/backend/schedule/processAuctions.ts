import { DynamoDB } from 'aws-sdk';
import { Handler } from 'aws-lambda';

const db = new DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME || '';

const processAuctions: Handler = async (): Promise<void> => {
    const now: string = new Date().toISOString();
    const AuctionsToCloseQuery: DynamoDB.DocumentClient.QueryInput = {
        TableName,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endDate <= now',
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    };

    const result = await db.query(AuctionsToCloseQuery).promise();

    for await (const auction of result.Items!) {
        const params: DynamoDB.DocumentClient.Update = {
            TableName,
            Key: { id: auction.id },
            UpdateExpression: 'set #status = :status',
            ExpressionAttributeValues: {
                ':status': 'CLOSED'
            },
            ExpressionAttributeNames: {
                '#status': 'status'
            }
        };

        await db.update(params).promise();
    }
};

export const main = processAuctions;
