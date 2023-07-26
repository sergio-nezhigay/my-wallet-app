import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: 1px solid grey;
  border-radius: 6px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 16px;
    text-align: center;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-basis: 100%;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const SubmitButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.div`
  color: red;
  margin-bottom: 12px;
  font-size: 14px;
`;
