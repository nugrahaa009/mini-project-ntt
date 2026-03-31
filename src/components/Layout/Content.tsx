import { Grid, Layout } from "antd";

const { useBreakpoint } = Grid;

export const Content = ({ children }: React.PropsWithChildren) => {
  const { lg } = useBreakpoint();

  return (
    <Layout.Content style={{ padding: lg ? 24 : 8 }}>{children}</Layout.Content>
  );
};
