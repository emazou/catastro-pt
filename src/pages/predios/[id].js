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
    const [option, setOption] = React.useState('Todos')
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
                        className='bs'
                        title={predio?.nombre}
                        style={{ width: '100%' }}
                        actions={[
                            <EditOutlined key="edit"
                                onClick={() => {
                                    dispatch(editOpenModal())
                                }}
                            />
                        ]}
                    >
                        <div className='flex-row'>
                            <div className='item'>
                                <p className='fw'>Número Predial </p>
                                <p>{predio?.nopredial}</p>
                            </div>
                            <div className='item'>
                                <p className='fw'>Departamento </p>
                                <p>{predio?.departamento}</p>
                            </div>
                            <div>
                                <p className='fw'>Municipio </p>
                                <p>{predio?.municipio}</p>
                            </div>
                            <div className='item'>
                                <p className='fw'>Avalúo </p>
                                <p>${predio?.avaluo}</p>
                            </div>
                        </div>
                    </Card>
            }
            <Modal title="Formulario de edición de predios" footer={null} open={isOpenModal} onCancel={() => dispatch(editOpenModal())}>
                <EditPredio fn={() => refetch()} id={id} nombre={predio?.nombre} municipio={predio?.municipio} departamento={predio?.departamento} avaluo={predio?.avaluo} noPredial={predio?.nopredial} />
            </Modal>
            <div className='container-select flex-column'>
                <p>Elige que quieres ver del predio Propietarios/Construcciones/Terreno o todos</p>
                <select className='select' defaultValue='Todos' onChange={(e) => setOption(e.target.value)} >
                    <option disabled value="option">Filtrar por</option>
                    <option value='Todos'>Todos</option>
                    <option value='Construcciones'>Construcciones</option>
                    <option value="Propietarios">Propietarios</option>
                    <option value="Terreno">Terreno</option>
                </select>
            </div>

            {
                (data && option === 'Todos') && (
                    <>
                        <Propietarios id={id} />
                        <Construcciones id={id} />
                        <Terreno id={id} />
                    </>
                )
            }
            {
                (data && option === 'Propietarios') && <Propietarios id={id} />
            }
            {
                (data && option === 'Construcciones') && <Construcciones id={id} />
            }
            {
                (data && option === 'Terreno') && <Terreno id={id} />
            }
        </div>
    )
}
