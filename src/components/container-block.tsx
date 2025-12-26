"use client";

import { ComponentConfig } from "@measured/puck";
import {
  CommonStylingProps,
  getCommonStylingFields,
  applyCommonStyles,
} from "../lib/styling-fields";

export interface ContainerBlockProps extends CommonStylingProps {
  content?: React.ComponentType;
}

export const ContainerBlock: ComponentConfig<ContainerBlockProps> = {
  fields: {
    ...getCommonStylingFields(),
    content: {
      type: "slot",
      label: "Content",
    },
  },
  defaultProps: {},
  render: ({ content: Content, ...stylingProps }) => {
    const styles = applyCommonStyles(stylingProps);

    if (!Content) {
      return <div style={styles} />;
    }

    return (
      <div style={styles}>
        <Content />
      </div>
    );
  },
};

