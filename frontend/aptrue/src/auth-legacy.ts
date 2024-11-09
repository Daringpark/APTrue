import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

import Credentials from "next-auth/providers/credentials";
 

// user 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      account: string;
      isSuperAdmin: boolean;
    } & DefaultSession["user"];
    accessToken:string;
    refreshToken:string;
  }
}

// JWT 타입 확장
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string; // 토큰에 액세스 토큰 추가
    refreshToken: string; // 토큰에 리프레시 토큰 추가
  }
}


export const {
    handlers: {GET, POST}, // api 라우트
    auth,
    signIn // 로그인용
} = NextAuth({
    pages: {
        // 우리는 여기서 로그인 하므로 로그인하는 페이지를 등록하기
        signIn: '/login'
    },
    // 로그아웃했을때 로그인 필요한 페이지 막는 방법!!! 
    // callbacks:{
    //     // session검사했을떄 session이 없다면 redirect시키기
    //     async authorized({auth}) {
    //         if (!auth) {
    //             return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    //         }
    //         return true;
    //     }
    // },
    providers: [
        Credentials({
            credentials: {
                account: {},
                password: {}
            },
            // 세션을 생성할때 반환 값들 사용할 수 있음.
        authorize: async (credentials : any) => {
            
            try {
                    // TODO ${process.env.NEXT_PUBLIC_BASE_URL}
                const authResponse = await fetch(`http://k11c101.p.ssafy.io/api/login`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    // credentials안에 username 이랑 password로 고정되어 있음. 그래서 바꿔주기
                    account: credentials.account ,
                    password:credentials.password
                    }),
                })

                if (!authResponse.ok) {
                    return null
                }

                const response = await authResponse.json();
                const user = response.data;
                console.log('로그인 성공 후 반환', user)

                return {
                    id: user.adminID,
                    account : user.account,
                    name: user.name,
                    isSuperAdmin:user.isSuperAdmin
                }
            } catch (error) {
                console.log('로그인 실패', error)
                throw new Error('로그인 실패')
                // return null
            }

        },
        }),
  ],
});