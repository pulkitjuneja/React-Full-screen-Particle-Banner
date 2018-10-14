import styled from "styled-components";

export const BackgroundContainer = styled.div`
  width: 100%;
  overflow:hidden;
  height: auto;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 30%;
  text-align:center;
  left: 0;
  right:0;
  margin-right:auto;
  margin-left:auto;
  color: red;
  font-size: 40px;
  z-index: 10;
`;
