import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET
}
export const construccionesAPI = createApi({
  reducerPath: 'construccionesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_API
  }),
  tagTypes: ['Construcciones', 'Predio'],
  endpoints: (builder) => ({
    getConstrucciones: builder.query({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { idPredio: id },
          query: `
                    query getConstrucciones($idPredio: uuid!) {
                        construcciones(where:{idpredio:{_eq:$idPredio}}) {
                          id
                          numeropisos
                          area
                          tipoconstruccion
                          direccion
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      providesTags: ['Construcciones'],
    }),
    getConstruccion: builder.query({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    query getConstuccion($id: uuid!) {
                        construcciones(where:{id:{_eq: $id}}) {
                          id
                          numeropisos
                          area
                          tipoconstruccion
                          direccion
                          idpredio
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      providesTags: ['Predio'],
    }),
    addConstruccion: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation addConstruccion(
                        $numeropisos: Int!
                        $area: numeric!
                        $tipoconstruccion: String!
                        $direccion: String!
                        $idpredio: uuid!
                      ){
                        insert_construcciones(
                            objects:[{
                              numeropisos: $numeropisos,
                              area: $area,
                              tipoconstruccion: $tipoconstruccion,
                              direccion: $direccion,
                              idpredio: $idpredio,
                            }]
                        ){
                          returning{
                            id
                          }
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      invalidatesTags: ['Construcciones'],
    }),
    editConstruccion: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation updateConstruccion(
                        $numeropisos: Int!
                        $area: numeric!
                        $tipoconstruccion: String!
                        $direccion: String!
                        $id: uuid!
                      ){
                        update_construcciones(
                          where:{
                            id:{_eq: $id}
                          },
                          _set:{
                              numeropisos: $numeropisos,
                              area: $area,
                              tipoconstruccion: $tipoconstruccion,
                              direccion: $direccion,
                          }
                        ){
                          returning{
                            id
                          }
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      invalidatesTags: ['Predio'],
    }),
    deleteConstruccion: builder.mutation({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    mutation deleteConstruccion($id: uuid!) {
                        delete_construcciones(where: { id: { _eq: $id } }) {
                          returning{
                            id
                          }
                        }
                      }
                    `
        }),
        headers: {...headers}
      })
    })
  })
})

export default construccionesAPI;
export const { useGetConstruccionesQuery, useGetConstruccionQuery, useAddConstruccionMutation, useEditConstruccionMutation, useDeleteConstruccionMutation } = construccionesAPI;