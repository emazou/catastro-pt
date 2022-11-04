import React from 'react'
import { useAddConstruccionMutation } from 'features/construccionesAPI';
import { newConstruccionOpenModal } from 'features/modalSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function NewConstruccion({id, fn}) {

    const newConstruccionRef = React.useRef();
    const [addConstruccion] = useAddConstruccionMutation();
    const dispatch = useDispatch();
    const onFinish = (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(newConstruccionRef.current))
        addConstruccion({ ...body, idpredio:id })
            .then((res) => {
                if (res.data?.data) {
                    fn()
                    toast.success('Construcción agregada')
                } else {
                    console.log(res)
                    toast.error('No se pudo agregar la construccion')
                }
            }
            )
            .catch((error) => console.log(error))
        dispatch(newConstruccionOpenModal())
    };
    const formData = [
        {
            name: 'numeropisos',
            label: 'Número de pisos',
            type: 'number',
            key: 1,
            placeholder: '1'
        },
        {
            name: 'area',
            label: 'Área total',
            type: 'number',
            key: 2,
            placeholder: '1'
        },
        {
            name: 'direccion',
            label: 'Dirección',
            type: 'text',
            key: 3,
            placeholder: 'Calle 3 #54-37'
        }

    ]
    return (
        <form ref={newConstruccionRef} onSubmit={onFinish} className='form'>
            <select className='select' name='tipoconstruccion' defaultValue='tipo' required>
                <option disabled value="tipo" selected>Tipo de construccion</option>
                <option value='Comercial'>Comercial</option>
                <option value='Industrial'>Industrial</option>
                <option value='Residencial'>Residencial</option>
            </select>
            {
                formData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} name={item.name} placeholder={item.placeholder} required min={1} />
                    </label>
                ))
            }
            <button type="submit" className='button'>Agregar construccion</button>
        </form>
    )
}
