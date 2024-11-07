import { redirect } from "next/navigation";

export default async (prevState : {message: string | null}, formData: FormData) => {
    "use server"

    if (!formData.get("account") || !(formData.get("account") as string)?.trim()) {
        return {message: "no_account"}
    }

    if (!formData.get("password") || !(formData.get("password") as string)?.trim()) {
        return {message: "no_password"}
    }

    let shouldRedirect :boolean = false;

    try {
        const response = await fetch(`http://k11c101.p.ssafy.io/api/login`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    // credentials안에 username 이랑 password로 고정되어 있음. 그래서 바꿔주기
                    account: formData.get("account"),
                    password: formData.get("password")
                }),
                credentials: 'include'
                })
                console.log('로그인 성공 반환', await response.json() )
                shouldRedirect=true;
    } catch (error) {
        console.log('로그인 실패')
        console.error(error)
        return;
    }

    if (shouldRedirect) {
        redirect('/')
    }
}