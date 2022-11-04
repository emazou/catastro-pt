import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
export default function Construccion({ id, area, numeropisos, tipoconstruccion, direccion, idpredio }) {
    return (
        <div className='flex-row construccion-container'>
            <div className='item-construccion'>
                <p className='fw'>Tipo de construcción</p>
                <p>{tipoconstruccion}</p>
            </div>
            <div className='item-construccion'>
                <p className='fw'>Número de pisos</p>
                <p>{numeropisos}</p>
            </div>
            <div className='item-construccion'>
                <p className='fw'>Área total</p>
                <p>{area} m<sup>2</sup></p>
            </div>
            <div className='item-construccion'>
                <p className='fw'>Dirección</p>
                <p>{direccion}</p>
            </div>
            {
                idpredio && (
                    <div>
                        <Link href={`/construcciones/${id}`}>Ver detalles <ArrowRightOutlined /></Link>
                    </div>
                )

            }

        </div>
    )
}
