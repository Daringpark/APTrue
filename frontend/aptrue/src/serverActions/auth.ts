'use server'

// 서버 및 클라이언트 컴포넌트에서 사용할 수 있도록, 로그인(회원가입)과 로그아웃을 서버 액션으로 작성
import { auth, signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'

// 'credentials'로 호출해, 사용자가 입력한 로그인 정보를 전달
export const signInWithCredentials = async (
    initialState: {message:string},
    formData: FormData
) => {
    console.log(1111111111)
    console.log('.env', process.env.NEXTAUTH_URL)
    console.log('signInWithCredentials serverActions/auth.ts', formData)
    try {
        await signIn('credentials', {
          account: formData.get('account') || '', // null 방지
          password: formData.get('password') || ''
          // redirectTo: '/' // 로그인 후 메인 페이지로 이동!
        })
    } catch (error) {
        return  { message: error instanceof Error ? error.message : '로그인에 실패했습니다' };
    }
    
    redirect('/')
}

export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}

export {
  auth as getSession, 
}