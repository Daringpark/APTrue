import NextAuth, {DefaultSession, User} from 'next-auth';

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

// declare module 'next-auth' {
//     interface Session extends DefaultSession {
//         user: {
//             account:string
//         } & DefaultSession['user'];
//         accessToken:string;
//     }
// }


declare module 'next-auth' {
    // User 인터페이스는 authorize 함수가 로그인 성공 시 반환하는 사용자 정보를 정의
    interface User {
        adminID: number;
        account:string;
        isSuperAdmin:boolean;
    //  accessToken: string
    }
    interface Session {
      accessToken: string
    }
  }
declare module '@auth/core/jwt' {
    interface JWT {
      accessToken: string
    }
}