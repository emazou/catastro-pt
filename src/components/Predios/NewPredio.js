import React from 'react'
import { useDispatch } from 'react-redux';
import { newPredioOpenModal } from 'features/modalSlice';
import { useAddPredioMutation } from 'features/prediosAPI';
import { toast } from 'react-hot-toast';
export default function NewPredio({ fn }) {
    const formRef = React.useRef()
    const dispatch = useDispatch();
    const [addPredio] = useAddPredioMutation()
    const onFinish = (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(formRef.current))
        addPredio({ ...body })
            .then((res) => {
                if (res.data?.data) {
                    fn()
                    toast.success('Predio agregado')
                } else {
                    toast.error('No se pudo agregar el predio')
                }
            }
            )
            .catch((error) => console.log(error))
        dispatch(newPredioOpenModal())
    };
    const formData = [
        {
            name: 'noPredial',
            label: 'Número predial',
            type: 'number',
            key: 1,
            placeholder: '111111111'
        },
        {
            name: 'avaluo',
            label: 'Avalúo',
            type: 'number',
            key: 2,
            placeholder: '1000000'
        },
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            key: 3,
            placeholder: 'Nombre del predio'
        },
        {
            name: 'departamento',
            label: 'Departamento',
            type: 'text',
            key: 4,
            placeholder: 'Departamento'
        },
        {
            name: 'municipio',
            label: 'Municipio',
            type: 'text',
            key: 5,
            placeholder: 'Municipio'
        }
    ]
    return (
        <form ref={formRef} onSubmit={onFinish} className='form'>
            {
                formData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} name={item.name} placeholder={item.placeholder} required min={1} />

                    </label>
                ))
            }
            <button type="submit" className='button'>Agregar predio</button>
        </form>
    )
}
