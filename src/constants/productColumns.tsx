import { Button, Image, Popconfirm, Rate, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ProductItem } from "../types/product";

interface Props {
  onEdit: (record: ProductItem) => void;
  onDelete: (id: number) => void;
  onDetail: (record: ProductItem) => void;
}

export const getProductColumns = ({
  onEdit,
  onDelete,
  onDetail,
}: Props): ColumnsType<ProductItem> => [
  {
    title: "Product",
    key: "product",
    render: (_, record) => (
      <Space>
        <Image
          src={record.thumbnail}
          width={40}
          height={40}
          style={{ borderRadius: 8, objectFit: "cover" }}
          fallback="https://via.placeholder.com/40"
        />
        <div>
          <div style={{ fontWeight: 500 }}>{record.title}</div>
          <div style={{ fontSize: 12, color: "#999" }}>
            {record.brand} • {record.category}
          </div>
        </div>
      </Space>
    ),
  },

  {
    title: "Price",
    dataIndex: "price",
    render: (price: number, record) => (
      <div>
        <div>${price}</div>
        {record.discountPercentage > 0 && (
          <Tag color="red">-{record.discountPercentage}%</Tag>
        )}
      </div>
    ),
  },

  {
    title: "Stock",
    dataIndex: "stock",
    render: (stock: number) => {
      let color = "green";
      if (stock < 10) color = "red";
      else if (stock < 50) color = "orange";

      return <Tag color={color}>{stock}</Tag>;
    },
  },

  {
    title: "Rating",
    dataIndex: "rating",
    render: (rating: number) => (
      <Rate disabled allowHalf defaultValue={rating} />
    ),
  },

  {
    title: "Status",
    dataIndex: "availabilityStatus",
    render: (status: string) => {
      const color =
        status === "In Stock"
          ? "green"
          : status === "Low Stock"
            ? "orange"
            : "red";

      return <Tag color={color}>{status}</Tag>;
    },
  },

  {
    title: "Tags",
    dataIndex: "tags",
    render: (tags: string[]) => (
      <Space wrap>
        {tags?.slice(0, 2).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space>
    ),
  },

  {
    title: "",
    align: "end",
    render: (_, record) => (
      <Space>
        <Button type="primary" size="small" onClick={() => onDetail(record)}>
          Detail
        </Button>

        <Button size="small" onClick={() => onEdit(record)}>
          Edit
        </Button>

        <Popconfirm
          title="Delete product?"
          onConfirm={() => onDelete(record.id)}
        >
          <Button size="small" danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
