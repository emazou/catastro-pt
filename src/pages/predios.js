import React from 'react';
import PredioCard from '@components/Predios/PredioCard';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NewPredio from '@components/Predios/NewPredio';
import { useDispatch, useSelector } from 'react-redux';
import { newPredioOpenModal } from 'redux/modalSlice';
import { useGetPrediosQuery } from 'redux/prediosAPI';
export default function properties() {
    const isOpenModal = useSelector((state) => state.modal.isOpenModal)
    const dispatch = useDispatch()
    const { data, loading, refetch } = useGetPrediosQuery()
    return (
        <div className='container flex-columns'>
            <Button className='button' onClick={() => dispatch(newPredioOpenModal())}>
                Agregar predio
                <PlusCircleOutlined />
            </Button>
            <div className='predios flex-row'>
                {
                    loading && <div className="ping"></div>
                }
                {
                    data && data?.data.predios.map(predio => (
                        <PredioCard
                            key={predio.id}
                            id={predio.id}
                            nombre={predio.nombre}
                            avaluo={predio.avaluo}
                            departamento={predio.departamento}
                            municipio={predio.municipio}
                            noPredial={predio.nopredial}
                            fn={() => refetch()}
                        />
                    ))
                }
                {
                    data?.data.predios.length === 0 && <p>Ups, no hay predios para ver</p>
                }
            </div>
            <Modal title="Formulario de inscripción de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(newPredioOpenModal())}>
                <NewPredio fn={() => refetch()} />
            </Modal>
        </div>
    )
}
