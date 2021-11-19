import React from "react";
import styled from "styled-components";
import { StyledIcon } from "@styled-icons/styled-icon";
import { withTheme } from "styled-components";
import { ThemeType } from "../themes/theme";

interface IconProps {
  icon: StyledIcon;
  marginLeft?: boolean;
  marginRight?: boolean;
  colorLight?: boolean;
  theme?: ThemeType;
}

const Icon: React.FC<IconProps> = ({
  icon,
  marginLeft,
  marginRight,
  colorLight,
  theme,
}) => {
  console.log();

  return (
    <IconStyled
      as={icon}
      marginLeft={marginLeft}
      marginRight={marginRight}
      color={colorLight ? theme.textLight : theme.text}
    />
  );
};

const IconStyled = styled.div<{ marginLeft: boolean; marginRight: boolean }>`
  background-color: transparent;
  width: 24px;
  height: 24px;
  margin-left: ${({ marginLeft }) => (marginLeft ? "10px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "10px" : "0")};
  transition: all 0.5s ease;
`;

export default withTheme(Icon);
