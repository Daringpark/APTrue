// ESM 형식의 Next.js 설정 파일
const nextConfig = {
  reactStrictMode: true, // React의 Strict Mode 활성화

  // 추가 설정: rewrites
  async rewrites() {
    return [
      {
        source: '/video/:cctvId*', // 동적 경로
        destination: '/video/:cctvId*', // Next.js가 이 경로를 처리하도록 설정
      },
      // 필요한 다른 rewrites를 여기에 추가할 수 있습니다.
    ];
  },
};

export default nextConfig;
