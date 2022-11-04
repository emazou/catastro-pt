import React from 'react';
import { useEditConstruccionMutation } from 'features/construccionesAPI';
import { editConstruccionOpenModal } from 'features/modalSlice';
import { useGetConstruccionQuery } from 'features/construccionesAPI';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function EditConstruccion(props) {
    const [numeropisos, setNumeropisos] = React.useState(props.numeropisos);
    const [area, setArea] = React.useState(props.area);
    const [tipoconstruccion, setTipoconstruccion] = React.useState(props.tipoconstruccion);
    const [direccion, setDireccion] = React.useState(props.direccion);
    const [editConstruccion] = useEditConstruccionMutation();
    const { refetch } = useGetConstruccionQuery(props.id);
    const dispatch = useDispatch();
    const onFinish = (e) => {
        e.preventDefault();
        editConstruccion({ id: props.id, numeropisos: numeropisos, area: area, tipoconstruccion: tipoconstruccion, direccion: direccion })
            .then((res) => {
                if (res.data?.data) {
                    refetch()
                    props.fn()
                    toast.success('Construcción modificada')
                } else {
                    toast.error('No se pudo modificar la construccion')
                }
            }
            )
            .catch((error) => console.log(error))
        dispatch(editConstruccionOpenModal())
    };
    const formData = [
        {
            name: 'numeropisos',
            label: 'Número de pisos',
            type: 'number',
            key: 1,
            value: numeropisos,
            fn: (e) => setNumeropisos(e.target.value)
        },
        {
            name: 'area',
            label: 'Área total',
            type: 'number',
            key: 2,
            value: area,
            fn: (e) => setArea(e.target.value)
        },
        {
            name: 'direccion',
            label: 'Dirección',
            type: 'text',
            key: 3,
            value: direccion,
            fn: (e) => setDireccion(e.target.value)
        }

    ]
    return (
        <form onSubmit={onFinish} className='form'>
            <select className='select' name='tipoconstruccion' defaultValue={tipoconstruccion} required onChange={(e) => setTipoconstruccion(e.target.value)}>
                <option disabled value={tipoconstruccion}>Tipo de construccion</option>
                <option value='Comercial'>Comercial</option>
                <option value='Industrial'>Industrial</option>
                <option value='Residencial'>Residencial</option>
            </select>
            {
                formData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} onChange={item.fn} name={item.name} value={item.value} required min={1} />
                    </label>
                ))
            }
            <button type="submit" className='button'>Enviar</button>
        </form>
    )
}
