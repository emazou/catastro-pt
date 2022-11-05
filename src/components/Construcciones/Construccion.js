import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
export default function Construccion({ id, area, numeropisos, tipoconstruccion, direccion, idpredio }) {
    return (
        <div className='flex-row construccion-container width-100'>
            <div className='item'>
                <p className='fw'>Tipo de construcción</p>
                <p>{tipoconstruccion}</p>
            </div>
            <div className='item'>
                <p className='fw'>Número de pisos</p>
                <p>{numeropisos}</p>
            </div>
            <div className='item'>
                <p className='fw'>Área total</p>
                <p>{area} m<sup>2</sup></p>
            </div>
            <div className='item'>
                <p className='fw'>Dirección</p>
                <p>{direccion}</p>
            </div>
            {
                idpredio && (
                    <div>
                        <Link href={`/construcciones/${id}`} className='link-detail'>Ver detalles <ArrowRightOutlined /></Link>
                    </div>
                )

            }

        </div>
    )
}
