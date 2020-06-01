export interface IAuction {
    id: string;
    title: string;
    status: 'OPEN' | 'CLOSED';
    createdAt: String;
    endDate: string;
    highestBid: {
        amount: number;
    };
    owner: string;
}

export interface IUser {
    email: string;
}
