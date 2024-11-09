import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const adminState = atom({
    key:'adminState',
    default: {
        adminID: 0,
        account:'',
        name:'',
        isSuperAdmin:false,
    },
    effects_UNSTABLE: [persistAtom],  // 상태 지속화 설정
})

// atom : 상태를 정의하고 저장함. 읽거나 업데이트 할때 사용
