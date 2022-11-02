import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PREDIOS } from '../lib/graphql/queries/predios.query'
import PredioCard from '@components/Predios/PredioCard';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NewPredio from '@components/Predios/NewPredio';
import { useDispatch, useSelector } from 'react-redux';
import { newPredioOpenModal } from 'redux/modalSlice';
export default function properties() {
    const isOpenModal = useSelector((state) => state.modal.isOpenModal)
    const dispatch = useDispatch()
    const { loading, data } = useQuery(GET_PREDIOS)
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
                    data && data.predios.map(predio => (
                        <PredioCard
                            key={predio.id}
                            id={predio.id}
                            nombre={predio.nombre}
                            avaluo={predio.avaluo}
                            departamento={predio.departamento}
                            municipio={predio.municipio} />
                    ))
                }
                {
                    data?.predios.length === 0 && <p>Ups, no hay predios para ver</p>
                }
            </div>
            <Modal title="Formulario de inscripción de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(newPredioOpenModal())}>
                <NewPredio />
            </Modal>
        </div>
    )
}
