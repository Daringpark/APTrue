"use server"

import TableItem from "@/components/admin/TableItem";
import DefaultTableItem from "@/components/admin/DefaultTableItem";
import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';
import { cookies } from 'next/headers';

// params값만 받아서 활용하는 서버컴포넌트!

async function AdminList({pageNum}:{pageNum:string}) {

    const cookiesObj = cookies();
    const accessToken = cookiesObj.get('accessToken')?.value;
    console.log('acessToken', accessToken)

    // api/admin/list/{page}/{limit}
    console.log('getAdminList요청')
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            // next: {tags: ['adminList']}
            cache: 'no-store'
        }
    )

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        return <div>오류가 발생했습니다: {errorData.message}</div>;
    }

    const result = await response.json();
    console.log('adminList',result)
    const admins : GetAdmin[] =  result.data || [];
    const remains :number = 10 - admins.length;

    // 10개씩 자르는데 10개 보다 적으면 뒤에 남은 수 배열로 붙여주기
    const remainNumbers = Array.from({length:remains}, (_, i) => i+1 + admins.length + (Number(pageNum)-1)*10);

    return (
        <div>
            {admins.map((admin, index) => 
                <TableItem 
                key={index}
                adminID={admin.adminID}
                name={admin.name}
                account={admin.account}
                password={admin.password}
                phone={admin.phone}
                createdAt={admin.createdAt}
                />
            )}
            {remainNumbers.map((number, index) =>
                <DefaultTableItem 
                key={index}
                id={number}
                />
            )}
        </div>
    );
}

export default async function Page({params}:{params: {page:string} }) {

    const page = params.page;

    // 관리자 목록 전체 조회 API 불러오기

    return (
        <>
            <AdminList pageNum={page}/>
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
        </>
    )
}