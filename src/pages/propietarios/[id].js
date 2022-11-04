import React from 'react';
import { useRouter } from 'next/router';
import { Descriptions, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPropietarioQuery, useDeletePropietarioMutation, useGetPropietariosQuery } from 'features/propietariosAPI';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EditPropietario from '@components/Propietarios/EditPropietario';
import { editOpenModal } from 'features/modalSlice';
import { toast } from 'react-hot-toast';
const { confirm } = Modal;
export default function Propietario() {
    const isOpenModal = useSelector((state) => state.modal.isOpenEditModal);
    const dispatch = useDispatch();
    const router = useRouter()
    const { id } = router.query
    const { data, loading } = useGetPropietarioQuery(id)
    const propietario = data?.data.propietarios[0]
    const [deletePropietario] = useDeletePropietarioMutation();
    const { refetch } = useGetPropietariosQuery(propietario?.idpredio)
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
                            refetch()
                            router.replace(`/predios/${propietario?.idpredio}`)
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
        <div className='container flex-column'>
            {
                loading ? <div className="ping"></div>
                    :
                    <>
                        <Descriptions title="Información del propietario" labelStyle={{ fontWeight: 500, marginInline: '.3rem' }} className={'descriptions'}>
                            <Descriptions.Item label="Tipo de persona">{propietario?.tipopersona}</Descriptions.Item>
                            {
                                propietario?.tipopersona === "Natural" ?
                                    <>
                                        <Descriptions.Item label="Nombres">{propietario?.nombres}</Descriptions.Item>
                                        <Descriptions.Item label="Apellidos">{propietario?.apellidos}</Descriptions.Item>
                                        <Descriptions.Item label="Tipo de documento" >{propietario?.tipodocumento}</Descriptions.Item>
                                        <Descriptions.Item label="Número de documento">{propietario?.nodocumento}</Descriptions.Item>
                                    </>
                                    :
                                    <>
                                        <Descriptions.Item label="Razón social">{propietario?.razonsocial}</Descriptions.Item>
                                        <Descriptions.Item label="Nit">{propietario?.nit}</Descriptions.Item>
                                    </>
                            }
                            <Descriptions.Item label="Correo electrónico">{propietario?.email}</Descriptions.Item>
                            <Descriptions.Item label="Dirección">{propietario?.direccion}</Descriptions.Item>
                            <Descriptions.Item label="Teléfono">{propietario?.telefono}</Descriptions.Item>
                        </Descriptions>
                    </>
            }
            <div className='buttons-container'>
                <button
                    type="button"
                    className='bton-delete'
                    onClick={showPromiseConfirm}
                >
                    Eliminar propietario
                    <DeleteOutlined key="delete"
                        style={{ marginLeft: '.5rem' }}
                    />
                </button>
                <button
                    type='button'
                    className='bton-edit button'
                    onClick={() => {
                        dispatch(editOpenModal())
                    }}
                >
                    Editar propietario
                    <EditOutlined key="edit"
                        style={{ marginLeft: '.5rem' }}

                    />
                </button>
            </div>
            <Modal title="Formulario de edición de propietarios" footer={null} open={isOpenModal} onCancel={() => dispatch(editOpenModal())}>
                <EditPropietario
                    id={id}
                    fn={() => refetch()}
                    nodocumento={propietario?.nodocumento}
                    nombres={propietario?.nombres}
                    apellidos={propietario?.apellidos}
                    nit={propietario?.nit}
                    razonsocial={propietario?.razonsocial}
                    direccion={propietario?.direccion}
                    telefono={propietario?.telefono}
                    email={propietario?.email}
                    tipopersona={propietario?.tipopersona}
                />
            </Modal>
        </div>
    )
}
