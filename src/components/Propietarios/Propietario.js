import React from 'react';
import Link from 'next/link';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
export default function Propietario({ id, nombres, apellidos, tipoPersona, email, nodocumento, nit, tipodocumento, razonsocial, fn }) {
    return (
        <div className='propietario width-100'>
            <Avatar icon={<UserOutlined />} />
            <div>
                {
                    razonsocial ? <p className='fw'>{razonsocial}</p> : <p className='fw'>{nombres} {apellidos}</p>
                }

                {
                    email && <p>{email}</p>
                }

            </div>
            <div>
                <p className='fw'>Persona {tipoPersona}</p>
                {
                    tipodocumento && <p>{tipodocumento}: {nodocumento}</p>
                }
                {
                    nit && <p>NIT: {nit}</p>
                }

            </div>
            <Link href={`/propietarios/${id}`} className='link-detail'>Ver detalles <ArrowRightOutlined /></Link>
        </div>
    )
}
