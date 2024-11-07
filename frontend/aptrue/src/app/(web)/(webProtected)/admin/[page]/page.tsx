import TableItem from "@/components/admin/TableItem";
import DefaultTableItem from "@/components/admin/DefaultTableItem";
import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';

// params값만 받아서 활용하는 서버컴포넌트!

async function AdminList() {

    // const response = await fetch('', {cache:})

    // const admins = 
    // 10개씩 자르는데 10개 보다 적으면 뒤에 남은 수 배열로 붙여주기
    const numbers = Array.from({length:10}, (_, i) => i);

    return (
        <div>
            {numbers.map((number, index) => 
                <TableItem 
                key={index}
                adminId={number+1}
                name="강두홍"
                account="dhkang0912"
                password="apple1234"
                phone="010-1234-5678"
                createdAt="2024-10-02T11:33:22"
                />
            )}
        </div>
    );
}

export default async function Page({
    params,
} : {
    params : Promise<{page:string}>
}) {

    const {page} = await params;
    console.log(page)

    // 관리자 목록 전체 조회 API 불러오기

    return (
        <>
            {/* <DefaultTableItem id={2}/> */}
            <AdminList/>
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
        </>
    )
}