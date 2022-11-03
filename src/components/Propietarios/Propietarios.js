import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPIETARIOS } from 'lib/graphql/queries/propietarios.query';
import Propietario from '@components/Propietarios/Propietario';
export default function Propietarios({ id }) {
    const { data } = useQuery(GET_PROPIETARIOS,
        {
            variables: { idPredio: id }
        })
    console.log(data)
    return (
        <>
            {
                data && <h2>Propietarios</h2>
            }
            {
                (data && data.propietarios.length === 0) &&  <p>Este predio no tiene propietarios</p>
            }
            {
                data && data?.propietarios.map((item) => (
                    <Propietario
                        key={item.id}
                        id={item.id}
                        nombres={item.nombres}
                        apellidos={item.apellidos}
                        tipoPersona={item.tipopersona}
                        email={item.email}
                        nit={item.nit}
                        nodocumento={item.nodocumento}
                        tipodocumento={item.tipodocumento}
                        razonsocial={item.razonsocial}
                    />
                ))
            }
        </>
    )
}
