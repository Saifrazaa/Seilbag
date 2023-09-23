import { FC } from "react";
import { View, ViewProps } from "react-native";

interface BoxProps extends ViewProps {
  row?: boolean;
  reversed?: boolean;
  centered?: boolean;
  justified?: boolean;
  justifiedEnd?: boolean;
  spaced?: boolean;
  end?: boolean;
}

export const Box: FC<BoxProps> = ({
  children,
  row,
  reversed,
  centered,
  justified,
  justifiedEnd,
  spaced,
  end,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flexDirection: row
            ? reversed
              ? "row-reverse"
              : "row"
            : reversed
            ? "column-reverse"
            : "column",
          alignItems: centered ? "center" : end ? "flex-end" : "flex-start",
          justifyContent: justified
            ? "center"
            : spaced
            ? "space-between"
            : justifiedEnd
            ? "flex-end"
            : "flex-start",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
