import { Layout, Menu } from "antd";
import { menuItems } from "../../constants/menu";
import { useLocation, useNavigate } from "react-router-dom";

export const Sider = () => {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[
          location.pathname.startsWith("/products") ? "/products" : "/",
        ]}
        onClick={({ key }) => navigate(key)}
        style={{ height: "100%" }}
      />
    </Layout.Sider>
  );
};
