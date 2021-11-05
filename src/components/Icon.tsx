import React from "react";
import styled from "styled-components";
import { StyledIcon } from "@styled-icons/styled-icon";
import { withTheme } from "styled-components";
import { ThemeType } from "../theme/theme";

interface IconProps {
  icon: StyledIcon;
  margin?: boolean;
  colorLight?: boolean;
  theme?: ThemeType;
}

const Icon: React.FC<IconProps> = ({ icon, margin, colorLight, theme }) => {
  console.log();

  return (
    <IconStyled
      as={icon}
      margin={margin}
      color={colorLight ? theme.textLight : theme.text}
    />
  );
};

const IconStyled = styled.div<{ margin: boolean }>`
  background-color: transparent;
  width: 24px;
  height: 24px;
  margin-right: ${({ margin }) => (margin ? "10px" : "0")};
`;

export default withTheme(Icon);
