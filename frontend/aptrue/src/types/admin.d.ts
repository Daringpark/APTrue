interface Admin {
    adminId: number;
    name: string;
    account: string;
    password:string;
    phone:string;
    createdAt:string;
}

interface postAdmin {
    account:string;
    name:string;
    password:string;
    phone:string;
}

interface postLogin {
    account:string;
    password:string;
}
