import { toast } from 'react-toastify';

export const toastHandler = (type, message) => {
  switch (type) {
    case "success":
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "warning":
      toast.warning(`${message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "update":
      toast.update(`${message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    default:
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
  }
  toast.clearWaitingQueue();
}