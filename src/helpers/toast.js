import { toast } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.minimal.css';

const optionToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export default {
  // Keep the signature of the original toast object
  // Doing so you can pass additionnal options
  success(msg, options = optionToast) {
    return toast.success(msg, {
      // Merge additionals options
      ...options,
      className: {
        color: '#343a40',
        minHeight: '60px',
        borderRadius: '8px',
        background: '#2FEDAD',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      progressClassName: css({
        background: '#007aff'
      })
    });
  },
  error(msg, options = optionToast) {
    return toast.error(msg, {
      ...options,
      className: {
        color: '#fff',
        minHeight: '60px',
        borderRadius: '8px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      progressClassName: css({
        background: '#007aff'
      })
    });
  }
}
