import React from 'react';
import { useQuery } from '@apollo/client';
import { getPredios } from '../lib/graphql/queries/predios.query'
import PredioCard from '@components/predioCard';


export default function properties() {

    const { loading, data } = useQuery(getPredios)
    return (
        <div className='container flex-row'>
            {
                loading && <div class="ping"></div>
            }
            {
                data && data.predios.map(predio => (
                    <PredioCard
                        key={predio.id}
                        id={predio.id}
                        nombre={predio.nombre}
                        avaluo={predio.avaluo}
                        departamento={predio.departamento}
                        municipio={predio.municipio} />
                ))
            }
        </div>
    )
}
