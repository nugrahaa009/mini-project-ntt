import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import type { ProductItem } from "../types/product";
import { FormProduct } from "../components/Form/FormProduct";
import { getProductColumns } from "../constants/productColumns";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { DescriptionProduct } from "../components/Description/DescriptionProduct";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../features/product/productApi";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  message,
  Modal,
  Row,
  Table,
} from "antd";

const { useBreakpoint } = Grid;

export const Product = () => {
  const [form] = Form.useForm();

  const { lg } = useBreakpoint();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const page = Number(searchParams.get("page") || 1);

  const pageSize = Number(searchParams.get("limit") || 10);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);

  const [editing, setEditing] = useState<ProductItem | null>(null);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [debouncedSearch] = useDebounce(search, 800);

  const { data, isLoading } = useGetProductsQuery({
    limit: pageSize,
    search: debouncedSearch,
    skip: (page - 1) * pageSize,
  });

  const [addProduct] = useAddProductMutation();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const handleSearch = (value: string) => {
    setSearchParams({ search: value, page: "1" });
  };

  const handlePageChange = (p: number) => {
    setSearchParams({ search, page: String(p) });
  };

  const handleOpenEdit = (record?: ProductItem) => {
    setEditing(record || null);
    setOpenEdit(true);

    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOpenDetail = (record: ProductItem) => {
    setSelectedId(record.id);
    setOpenDetail(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await updateProduct({ id: editing.id, ...values }).unwrap();
        setSearchParams({ search: "", page: "1" });
        message.success("Product updated");
      } else {
        await addProduct(values).unwrap();
        setSearchParams({ search: "", page: "1" });
        message.success("Product added");
      }
      setOpenEdit(false);
    } catch {
      message.error("Failed");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    message.success("Product deleted");
  };

  const columns = getProductColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
    onDetail: handleOpenDetail,
  });

  return (
    <>
      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <Card title="Product Management" style={{ borderRadius: 12 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Input
                  value={search}
                  prefix={<SearchOutlined />}
                  allowClear
                  placeholder="Search product"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Flex justify={lg ? "flex-end" : "flex-start"} align="center">
                  <Button
                    block={!lg}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenEdit()}
                  >
                    Add Product
                  </Button>
                </Flex>
              </Col>
              <Col span={24}>
                <Table
                  rowKey="id"
                  size="small"
                  columns={columns}
                  loading={isLoading}
                  scroll={{ x: 1000 }}
                  dataSource={data?.products || []}
                  pagination={{
                    current: page,
                    pageSize,
                    total: data?.total,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {openEdit && (
        <Modal
          open={openEdit}
          onOk={handleSubmit}
          width={lg ? 1000 : "100%"}
          onCancel={() => setOpenEdit(false)}
          title={editing ? "Edit Product" : "Add Product"}
          okText={editing ? "Update" : "Add"}
          styles={{
            body: {
              maxHeight: "70vh",
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: 12,
            },
          }}
        >
          <FormProduct form={form} />
        </Modal>
      )}
      {openDetail && (
        <Modal
          footer={null}
          open={openDetail}
          title="Product Detail"
          width={lg ? 1000 : "100%"}
          onCancel={() => setOpenDetail(false)}
          styles={{
            body: {
              maxHeight: "70vh",
              overflowY: "auto",
              overflowX: "hidden",
            },
          }}
        >
          <DescriptionProduct selectedId={selectedId!} />
        </Modal>
      )}
    </>
  );
};
