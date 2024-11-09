import { NextApiResponse, NextApiRequest } from 'next';


export default function handler(req:NextApiRequest, res:NextApiResponse) {
    
    // 로그아웃 요청 시 accessToken 쿠키 제거
    res.setHeader('Set-Cookie', 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;');
    res.status(200).json({ message: '로그아웃 성공' });
}
