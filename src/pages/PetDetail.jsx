import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PET } from '../api/queries'
import { DELETE_PET } from '../api/mutations'

function PetDetail({ setPetToEdit }) {
    const { petId } = useParams()

    const { loading, error, data } = useQuery(GET_PET, {
        variables: { petId }
    })

    useEffect(() => {
        if (data && data?.pet) setPetToEdit(data?.pet)
    }, [data])

    const [deletePet, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(DELETE_PET, {
        variables: { deletePetId: petId }
    })

    useEffect(() => {
        if (deleteData && deleteData?.deletePet) window.location.href = '/'
    }, [deleteData])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
            <h2>Pet Detail</h2>

            <Link to='/'>
                <button>Back to list</button>
            </Link>

            {(loading || deleteLoading) && <p>Loading...</p>}

            {error && <p>Error: {error.message}</p>}
            {deleteError && <p>deleteError: {deleteError.message}</p>}

            {data?.pet && (
                <>
                    <p>Pet name: {data?.pet?.name}</p>
                    <p>Pet type: {data?.pet?.type}</p>
                    <p>Pet age: {data?.pet?.age}</p>
                    <p>Pet breed: {data?.pet?.breed}</p>

                    <div style={{ display: 'flex', justifyContent: 'center', aligniItems: 'center' }}>
                        <Link to={`/${data?.pet?.id}/edit`}>
                            <button style={{ marginRight: 10 }}>Edit pet</button>
                        </Link>

                        <button style={{ marginLeft: 10 }} onClick={() => deletePet()}>
                            Delete pet
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default PetDetail