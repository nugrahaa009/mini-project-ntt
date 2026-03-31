import { Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Text } = Typography;

type User = {
  firstName?: string;
  lastName?: string;
};

export const getDropdownItems = (user: User, handleLogout: () => void) => [
  {
    key: "user",
    label: (
      <Text strong>
        {user?.firstName} {user?.lastName}
      </Text>
    ),
  },
  {
    type: "divider" as const,
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: handleLogout,
  },
];
