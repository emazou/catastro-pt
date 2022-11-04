import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET
}
export const propietariosAPI = createApi({
  reducerPath: 'propietariosAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_API
  }),
  tagTypes: ['propietarios', 'propietario'],
  endpoints: (builder) => ({
    getPropietarios: builder.query({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { idPredio: id },
          query: `
                    query getPropietarios($idPredio: uuid!) {
                        propietarios(where:{idpredio:{_eq:$idPredio}}) {
                          id
                          nombres
                          apellidos
                          tipopersona
                          tipodocumento
                          nodocumento
                          nit
                          razonsocial
                          direccion
                          telefono
                          email
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      providesTags: ['propietarios'],
    }),
    getPropietario: builder.query({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    query getpropietario($id: uuid!) {
                        propietarios(where:{id:{_eq: $id}}) {
                            tipopersona
                            nombres
                            apellidos
                            email
                            tipodocumento
                            nodocumento
                            nit
                            razonsocial
                            telefono
                            direccion
                            idpredio
                        }
                      }
                    `
        }),
        headers: {...headers}
      }),
      providesTags: ['propietario'],
    }),
    addPropietario: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation addpropietario(
                        $tipopersona: String!
                        $nombres: String!
                        $apellidos: String!
                        $email: String!
                        $tipodocumento: String!
                        $nodocumento: bigint!
                        $nit: bigint!
                        $razonsocial: String!
                        $telefono: bigint!
                        $direccion: String!
                        $idpredio: uuid!
                      ){
                        insert_propietarios(
                            objects:[{
                                tipopersona: $tipopersona,
                                nombres: $nombres,
                                apellidos: $apellidos,
                                email: $email,
                                tipodocumento: $tipodocumento,
                                nodocumento: $nodocumento,
                                nit: $nit,
                                razonsocial: $razonsocial,
                                telefono: $telefono,
                                direccion: $direccion,
                                idpredio: $idpredio
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
      invalidatesTags: ['propietarios'],
    }),
    editPropietario: builder.mutation({
      query: (variables) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { ...variables },
          query: `
                    mutation updatepropietario(
                        $id: uuid!
                        $nombres: String!
                        $apellidos: String!
                        $razonsocial: String!
                        $nodocumento: bigint!
                        $direccion: String!
                        $nit: bigint!
                        $email: String!
                        $telefono: bigint!
                      ){
                        update_propietarios(
                          where:{
                            id:{_eq: $id}
                          },
                          _set:{
                            nombres: $nombres,
                            apellidos: $apellidos,
                            razonsocial: $razonsocial,
                            nodocumento: $nodocumento,
                            direccion: $direccion,
                            nit: $nit,
                            email: $email,
                            telefono: $telefono
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
      invalidatesTags: ['propietario'],
    }),
    deletePropietario: builder.mutation({
      query: (id) => ({
        method: 'POST',
        body: JSON.stringify({
          variables: { id: id },
          query: `
                    mutation deletePropietario($id: uuid!) {
                        delete_propietarios(where: { id: { _eq: $id } }) {
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

export default propietariosAPI;
export const { useGetPropietariosQuery, useGetPropietarioQuery, useAddPropietarioMutation, useEditPropietarioMutation, useDeletePropietarioMutation } = propietariosAPI;