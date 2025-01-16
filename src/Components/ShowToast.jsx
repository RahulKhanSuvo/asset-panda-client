import Swal from "sweetalert2";

const showToast = (message, type = "success") => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export default showToast;
