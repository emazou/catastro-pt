import React from 'react';
import { useGetTerrenoQuery, useDeleteTerrenoMutation } from 'features/terrenosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { editTerrenoOpenModal, newTerrenoOpenModal } from 'features/modalSlice';
import { PlusCircleOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-hot-toast';
const { confirm } = Modal;
import NewTerreno from './NewTerreno';
import EditTerreno from './EditTerreno';
export default function Terreno({ id }) {
  const isOpenEditTerrenoModal = useSelector((state) => state.modal.isOpenEditTerrenoModal)
  const { data, refetch } = useGetTerrenoQuery(id);
  const [deleteTerreno] = useDeleteTerrenoMutation();
  const terreno = data?.data?.terrenos[0];
  const isOpenNewTerrenoModal = useSelector((state) => state.modal.isOpenNewTerrenoModal);
  const dispatch = useDispatch();
  const showPromiseConfirm = () => {
    confirm({
      title: 'Quieres eliminar este terreno?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      onOk() {
        deleteTerreno(terreno?.id)
          .then((res) => {
            if (res.data?.data) {
              refetch()
              toast.success('Se eliminó el terreno')
            } else {
              toast.error('No se pudo eliminar el terreno')
            }
          })
          .catch((error) => console.log(error))
      },
      onCancel() { },
    });
  };
  return (
    <div className='flex-column'>
      {
        data?.data?.terrenos.length === 0
          ?
          <>
            <h2>Terreno</h2>
            <p>El predio no tiene un terreno</p>
            <button
              type="button"
              className='button'
              onClick={() => dispatch(newTerrenoOpenModal())}
            >
              Agregar terreno <PlusCircleOutlined />
            </button>
          </>
          :
          (
            <>
              <h2>Terreno</h2>
              <div className='flex-row construccion-container'>
                <div className='item-construccion'>
                  <p className='fw'>Tipo de terreno</p>
                  <p>{terreno?.tipoterreno}</p>
                </div>
                <div className='item-construccion'>
                  <p className='fw'>Área</p>
                  <p>{terreno?.area} m<sup>2</sup></p>
                </div>
                <div className='item-construccion'>
                  <p className='fw'>Valor comercial</p>
                  <p>${terreno?.valorcomercial} </p>
                </div>
                <div className='item-construccion'>
                  <p className='fw'>¿Cerca a fuentes de agua?</p>
                  <p>{terreno?.fuentesagua ? 'Si' : 'No'} </p>
                </div>
                <div className='item-construccion'>
                  <p className='fw'>¿Tiene construcciones?</p>
                  <p>{terreno?.construcciones ? 'Si' : 'No'}</p>
                </div>
                <div className='flex-row'>
                  <DeleteOutlined key="delete"
                    onClick={showPromiseConfirm}
                  />
                  <EditOutlined key="edit"
                    style={{ marginLeft: '.5rem' }}
                    onClick={() => dispatch(editTerrenoOpenModal())}
                  />
                </div>
              </div>
            </>
          )
      }
      <Modal title="Formulario de inscripción de terreno" footer={null} open={isOpenNewTerrenoModal} onCancel={() => dispatch(newTerrenoOpenModal())}>
        <NewTerreno fn={() => refetch()} id={id} />
      </Modal>
      <Modal title="Formulario de edición de terreno" footer={null} open={isOpenEditTerrenoModal} onCancel={() => dispatch(editTerrenoOpenModal())}>
        <EditTerreno fn={() => refetch()} id={terreno?.id} area={terreno?.area} valorcomercial={terreno?.valorcomercial} fuentesagua={terreno?.fuentesagua} construcciones={terreno?.construcciones} />
      </Modal>
    </div>
  )
}
