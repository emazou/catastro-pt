import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const construccionesAPI = createApi({
  reducerPath: 'construccionesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://catastro-pt.hasura.app/v1/graphql'
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
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
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
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
      }),
      providesTags: ['Predio'],
    }),
    addConstruccion: builder.mutation({
      query: ({ numeropisos, area, tipoconstruccion, direccion, idpredio }) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { numeropisos: numeropisos, area: area, tipoconstruccion: tipoconstruccion, direccion: direccion, idpredio: idpredio },
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
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
      }),
      invalidatesTags: ['Construcciones'],
    }),
    editConstruccion: builder.mutation({
      query: ({ numeropisos, area, tipoconstruccion, direccion, id }) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id, numeropisos: numeropisos, area: area, tipoconstruccion: tipoconstruccion, direccion: direccion },
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
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
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
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
        }
      })
    })
  })
})

export default construccionesAPI;
export const { useGetConstruccionesQuery, useGetConstruccionQuery, useAddConstruccionMutation, useEditConstruccionMutation, useDeleteConstruccionMutation } = construccionesAPI;