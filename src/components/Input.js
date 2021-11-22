import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.fullWidth ? '100%' : '315px'};
  background: ${(props) => props.theme.tertiaryColor2};
  padding: 0.2rem 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  margin-bottom: 2rem;

  input {
    width: 100%;
    padding: 0.5rem;
    background: inherit;
    border: none;
    font-size: 1rem;
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.primaryColor};
  }

  label {
    color: ${(props) => props.theme.secondaryColor};
    margin-bottom: 2px;
  }

  label.fullWidth {
    width: 100%;
  }

  label.hideLabel {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  ${(props) =>
    props.lg &&
    css`
      width: 100%;
    `}
`;

const Input = ({
  lg = false,
  type = "text",
  text,
  value,
  onChange,
  placeholder,
  fullWidth = false,
  hideLabel = false,
}) => {
  return (
    <Wrapper lg={lg} fullWidth={fullWidth}>
      <label className={hideLabel ? 'hideLabel' : ''}>{text}</label>
      <input
        autoComplete="new-password"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;