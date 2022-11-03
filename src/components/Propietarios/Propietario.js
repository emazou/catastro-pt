import React from 'react';
import Link from 'next/link';
import { UserOutlined, ArrowRightOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Modal } from 'antd';
import { useDeletePropietario } from 'hooks/useMutationPropietario';
const { confirm } = Modal;
export default function Propietario({ id, nombres, apellidos, tipoPersona, email, nodocumento, nit, tipodocumento, razonsocial }) {
    const [deletePropietario, { data }] = useDeletePropietario();
    const showPromiseConfirm = () => {
        confirm({
            title: 'Quieres eliminar este propietario?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk() {
                deletePropietario(
                    {
                        variables: {
                            id: id
                        }
                    },
                )

            },
            onCancel() { },
        });
    };
    return (
        <div className='propietario'>
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
            <DeleteOutlined key="delete"
                onClick={showPromiseConfirm}
            />,
            <Link href={`/propietarios/${id}`}>Ver detalles <ArrowRightOutlined /></Link>

        </div>
    )
}
