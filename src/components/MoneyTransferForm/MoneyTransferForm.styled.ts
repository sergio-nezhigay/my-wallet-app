import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border: 1px solid #f8f6f6;
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 160px;
  min-height: 40px;
  margin: 20px auto;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

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

export const SuccessMessageStyled = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  color: green;
`;
