import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { useLoginMutation } from "../features/auth/authApi";
import {
  Button,
  Card,
  Col,
  Form,
  Grid,
  Input,
  message,
  Row,
  Typography,
  Space,
  Flex,
} from "antd";

const { Title, Text } = Typography;

const { useBreakpoint } = Grid;

export default function Login() {
  const { lg } = useBreakpoint();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const res = await login(values).unwrap();

      Cookies.set("token", res.accessToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refreshToken", res.refreshToken, {
        expires: 7,
      });

      Cookies.set("user", JSON.stringify(res), {
        expires: 1,
      });

      message.success("Login success");
      navigate("/");
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  return (
    <Row
      align="middle"
      style={{
        minHeight: "100vh",
        padding: 16,
        background: "#f5f7fa",
      }}
    >
      <Col span={24}>
        <Flex justify="center">
          <Card
            variant="borderless"
            style={{
              width: lg ? 500 : "100%",
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Space
              orientation="vertical"
              size="middle"
              style={{ width: "100%" }}
            >
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  Welcome
                </Title>
                <Text type="secondary">Please login to your account</Text>
              </div>

              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="username"
                  label="Username"
                  initialValue="emilys"
                  rules={[{ required: true, message: "Please input username" }]}
                >
                  <Input placeholder="Enter username" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  initialValue="emilyspass"
                  rules={[{ required: true, message: "Please input password" }]}
                >
                  <Input.Password placeholder="Enter password" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Flex>
      </Col>
    </Row>
  );
}
