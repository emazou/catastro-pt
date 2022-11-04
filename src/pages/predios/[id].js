import React from 'react';
import { useRouter } from 'next/router';
import { Card, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditPredio from '@components/Predios/EditPredio';
import { editOpenModal } from 'features/modalSlice';
import Propietarios from '@components/Propietarios/Propietarios';
import { useGetPredioQuery } from 'features/prediosAPI';
import { useDispatch, useSelector } from 'react-redux';
import Construcciones from '@components/Construcciones/Construcciones';
import Terreno from '@components/Terreno/Terreno';

export default function PredioPage() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const isOpenModal = useSelector((state) => state.modal.isOpenEditModal);
    const { data, refetch } = useGetPredioQuery(id)
    const predio = data?.data?.predios[0]
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
                                    dispatch(editOpenModal())}}
                            />
                        ]}
                    >
                        <p>Número Predial: {predio?.nopredial}</p>
                        <p>{predio?.municipio} - {predio?.departamento}</p>
                        <h4>Avaluo: ${predio?.avaluo}</h4>
                    </Card>
            }
            <Modal title="Formulario de edición de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(editOpenModal())}>
                <EditPredio fn={() => refetch()} id={id} nombre={predio?.nombre} municipio={predio?.municipio} departamento={predio?.departamento} avaluo={predio?.avaluo} noPredial={predio?.nopredial} />
            </Modal>
            {
                data && (
                    <>
                        <Propietarios id={id} />
                        <Construcciones id={id} />
                        <Terreno id={id} />
                    </>
                )
            }
        </div>
    )
}
