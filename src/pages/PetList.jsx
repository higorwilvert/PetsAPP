import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PETS } from '../api/queries'
import '../styles/PetList.css'

function PetList() {
    const { loading, error, data } = useQuery(GET_PETS)

    return (
        <>
            <Link to='/add'>
                <button>Novo Pet</button>
            </Link>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div className="pet-grid">
                {data?.pets?.map(pet => {
                    return (
                        <div className="pet-card" key={pet?.id}>
                            <p>
                                <b>Nome:</b> {pet?.name}
                            </p>
                            <p>
                                <b>Tipo:</b> {pet?.type}
                            </p>
                            <p>
                                <b>Raça:</b> {pet?.breed}
                            </p>

                            <Link to={`/${pet?.id}`}>
                                <button>Detales do Pet</button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PetList
