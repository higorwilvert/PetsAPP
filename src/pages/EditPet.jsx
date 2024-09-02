import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { EDIT_PET } from '../api/mutations'

function EditPet({ petToEdit }) {
    const [petName, setPetName] = useState(petToEdit?.name)
    const [petType, setPetType] = useState(petToEdit?.type)
    const [petAge, setPetAge] = useState(petToEdit?.age)
    const [petBreed, setPetBreed] = useState(petToEdit?.breed)

    const [editPet, { loading, error, data }] = useMutation(EDIT_PET, {
        variables: {
            petToEdit: {
                id: parseInt(petToEdit.id),
                name: petName,
                type: petType,
                age: parseInt(petAge),
                breed: petBreed
            }
        }
    })

    useEffect(() => {
        if (data && data?.editPet?.id) window.location.href = `/${data?.editPet?.id}`
    }, [data])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
            <h2>Edit Pet</h2>

            <Link to='/'>
                <button>Back to list</button>
            </Link>

            {loading || error ? (
                <>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                        <label>Pet name</label>
                        <input type='text' value={petName} onChange={e => setPetName(e.target.value)} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                        <label>Pet type</label>
                        <input type='text' value={petType} onChange={e => setPetType(e.target.value)} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                        <label>Pet age</label>
                        <input type='text' value={petAge} onChange={e => setPetAge(e.target.value)} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                        <label>Pet breed</label>
                        <input type='text' value={petBreed} onChange={e => setPetBreed(e.target.value)} />
                    </div>

                    <button
                        style={{ marginTop: 30 }}
                        disabled={!petName || !petType || !petAge || !petBreed}
                        onClick={() => editPet()}
                    >
                        Save changes
                    </button>
                </>
            )}
        </div>
    )
}

export default EditPet