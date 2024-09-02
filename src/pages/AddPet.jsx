import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_PET } from '../api/mutations'

function AddPet() {
    const [petName, setPetName] = useState()
    const [petType, setPetType] = useState()
    const [petAge, setPetAge] = useState()
    const [petBreed, setPetBreed] = useState()

    const [addPet, { loading, error, data }] = useMutation(ADD_PET, {
        variables: {
            petToAdd: {
                name: petName,
                type: petType,
                age: parseInt(petAge),
                breed: petBreed
            }
        }
    })

    useEffect(() => {
        if (data && data?.addPet) window.location.href = `/${data?.addPet?.id}`
    }, [data])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
            <h2>Add Pet</h2>

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
                        onClick={() => addPet()}
                    >
                        Add pet
                    </button>
                </>
            )}
        </div>
    )
}

export default AddPet