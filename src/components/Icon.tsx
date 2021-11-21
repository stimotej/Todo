import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { StyledIcon } from "@styled-icons/styled-icon";
import { withTheme } from "styled-components";
import { ThemeType } from "../themes/theme";

interface IconProps {
  icon: StyledIcon;
  marginLeft?: boolean;
  marginRight?: boolean;
  colorLight?: boolean;
  theme?: ThemeType;
  layout?: boolean;
}

const Icon: React.FC<IconProps> = ({
  icon,
  marginLeft,
  marginRight,
  colorLight,
  theme,
  layout,
}) => {
  console.log();

  return (
    <motion.div
      layout={layout}
      transition={{
        duration: 0.2,
        type: "spring",
        bounce: 0,
      }}
    >
      <IconStyled
        as={icon}
        marginLeft={marginLeft}
        marginRight={marginRight}
        color={colorLight ? theme.textLight : theme.text}
      />
    </motion.div>
  );
};

const IconStyled = styled.div<{
  marginLeft: boolean;
  marginRight: boolean;
}>`
  background-color: transparent;
  width: 24px;
  height: 24px;
  margin-left: ${({ marginLeft }) => (marginLeft ? "10px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "10px" : "0")};
`;

export default withTheme(Icon);
