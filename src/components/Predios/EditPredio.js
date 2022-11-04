import React from 'react'
import { useDispatch } from 'react-redux';
import { editOpenModal } from 'features/modalSlice';
import { toast } from 'react-hot-toast';
import { useEditPredioMutation } from 'features/prediosAPI';
export default function EditPredio(props) {
    const [nombre, setNombre] = React.useState(props.nombre);
    const [avaluo, setAvaluo] = React.useState(props.avaluo);
    const [municipio, setMunicipio] = React.useState(props.municipio);
    const [departamento, setDepartamento] = React.useState(props.departamento);
    const [noPredial, setNoPredial] = React.useState(props.noPredial);
    const dispatch = useDispatch();
    const [updatePredio] = useEditPredioMutation();
    const onFinish = (e) => {
        e.preventDefault()
        updatePredio({ id: props.id, municipio, departamento, avaluo, nombre, noPredial })
            .then((res) =>{
                if (res.data?.data) {
                    props.fn()
                    toast.success('Predio modificado')
                } else {
                    toast.error('No se pudo modificar el predio')
                }
            })
            .catch((error) => console.log(error))
        dispatch(editOpenModal())
    };
    const formData = [
        {
            name: 'noPredial',
            label: 'Número predial',
            type: 'number',
            key: 1,
            defaultValue: noPredial,
            fn: (e) => setNoPredial(e.target.value)
        },
        {
            name: 'avaluo',
            label: 'Avalúo',
            type: 'number',
            key: 2,
            defaultValue: avaluo,
            fn: (e) => setAvaluo(e.target.value)
        },
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            key: 3,
            defaultValue: nombre,
            fn: (e) => setNombre(e.target.value)
        },
        {
            name: 'departamento',
            label: 'Departamento',
            type: 'text',
            key: 4,
            defaultValue: departamento,
            fn: (e) => setDepartamento(e.target.value)
        },
        {
            name: 'municipio',
            label: 'Municipio',
            type: 'text',
            key: 5,
            defaultValue: municipio,
            fn: (e) => setMunicipio(e.target.value)
        }
    ]
    return (
        <>
            <form onSubmit={onFinish} className='form'>
                {
                    formData.map((item) => (
                        <label className='label' key={item.key}>
                            {item.label}
                            <input
                                className='input'
                                type={item.type}
                                name={item.name}
                                defaultValue={item.defaultValue}
                                required
                                min={1}
                                minLength={1}
                                onChange={item.fn}
                            />
                        </label>
                    ))
                }
                <button type='submit' className='button' >Enviar</button>
            </form>
        </>
    )
}
