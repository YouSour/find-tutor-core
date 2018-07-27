import { Notification } from "element-ui";

const Notify = {
  success({ message, title }) {
    message = message || "Your transaction is success";
    title = title || "Success";
    Notification({
      type: "success",
      position: "bottom-right",
      title,
      message
    });
  },
  warning({ message, title }) {
    message = message || "Warning message";
    title = title || "Warning";

    Notification({
      type: "warning",
      position: "bottom-right",
      title,
      message
    });
  },
  info({ message, title }) {
    message = message || "Info message";
    title = title || "Info";

    Notification({
      type: "info",
      position: "bottom-right",
      title,
      message
    });
  },
  error({ message, title }) {
    message = message || "Your transaction is error";
    title = title || "Error";

    Notification({
      type: "error",
      position: "bottom-right",
      title,
      message
    });
  }
};

export default Notify;
