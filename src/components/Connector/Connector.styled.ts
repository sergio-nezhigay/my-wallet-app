import styled from "styled-components";

export const Button = styled.button`
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 4px;
  border: 1px solid #f8f6f6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  color: inherit;
  background-color: #f8f6f6;
  transition: background-color 0.3s;
  &:hover,
  &:active {
    background-color: #e0e0e0;
  }
`;
