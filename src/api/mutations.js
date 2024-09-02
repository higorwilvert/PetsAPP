import { gql } from '@apollo/client'

export const DELETE_PET = gql`
    mutation DeletePet($deletePetId: ID!) {
        deletePet(id: $deletePetId) {
            id
        }
    }
`

export const ADD_PET = gql`
    mutation AddPet($petToAdd: PetToAdd!) {
        addPet(petToAdd: $petToAdd) {
            id
            name
            type
            age
            breed
        }
    }
`

export const EDIT_PET = gql`
    mutation EditPet($petToEdit: PetToEdit!) {
        editPet(petToEdit: $petToEdit) {
            id
            name
            type
            age
            breed
        }
    }
`