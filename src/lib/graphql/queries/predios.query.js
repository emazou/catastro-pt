import { gql } from 'graphql-tag';

export const GET_PREDIOS = gql`
  query getPredios {
    predios {
      id
      nombre
      avaluo
      municipio
      departamento
    }
  }
`;
export const GET_PREDIO = gql`
  query getPredio($id: uuid) {
    predios(where:{id:{_eq: $id}}) {
      id
      nombre
      avaluo
      municipio
      departamento
    }
  }
`;
