import { Grid, Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { Sider } from "./Sider";

const { useBreakpoint } = Grid;

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const { lg } = useBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        {lg && <Sider />}
        <Content children={children} />
      </Layout>
    </Layout>
  );
};
