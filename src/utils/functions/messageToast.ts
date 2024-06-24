import { Bounce, toast } from 'react-toastify'

export const displayWarning = async (message: string) => {
  toast.warn(message, {
    position: 'top-right',
    autoClose: 800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: Bounce,
    style: {
      color: 'black',
    },
  })
}

export const displaySuccess = async (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 1600,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: Bounce,
    style: {
      color: 'black',
    },
  })
}

export const displayError = async (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 1800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: Bounce,
    style: {
      color: 'black',
    },
  })
}
