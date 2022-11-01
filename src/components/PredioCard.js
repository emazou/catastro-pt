import React from 'react'
import Link from 'next/link'
export default function PredioCard({ avaluo, nombre, departamento, municipio, id }) {
    return (
        <div>
            <h2>{nombre}</h2>
            <h3>{avaluo}</h3>
            <p>{departamento}</p>
            <p>{municipio}</p>
            <Link href={`/predios/${id}`}>Ver detalles del predio</Link>
        </div>
    )
}
