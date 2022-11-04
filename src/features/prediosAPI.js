import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET
}
export const prediosAPI = createApi({
  reducerPath: 'prediosAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_API
  }),
  tagTypes: ['Predios', 'Predio'],
  endpoints: (builder) => ({
    getPredios: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({
          query: `
                    query getPredios {
                        predios {
                          id
                          nombre
                          avaluo
                          municipio
                          departamento
                          nopredial
                        }
                      }
                    `
        }),
        headers: { ...headers }
      }),
      providesTags: ['Predios'],
    }),
    getPredio: builder.query({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    query getPredio($id: uuid!) {
                        predios(where:{id:{_eq: $id}}) {
                          id
                          nombre
                          avaluo
                          municipio
                          departamento
                          nopredial
                        }
                      }
                    `
        }),
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
      }),
      providesTags: ['Predio'],
    }),
    addPredio: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation addPredio(
                        $noPredial: bigint!
                        $nombre: String!
                        $municipio: String!
                        $departamento: String!
                        $avaluo: numeric!
                      ){
                        insert_predios(
                            objects:[{
                                nopredial:$noPredial,
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
        }),
        headers: { ...headers }
      }),
      invalidatesTags: ['Predios'],
    }),
    editPredio: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation updatePredio(
                        $id: uuid!
                        $nombre: String!
                        $municipio: String!
                        $departamento: String!
                        $avaluo: numeric!
                        $noPredial: bigint!
                      ){
                        update_predios(
                          where:{
                            id:{_eq: $id}
                          },
                          _set:{
                            nopredial:$noPredial,
                            nombre:$nombre,
                            municipio:$municipio,
                            departamento:$departamento,
                            avaluo:$avaluo,
                          }
                        ){
                          returning{
                            id
                            nombre
                            avaluo
                            municipio
                            departamento
                            nopredial
                          }
                        }
                      }
                    `
        }),
        headers: { ...headers }
      }),
      invalidatesTags: ['Predio'],
    }),
    deletePredio: builder.mutation({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    mutation deletePredio($id: uuid!) {
                        delete_predios(where: { id: { _eq: $id } }) {
                          returning{
                            id
                            nombre
                          }
                        }
                      }
                    `
        }),
        headers: { ...headers }
      })
    })
  })
})

export default prediosAPI;
export const { useGetPrediosQuery, useGetPredioQuery, useAddPredioMutation, useEditPredioMutation, useDeletePredioMutation } = prediosAPI;