import { localServer } from "./const";

// 因為FE與BE Domain不同，需要判斷並返回適當的origin
export const getApiOrigin = () => { // 為了ut，不然可以不用帶入location參數
  if (window.location.origin !== "http://localhost:3000") {
    return `http://www.traffic.bradydaddy.com`;
  }
  return localServer;
};
