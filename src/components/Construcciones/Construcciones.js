import React from 'react';
import { useGetConstruccionesQuery } from 'features/construccionesAPI';
import Construccion from './Construccion';
import NewConstruccion from './NewConstruccion';
import { useDispatch, useSelector } from 'react-redux';
import { newConstruccionOpenModal } from 'features/modalSlice';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
export default function Construcciones({ id }) {
    const { data, refetch } = useGetConstruccionesQuery(id);
    const isOpenNewConstruccionModal = useSelector((state) => state.modal.isOpenNewConstruccionModal);
    const dispatch = useDispatch();
    return (
        <div className='flex-column width-100 bs'>
            {
                data && <h2>Construcciones</h2>
            }

            {
                (data && data?.data?.construcciones.length === 0)
                    ?
                    <p>Este predio no tiene construcciones</p>
                    :
                    data?.data?.construcciones.map((item) => (
                        <Construccion
                            id={item.id}
                            key={item.id}
                            area={item.area}
                            numeropisos={item.numeropisos}
                            tipoconstruccion={item.tipoconstruccion}
                            direccion={item.direccion}
                            fn={() => refetch()}
                            idpredio={id}
                        />
                    ))
            }
            <button
                type="button"
                className='button'
                onClick={() => dispatch(newConstruccionOpenModal())}
            >
                Agregar construcción <PlusCircleOutlined />
            </button>
            <Modal title="Formulario de inscripción de construcciones" footer={null} open={isOpenNewConstruccionModal} onCancel={() => dispatch(newConstruccionOpenModal())}>
                <NewConstruccion fn={() => refetch()} id={id} />
            </Modal>
        </div>
    )
}
