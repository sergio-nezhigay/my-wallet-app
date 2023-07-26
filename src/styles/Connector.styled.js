import styled from "styled-components";

export const ConnectionSpan = styled.div`
  padding: 10px 18px;
  border-radius: 4px;
  border: 1px solid grey;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  transition: all 0.3s;

  ${(props) =>
    props.status === "info"
      ? `
    background-color: #e4ebe45e;
    color: #000;
  `
      : props.status === "error"
      ? `
    background-color: #ffaaaa;
    color: #721c24;
  `
      : props.status === "init"
      ? `
    background-color: #f8f6f6;
    color: #721c24;
    cursor: pointer;
    &:hover,
    &:active {
      background-color: #e0e0e0;
    }
  `
      : null}
`;
