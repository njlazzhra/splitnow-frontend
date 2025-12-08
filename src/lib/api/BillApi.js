export const CreateKegiatan = async (token, name, event_date, location, taxPercentage) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token

        },
        body: JSON.stringify({
            name,
            event_date,
            location,
            taxPercentage,
        })
    });
};

export const addParticipant = async (token, kegiatanId, name) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan/${kegiatanId}/participant`,{
        method : "POST",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            name
        })

    })
}

export const ParticipantList = async (token, kegiatanId) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan/${kegiatanId}/participants`,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': token
        }
    })
}

export const createItem = async (token, kegiatanId, particpantId,item_name, amount, cost) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan/${kegiatanId}/participant/${particpantId}/item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            item_name,
            amount,
            cost,
        })
    });

}

export const itemList = async (token, kegiatanId, participantId) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan/${kegiatanId}/participant/${participantId}/items`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    });
}

export const summaryBill = async (token, kegiatanId) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/kegiatan/${kegiatanId}/summary`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    });
}