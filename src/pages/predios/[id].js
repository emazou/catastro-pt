import React from 'react';
import { useRouter } from 'next/router';
import { Card, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditPredio from '@components/Predios/EditPredio';
import { editPredioOpenModal } from 'features/modalSlice';
import { editPredio } from 'features/editSlice';
import Propietarios from '@components/Propietarios/Propietarios';
import { useGetPredioQuery } from 'features/prediosAPI';
import { useDispatch, useSelector } from 'react-redux';

export default function PredioPage() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const isOpenModal = useSelector((state) => state.modal.isOpenEditModal);
    const { data, refetch } = useGetPredioQuery(id)
    const predio = data?.data.predios[0]
    return (
        <div className='container flex-column'>
            {
                !data
                    ?
                    <div className="ping"></div>
                    :
                    <Card
                        title={predio?.nombre}
                        style={{ width: '100%' }}
                        actions={[
                            <EditOutlined key="edit"
                                onClick={() => {
                                    dispatch(editPredioOpenModal())
                                    dispatch(editPredio({ avaluo: predio?.avaluo, nombre: predio?.nombre, departamento: predio?.departamento, municipio: predio?.municipio, id: id, noPredial: predio.no_predial }))
                                }}

                            />
                        ]}
                    >
                        <p>Número Predial: {predio?.nopredial}</p>
                        <p>{predio?.municipio} - {predio?.departamento}</p>
                        <h4>Avaluo: ${predio?.avaluo}</h4>
                    </Card>
            }
            <Modal title="Formulario de edición de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(editPredioOpenModal())}>
                <EditPredio fn={() => refetch()} id={id} nombre={predio?.nombre} municipio={predio?.municipio} departamento={predio?.departamento} avaluo={predio?.avaluo} noPredial={predio?.nopredial} />
            </Modal>
            <Propietarios id={id} />
        </div>
    )
}
