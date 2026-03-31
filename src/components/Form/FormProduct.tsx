import type { FormInstance } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import type { ProductPayload } from "../../types/product";

interface FormProductProps {
  form: FormInstance<ProductPayload>;
}

export const FormProduct = ({ form }: FormProductProps) => {
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="title"
        label="Product Name"
        rules={[
          { required: true, message: "Title is required" },
          { min: 3, message: "Minimum 3 characters" },
        ]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ max: 500, message: "Max 500 characters" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Category is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true, message: "Brand is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
          { required: true, message: "Price is required" },
          {
            type: "number",
            min: 1,
            message: "Price must be greater than 0",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="discountPercentage"
        label="Discount (%)"
        rules={[
          {
            type: "number",
            min: 0,
            max: 100,
            message: "Discount must be between 0-100",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[
          { required: true, message: "Stock is required" },
          {
            type: "number",
            min: 0,
            message: "Stock cannot be negative",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="sku"
        label="SKU"
        rules={[{ required: true, message: "SKU is required" }, { min: 3 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="weight"
        label="Weight (kg)"
        rules={[
          {
            type: "number",
            min: 0,
            message: "Weight must be >= 0",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="availabilityStatus"
        label="Availability"
        rules={[{ required: true, message: "Status is required" }]}
      >
        <Select
          options={[
            { label: "In Stock", value: "In Stock" },
            { label: "Low Stock", value: "Low Stock" },
            { label: "Out of Stock", value: "Out of Stock" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
