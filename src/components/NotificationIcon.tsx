import { Icon } from "@iconify/react";
import { UserNotificationInterface } from "@/utils/types";

export const NotificationIcon = (type: UserNotificationInterface["type"]) => {
  switch (type) {
    case "Success":
      return (
        <Icon
          icon="icon-park-solid:success"
          className="text-green-500 text-2xl"
        />
      );
    case "Warning":
      return <Icon icon="bxs:error" className="text-yellow-500 text-2xl" />;
    case "Error":
      return (
        <Icon
          icon="tabler:alert-circle-filled"
          className="text-red-500 text-2xl"
        />
      );
    case "Info":
      return <Icon icon="mdi:information" className="text-blue-500 text-2xl" />;
    default:
      return null;
  }
};
