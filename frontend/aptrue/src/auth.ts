import NextAuth  from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface UserInfo {
    account:string;
    password:string;
}

interface ResponseValue {
    user: {
        adminID:number
        account: string;
        name: string;
        isSupserAdmin: boolean;
    }
    accessToken?: string
  }

export const {
    // handlers: {GET, POST}, // api 라우트
    handlers, // 프로젝트의 인증 관리를 위한 API 라우트(GET, POST 함수) 객체
    auth, // 세션 정보를 반환하는 비동기 함수
    signIn, // 사용자 로그인을 시도하는 비동기 함수
    signOut // 사용자 로그아웃을 시도하는 비동기 함수
} = NextAuth({
    pages: {
        // 우리는 여기서 로그인 하므로 로그인하는 페이지를 등록하기
        signIn: '/login'
    },
    // authorize 함수는 회원가입 및 로그인에 성공한 경우, 
    // 사용자의 ID(id), 표시 이름(name), 이메일(email), 프로필 이미지(image)의 정해진 속성으로 정보를 반환
    providers: [
        Credentials({
            authorize: async credentials => {
                const userInfo = credentials as unknown as UserInfo

                try {
                    // 로그인
                    const user = await _login(userInfo);
                    
                    return user ? {...user} : null;
                } catch (error) {
                    throw new Error("로그인 실패")
                }
            }
        })
    ],
    callbacks:{
        // 사용자 로그인을 시도했을 때 호출되며, true를 반환하면 로그인 성공, false를 반환하면 로그인 실패로 처리
        signIn: async () => {
            return true
        },
        // JWT가 생성되거나 업데이트될 때 호출되며, 반환하는 값은 암호화되어 쿠키에 저장
        jwt: async ({token, user}) => {
            // if (user?.accessToken) {
            //     sessionStorage.accessToken = user.accessToken
            // }
            // return token
            if (user) {
                // 쿠키에서 accessToken 읽어오기
                const accessToken = document.cookie
                  .split('; ')
                  .find((row) => row.startsWith('accessToken='))
                  ?.split('=')[1];
                
                if (accessToken) {
                  token.accessToken = accessToken;
                }
              }
              return token;
        },
        // jwt 콜백이 반환하는 token을 받아, 세션이 확인될 때마다 호출되며, 반환하는 값은 클라이언트에서 확인
        session: async ({session, token}) => {
            if (token?.accessToken) {
                session.accessToken = token.accessToken
            }
            return session
        }
    },
    // TO DO
    //secret: process.env.AUTH_SECRET
      secret: '11111'
});

async function _login(
    body : {
        account:string;
        password:string;
    }
) {
    const response = await fetch(`https://ssafy-aptrue.co.kr/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();
    console.log('로그인 성공', data.data)

    if (response.ok && data && typeof data !== 'string') {
      const { adminID, account, name, isSupserAdmin } = data.data;
      return {
        id: adminID,
        adminID: adminID,
        account: account,
        name: name,
        isSupserAdmin : isSupserAdmin
      };
    }
  
    throw new Error("로그인 요청에 실패했습니다.");


}