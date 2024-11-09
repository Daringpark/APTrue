import { selector } from "recoil";
import {adminState} from "./../atoms/admins";

export const charAdminState = selector({
  key: "changeCountState",
  get: ({ get }) => {
    const admin = get(adminState);
    return {
        adminID:admin.adminID
    };
  },
});

// 파생된 데이터 필요할때 사용