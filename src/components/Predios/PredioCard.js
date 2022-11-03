import React from 'react';
import Link from 'next/link';
import { Card, Modal } from 'antd';
import { ArrowRightOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeletePredioMutation } from 'redux/prediosAPI';
import { toast } from 'react-hot-toast';
const { confirm } = Modal;
export default function PredioCard({ avaluo, nombre, departamento, municipio, id, noPredial, fn }) {
    const [deletePredio] = useDeletePredioMutation();
    const showPromiseConfirm = () => {
        confirm({
            title: 'Quieres eliminar este predio?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk() {
                deletePredio(id)
                    .then((res) => {
                        if (res.data?.data) {
                            fn()
                            toast.success('Se eliminó el predio')
                        } else {
                            toast.error('No se pudo eliminar el predio')
                        }
                    })
                    .catch((error) => console.log(error))
            },
            onCancel() { },
        });
    };
    return (
        <Card
            title={nombre}
            extra={<Link
                className='link-detail'
                href={`/predios/${id}`}>Ver detalles <ArrowRightOutlined /></Link>}
            style={{ width: 300, }}
            actions={[
                <DeleteOutlined key="delete"
                    onClick={showPromiseConfirm}
                />,
            ]}
        >
            <p className='fw'>No.Predial: {noPredial}</p>
            <p>{municipio} - {departamento}</p>
            <p>Avalúo: ${avaluo} COP</p>
        </Card>
    )
}
