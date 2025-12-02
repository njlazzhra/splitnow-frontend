import Swal from 'sweetalert2'

export const alertSuccess = async (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'success',
        text: message,
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'error',
        text: message,
    })
}

export const alertConfirm = async (message) => {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: message,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    return result.isConfirmed;
}