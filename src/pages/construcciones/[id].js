import Construccion from '@components/Construcciones/Construccion'
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetConstruccionesQuery, useGetConstruccionQuery, useDeleteConstruccionMutation } from 'features/construccionesAPI';
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { editConstruccionOpenModal } from 'features/modalSlice';
import { Modal } from 'antd';
import { toast } from 'react-hot-toast';
import EditConstruccion from '@components/Construcciones/EditConstruccion';
const { confirm } = Modal;
export default function ConstruccionPage() {
    const router = useRouter()
    const { id } = router.query
    const { data } = useGetConstruccionQuery(id);
    const [deleteConstruccion] = useDeleteConstruccionMutation();
    const isOpenEditConstruccionModal = useSelector((state) => state.modal.isOpenEditConstruccionModal);
    const construccion = data?.data.construcciones[0]
    const { refetch } = useGetConstruccionesQuery(construccion?.idpredio)
    const dispatch = useDispatch()
    const showPromiseConfirm = () => {
        confirm({
            title: 'Quieres eliminar esta construcción?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk() {
                deleteConstruccion(id)
                    .then((res) => {
                        if (res.data?.data) {
                            refetch()
                            router.replace(`/predios/${construccion?.idpredio}`)
                            toast.success('Se eliminó la construcción')
                        } else {
                            toast.error('No se pudo eliminar la construcción')
                        }
                    })
                    .catch((error) => console.log(error))
            },
        });
    };

    return (
        <div className='container flex-column'>
            <Construccion fn={() => refetch()} id={id} area={construccion?.area} numeropisos={construccion?.numeropisos} tipoconstruccion={construccion?.tipoconstruccion} direccion={construccion?.direccion} />
            <div>
                <button
                    type="button"
                    className='bton-delete'
                    onClick={showPromiseConfirm}
                >
                    Eliminar construcción
                    <DeleteOutlined key="delete"
                        style={{ marginLeft: '.5rem' }}
                    />
                </button>
                <button
                    type='button'
                    className='bton-edit button'
                    onClick={() => {
                        dispatch(editConstruccionOpenModal())
                    }}
                >
                    Editar construccion
                    <EditOutlined key="edit"
                        style={{ marginLeft: '.5rem' }}

                    />
                </button>
            </div>
            <Modal title="Formulario de inscripción de construcciones" footer={null} open={isOpenEditConstruccionModal} onCancel={() => dispatch(editConstruccionOpenModal())}>
                <EditConstruccion fn={() => refetch()} id={id} idpredio={construccion?.idpredio} area={construccion?.area} numeropisos={construccion?.numeropisos} tipoconstruccion={construccion?.tipoconstruccion} direccion={construccion?.direccion} />
            </Modal>
        </div>
    )
}
