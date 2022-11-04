import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET
}
export const terrenosAPI = createApi({
    reducerPath: 'terrenosAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL_API
    }),
    tagTypes: ['Terrenos'],
    endpoints: (builder) => ({
        getTerreno: builder.query({
            query: (id) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: { idPredio: id },
                    query: `
                    query getTerrenos($idPredio: uuid!) {
                        terrenos(where:{idpredio:{_eq:$idPredio}}) {
                          id
                          area
                          valorcomercial
                          fuentesagua
                          construcciones
                          tipoterreno
                        }
                      }
                    `
                }),
                headers: { ...headers }
            }),
            providesTags: ['Terrenos'],
        }),
        addTerreno: builder.mutation({
            query: (variables) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: { ...variables },
                    query: `
                    mutation addTerrenos(
                        $idpredio: uuid!
                        $area: numeric!
                        $valorcomercial: numeric!
                        $fuentesagua: Boolean!
                        $construcciones: Boolean!
                        $tipoterreno: String!
                      ){
                        insert_terrenos(
                            objects:[{
                                idpredio:$idpredio,
                                area: $area,
                                valorcomercial: $valorcomercial,
                                fuentesagua: $fuentesagua,
                                construcciones: $construcciones,
                                tipoterreno: $tipoterreno
                            }]
                        ){
                          returning{
                            id
                          }
                        }
                      }
                    `
                }),
                headers: { ...headers }
            }),
            invalidatesTags: ['Terrenos'],
        }),
        editTerreno: builder.mutation({
            query: (variables) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: { ...variables },
                    query: `
                    mutation updateTerreno(
                        $id: uuid!
                        $area: numeric!
                        $valorcomercial: numeric!
                        $fuentesagua: Boolean!
                        $construcciones: Boolean!
                        $tipoterreno: String!
                      ){
                        update_terrenos(
                          where:{
                            id:{_eq: $id}
                          },
                          _set:{
                            area:$area,
                            valorcomercial: $valorcomercial,
                            fuentesagua: $fuentesagua,
                            construcciones: $construcciones,
                            tipoterreno: $tipoterreno
                          }
                        ){
                          returning{
                            id
                          }
                        }
                      }
                    `
                }),
                headers: { ...headers }
            }),
            invalidatesTags: ['Terrenos'],
        }),
        deleteTerreno: builder.mutation({
            query: (id) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: { id: id },
                    query: `
                    mutation deleteTerreno($id: uuid!) {
                        delete_terrenos(where: { id: { _eq: $id } }) {
                          returning{
                            id
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

export default terrenosAPI;
export const { useGetTerrenoQuery, useAddTerrenoMutation, useDeleteTerrenoMutation, useEditTerrenoMutation } = terrenosAPI;