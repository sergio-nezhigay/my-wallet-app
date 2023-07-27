import styled from "styled-components";

export const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px 20px;
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const Footer = styled.footer`
  position: absolute;
  bottom: 40px;
  left: 20px;
`;
export const Main = styled.main`
  width: 100%;
`;
