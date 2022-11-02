import React, { use } from 'react';
import Link from 'next/link';
import { Card, Modal } from 'antd';
import { RightOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeletePredio } from '../../hooks/useMutationPredio';
import { useDispatch, useSelector } from 'react-redux';
import EditPredio from './EditPredio';
import { editPredioOpenModal } from 'redux/modalSlice';
const { confirm } = Modal;

export default function PredioCard({ avaluo, nombre, departamento, municipio, id }) {
    const deletePredio = useDeletePredio();
    const dispatch = useDispatch();
    const isOpenModal = useSelector((state) => state.modal.isOpenEditModal)
    const showPromiseConfirm = () => {
        confirm({
            title: 'Quieres eliminar este predio?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk() {
                deletePredio(
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
        <div>
            <Modal title="Formulario de edición de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(editPredioOpenModal())}>
                <EditPredio id={id} nombre={nombre} municipio={municipio} departamento={departamento} avaluo={avaluo} />
            </Modal>
            <Card
                title={nombre}
                extra={<Link
                    className='link-detail'
                    href={`/predios/${id}`}>Ver detalles <RightOutlined /></Link>}
                style={{ width: 300, }}
                actions={[
                    <EditOutlined key="edit"
                        onClick={() => dispatch(editPredioOpenModal())}

                    />,
                    <DeleteOutlined key="delete"
                        onClick={showPromiseConfirm}
                    />,
                ]}
            >
                <p>No.Predial {id}</p>
                <p>{municipio} - {departamento}</p>
                <h3>Avaluo: ${avaluo}</h3>
            </Card>
        </div>
    )
}
