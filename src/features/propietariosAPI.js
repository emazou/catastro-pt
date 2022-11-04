import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const propietariosAPI = createApi({
    reducerPath: 'propietariosAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://catastro-pt.hasura.app/v1/graphql'
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
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
                }
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
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
                }
            }),
            providesTags: ['propietario'],
        }),
        addPropietario: builder.mutation({
            query: ({ tipopersona, nombres, apellidos, email, tipodocumento, nodocumento, nit, razonsocial, telefono, direccion, idpredio }) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: {
                        tipopersona: tipopersona,
                        nombres: nombres,
                        apellidos: apellidos,
                        email: email,
                        tipodocumento: tipodocumento,
                        nodocumento: nodocumento,
                        nit: nit,
                        razonsocial: razonsocial,
                        telefono: telefono,
                        direccion: direccion,
                        idpredio:idpredio
                    },
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
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
                }
            }),
            invalidatesTags: ['propietarios'],
        }),
        editPropietario: builder.mutation({
            query: ({ id, nombre, municipio, departamento, avaluo, noPredial }) => ({
                method: 'POST',
                body: JSON.stringify({
                    variables: { id: id, noPredial: noPredial, nombre: nombre, municipio: municipio, departamento: departamento, avaluo: avaluo },
                    query: `
                    mutation updatepropietario(
                        $id: uuid!
                        $nombre: String!
                        $municipio: String!
                        $departamento: String!
                        $avaluo: numeric!
                        $noPredial: bigint!
                      ){
                        update_propietarios(
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
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
                }
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
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
                }
            })
        })
    })
})

export default propietariosAPI;
export const { useGetPropietariosQuery, useGetPropietarioQuery, useAddPropietarioMutation, useEditPropietarioMutation, useDeletePropietarioMutation } = propietariosAPI;