"use client";

import Button from "../common/button/Button";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { useRouter, useParams } from "next/navigation";
import { adminState } from '@/state/atoms/admins';
import { useRecoilValue } from 'recoil';
// import { deleteAdminAction } from "@/serverActions/delete-admin.action";
import Cookies from "js-cookie";

export default function DeleteButton({adminId}:{adminId:number}) {

    const accessToken = Cookies.get('accessToken');
    const admin = useRecoilValue(adminState); // superAdmin은 삭제 불가

    // const {page} : {page:string} = useParams();
    const [ openErrorModal, setOpenErrorModal ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    // 서버 액션
    // const delteAdmin = async () => {

    //     const result = await deleteAdminAction({
    //         page,
    //         adminId,
    //         accessToken
    //     })
    //     setMessage(result.message)
    //     setOpenErrorModal(true)  
    // }

    const delteAdmin = async () => {

        if (admin.superAdmin) {

            setMessage('슈퍼 관리자는 삭제할 수 없습니다.')
            setOpenErrorModal(true);

            return 
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${adminId.toString()}`, {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
                },
                credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            });
    
            const result = await response.json();
    
            if (result.status === 200 && result.code==="A006") {
                setMessage(result.message)
                setOpenErrorModal(true);
                router.refresh(); // 페이지를 새로고침하지 않고 캐시 데이터를 새로고침
                // router.push(window.location.pathname);
                // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동x)
    
            } else if (result.code === "M001") {
                setMessage(result.message)
                setOpenErrorModal(true);
            } else {
                setMessage(result.message)
                setOpenErrorModal(true);
            }
        } catch (error) {
            setMessage('오류가 발생했습니다')
            setOpenErrorModal(true);
        }
    }

    const closeModal = () => {
        setOpenErrorModal(false);
    }

    return (
        <>
            <Button size='webTiny' color='red' onClick={delteAdmin}>
                    삭제
            </Button>
            { openErrorModal &&
                <ErrorModal 
                message={message}
                isOpen={openErrorModal}
                onClose={closeModal}
                />
            }
        </>
    )
}