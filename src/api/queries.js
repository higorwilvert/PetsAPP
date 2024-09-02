import { gql } from '@apollo/client'

export const GET_PETS = gql`
    query Pets {
        pets {
            id
            name
            type
            breed
        }
    }
`

export const GET_PET = gql`
    query Pet($petId: ID!) {
        pet(id: $petId) {
            id
            name
            type
            age
            breed
        }
    }
`