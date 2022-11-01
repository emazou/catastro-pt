import { gql } from 'graphql-tag';

export const getPredios = gql`
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
export const getPredio = gql`
  query getPredios($id: uuid) {
    predios(where:{id:{_eq: $id}}) {
      id
      nombre
      avaluo
      municipio
      departamento
    }
  }
`;
