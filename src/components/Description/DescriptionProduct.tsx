import { useGetProductQuery } from "../../features/product/productApi";
import {
  Col,
  Descriptions,
  Divider,
  Image,
  List,
  Rate,
  Row,
  Skeleton,
  Tag,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

interface DescriptionProductProps {
  selectedId: number;
}

export const DescriptionProduct = (props: DescriptionProductProps) => {
  const { selectedId } = props;

  const { data, isFetching } = useGetProductQuery(selectedId!, {
    skip: !selectedId,
  });

  if (isFetching) {
    return <Skeleton active />;
  }
  return (
    <Row gutter={[24, 24]}>
      {/* IMAGE */}
      <Col xs={24} md={10}>
        <Image
          src={data?.thumbnail}
          style={{ borderRadius: 8 }}
          preview={{
            src: data?.images?.[0],
          }}
        />
      </Col>

      {/* INFO */}
      <Col xs={24} md={14}>
        <Title level={4}>{data?.title}</Title>

        <Paragraph type="secondary">{data?.description}</Paragraph>

        <Row gutter={[8, 8]} style={{ marginBottom: 12 }}>
          {data?.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Row>

        <Row align="middle" gutter={8}>
          <Col>
            <Rate disabled defaultValue={data?.rating} allowHalf />
          </Col>
          <Col>
            <Text type="secondary">({data?.rating})</Text>
          </Col>
        </Row>

        <Divider />

        <Descriptions column={1} size="small">
          <Descriptions.Item label="Price">${data?.price}</Descriptions.Item>

          <Descriptions.Item label="Stock">{data?.stock}</Descriptions.Item>

          <Descriptions.Item label="Brand">{data?.brand}</Descriptions.Item>

          <Descriptions.Item label="Category">
            {data?.category}
          </Descriptions.Item>

          <Descriptions.Item label="SKU">{data?.sku}</Descriptions.Item>

          <Descriptions.Item label="Availability">
            <Tag color="green">{data?.availabilityStatus}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Col>

      {/* EXTRA */}
      <Col span={24}>
        <Divider titlePlacement="left">Additional Info</Divider>

        <Descriptions column={2} size="small">
          <Descriptions.Item label="Weight">
            {data?.weight} kg
          </Descriptions.Item>

          <Descriptions.Item label="Warranty">
            {data?.warrantyInformation}
          </Descriptions.Item>

          <Descriptions.Item label="Shipping">
            {data?.shippingInformation}
          </Descriptions.Item>

          <Descriptions.Item label="Return Policy">
            {data?.returnPolicy}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      {/* REVIEWS */}
      <Col span={24}>
        <Divider titlePlacement="left">Reviews</Divider>

        <List
          dataSource={data?.reviews}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    {item?.reviewerName}{" "}
                    <Rate disabled defaultValue={item.rating} />
                  </>
                }
                description={item?.comment}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
