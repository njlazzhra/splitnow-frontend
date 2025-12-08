import Swal from 'sweetalert2'

export const alertSuccess = async (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        background: '#FFEBD3',
        color: '#226B80',
        confirmButtonColor: '#226B80',
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
        background: '#FFEBD3',
        color: '#226B80',
        confirmButtonColor: '#da373d',
    })
}

export const alertConfirm = async (message) => {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: message,
        background: '#FFEBD3',
        color: '#226B80',

        showCancelButton: true,
        confirmButtonColor: '#226B80',
        cancelButtonColor: '#da373d',

        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
    })
    return result.isConfirmed;
}
