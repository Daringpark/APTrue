interface GetAdmin {
    adminID: number;
    name: string;
    account: string;
    password:string;
    phone:string;
    createdAt:string;
}

interface PostAdmin {
    account:string;
    name:string;
    password:string;
    phone:string;
}

interface PostLogin {
    account:string;
    password:string;
}

interface ResultAdmin {
    adminID: number;
    account:string;
    name:string;
    isSuperAdmin:boolean;
}