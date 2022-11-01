import React from 'react';
import { useRouter } from 'next/router';
import { getPredio } from 'lib/graphql/queries/predios.query';
import { useQuery } from '@apollo/client';
export default function PredioPage() {
    const router = useRouter()
    const { id } = router.query
    const { loading, error, data } = useQuery(getPredio, {
        variables: { id: id }
    })
    const predio = data?.predios[0]
    return (
        <div className='container'>

            {id}

        </div>
    )
}
