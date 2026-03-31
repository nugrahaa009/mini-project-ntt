import Cookies from "js-cookie";
import { useState } from "react";
import { menuItems } from "../../constants/menu";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { getDropdownItems } from "../../constants/dropdown";
import {
  Col,
  Image,
  Layout,
  Row,
  Dropdown,
  Avatar,
  Typography,
  Space,
  Modal,
  Grid,
  Drawer,
  Menu,
  Button,
} from "antd";

const { Text } = Typography;

const { useBreakpoint } = Grid;

export const Header = () => {
  const { lg } = useBreakpoint();

  const navigate = useNavigate();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const userCookie = Cookies.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
        navigate("/login", { replace: true });
      },
    });
  };

  const dropdownItems = getDropdownItems(user, handleLogout);

  return (
    <>
      <Layout.Header
        style={{
          padding: "0 16px",
          background: "#001529",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Image
                alt="logo"
                height={32}
                loading="lazy"
                src="/logo.svg"
                preview={false}
              />
            </Space>
          </Col>

          {lg && (
            <Col>
              <Dropdown menu={{ items: dropdownItems }}>
                <Space style={{ cursor: "pointer" }}>
                  <Avatar
                    src={
                      <Image
                        alt="image"
                        loading="lazy"
                        preview={false}
                        src={user.image}
                      />
                    }
                  />
                  <Text style={{ color: "#fff" }}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                </Space>
              </Dropdown>
            </Col>
          )}

          {!lg && (
            <MenuOutlined
              onClick={() => setOpen(true)}
              style={{ fontSize: 20, color: "#fff" }}
            />
          )}
        </Row>
      </Layout.Header>

      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu
          mode="inline"
          items={menuItems}
          style={{ borderRight: "none" }}
          selectedKeys={[
            location.pathname.startsWith("/products") ? "/products" : "/",
          ]}
          onClick={({ key }) => {
            navigate(key);
            setOpen(false);
          }}
        />

        {/* Logout */}

        <Button
          type="primary"
          block
          onClick={handleLogout}
          style={{ marginTop: 16 }}
        >
          Logout
        </Button>
      </Drawer>
    </>
  );
};
