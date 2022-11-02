import { gql } from 'graphql-tag';

export const DELETE_PREDIO = gql`
  mutation deletePredio($id: bigint!) {
    delete_predios(where: { id: { _eq: $id } }) {
      returning{
        id
        nombre
      }
    }
  }
`;

export const ADD_PPREDIO = gql`
  mutation addPredio(
    $id: bigint!
    $nombre: String!
    $municipio: String!
    $departamento: String!
    $avaluo: numeric!
  ){
    insert_predios(
        objects:[{
            id:$id,
            nombre:$nombre,
            municipio:$municipio,
            departamento:$departamento,
            avaluo:$avaluo,
        }]
    ){
      returning{
        id
        nombre
        avaluo
        municipio
        departamento
      }
    }
  }
`