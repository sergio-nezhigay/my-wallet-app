import styled from "styled-components";

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }

  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="number"] {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .error {
    color: red;
  }
`;
