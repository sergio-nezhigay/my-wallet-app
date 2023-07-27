import styled from "styled-components";
import { STATUS } from "../../utils/constants";

export const ConnectionSpan = styled.div`
  padding: 10px 18px;
  border-radius: 4px;
  border: 1px solid #f8f6f6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  ${(props) =>
    props.status === STATUS.INFO
      ? `
    background-color: #e4ebe45e;
  `
      : props.status === STATUS.ERROR
      ? `
    background-color: #ffaaaa;
    color: #721c24;
  `
      : null}
`;

export const Button = styled.button`
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 4px;
  border: 1px solid #f8f6f6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: #f8f6f6;
  transition: background-color 0.3s;
  &:hover,
  &:active {
    background-color: #e0e0e0;
  }
`;
