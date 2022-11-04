import React from 'react';
import Link from 'next/link';
import { UserOutlined, ArrowRightOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Modal } from 'antd';
import { useDeletePropietarioMutation } from 'features/propietariosAPI';
const { confirm } = Modal;
import { toast } from 'react-hot-toast';
export default function Propietario({ id, nombres, apellidos, tipoPersona, email, nodocumento, nit, tipodocumento, razonsocial, fn }) {
    const [deletePropietario] = useDeletePropietarioMutation();
    const showPromiseConfirm = () => {
        confirm({
            title: 'Quieres eliminar este propietario?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk() {
                deletePropietario(id)
                    .then((res) => {
                        if (res.data?.data) {
                            fn()
                            toast.success(`Se eliminó el propietario`)
                        } else {
                            toast.error('No se pudo eliminar el propietario')
                        }
                    })
                    .catch((error) => console.log(error))
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
