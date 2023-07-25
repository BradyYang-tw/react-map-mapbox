import styled from "styled-components";

export const Container = styled.div``;
export const MapDiv = styled.div`
  height: 100vh;
`;

export const sidebar = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
`;

export const settingGroup = styled.div`
  z-index: 9999; /* 使按钮位于其他地图元素之上 */
  position: absolute;
  top: 150px;
  right: 5px;
`;

export const changeLanBtn = styled.button`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
`;
