import NextAuth, {DefaultSession, User} from 'next-auth';

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