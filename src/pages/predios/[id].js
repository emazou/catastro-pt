import React from 'react';
import { useRouter } from 'next/router';
import { GET_PREDIO } from 'lib/graphql/queries/predios.query';
import { useQuery } from '@apollo/client';
export default function PredioPage() {
    const router = useRouter()
    const { id } = router.query
    const { loading, error, data } = useQuery(GET_PREDIO, {
        variables: { id: `${id}` }
    })
    const predio = data?.predios[0]
    console.log(data)
    return (
        <div className='container flex-column'>
            {
                loading && <div className="ping"></div>
            }
            {id}

        </div>
    )
}
