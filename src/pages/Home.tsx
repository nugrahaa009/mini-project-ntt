import { useGetMeQuery } from "../features/auth/authApi";
import {
  Card,
  Col,
  Row,
  Typography,
  Skeleton,
  Avatar,
  Space,
  Image,
} from "antd";

const { Title, Text } = Typography;

export const Home = () => {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Row>
      <Col span={24}>
        <Card
          style={{
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <Space size="large" align="center">
            <Avatar
              size={64}
              src={
                <Image
                  alt="image"
                  loading="lazy"
                  preview={false}
                  src={data.image}
                />
              }
            />
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                Welcome back
              </Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                {data?.firstName} {data?.lastName}
              </Text>
            </div>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
