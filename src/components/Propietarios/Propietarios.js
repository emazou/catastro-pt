import React from 'react';
import { useGetPropietariosQuery } from 'features/propietariosAPI';
import Propietario from '@components/Propietarios/Propietario';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import NewPropietario from './NewPropietario';
import { newPropietarioOpenModal } from 'features/modalSlice';
export default function Propietarios({ id }) {
    const isOpenNewPropietarioModal = useSelector((state) => state.modal.isOpenNewPropietarioModal)
    const { data, refetch } = useGetPropietariosQuery(id)
    const dispatch = useDispatch()
    return (
        <div className='flex-column'>
            {
                data && <h2>Propietarios</h2>
            }
            {
                (data && data?.data.propietarios.length === 0) && <p>Este predio no tiene propietarios</p>
            }
            <button
                type="button"
                className='button'
                onClick={() => dispatch(newPropietarioOpenModal())}
            >
                Agregar propietario <PlusCircleOutlined />
            </button>
            <div className='flex-row'>
                {
                    data && data?.data.propietarios.map((item) => (
                        <Propietario
                            key={item.id}
                            id={item.id}
                            nombres={item.nombres}
                            apellidos={item.apellidos}
                            tipoPersona={item.tipopersona}
                            email={item.email}
                            nit={item.nit}
                            nodocumento={item.nodocumento}
                            tipodocumento={item.tipodocumento}
                            razonsocial={item.razonsocial}
                            fn={() => refetch()}
                        />
                    ))
                }
            </div>
            <Modal title="Formulario de inscripción de propietarios" footer={null} open={isOpenNewPropietarioModal} onCancel={() => dispatch(newPropietarioOpenModal())}>
                <NewPropietario fn={() => refetch()} id={id} />
            </Modal>
        </div>
    )
}
