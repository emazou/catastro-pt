import React from 'react';
import { useEditPropietarioMutation, useGetPropietarioQuery } from 'features/propietariosAPI';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { editOpenModal } from 'features/modalSlice';
export default function EditPropietario(props) {
    const [nombres, setNombres] = React.useState(props.nombres);
    const [apellidos, setApellidos] = React.useState(props.apellidos);
    const [nodocumento, setNodocumento] = React.useState(props.nodocumento);
    const [nit, setNit] = React.useState(props.nit);
    const [razonsocial, setRazonsocial] = React.useState(props.razonsocial);
    const [telefono, setTelefono] = React.useState(props.telefono);
    const [direccion, setDireccion] = React.useState(props.direccion);
    const [email, setEmail] = React.useState(props.email);
    const [editPropietario] = useEditPropietarioMutation();
    const { refetch } = useGetPropietarioQuery(props.id);
    const dispatch = useDispatch();

    const formDataNatural = [
        {
            name: 'nodocumento',
            label: 'Número de documento',
            value: nodocumento,
            key: 1,
            type: 'number',
            fn: (e) => setNodocumento(e.target.value)
        },
        {
            name: 'nombres',
            label: 'Nombres',
            value: nombres,
            key: 2,
            type: 'text',
            fn: (e) => setNombres(e.target.value)
        },
        {
            name: 'apellidos',
            label: 'Apellidos',
            value: apellidos,
            key: 3,
            type: 'text',
            fn: (e) => setApellidos(e.target.value)
        }
    ]
    const formDataJuridica = [
        {
            name: 'razonsocial',
            label: 'Razón social',
            value: razonsocial,
            key: 4,
            type: 'text',
            fn: (e) => setRazonsocial(e.target.value)
        },
        {
            name: 'nit',
            label: 'Nit',
            value: nit,
            key: 5,
            type: 'number',
            fn: (e) => setNit(e.target.value)
        },
    ]
    const formData = [
        ,

        {
            name: 'telefono',
            label: 'Telefono',
            value: telefono,
            key: 6,
            type: 'number',
            fn: (e) => setTelefono(e.target.value)
        },
        {
            name: 'direccion',
            label: 'Dirección',
            value: direccion,
            key: 7,
            type: 'text',
            fn: (e) => setDireccion(e.target.value)
        },
        ,
        {
            name: 'email',
            label: 'Correo electrónico',
            value: email,
            key: 8,
            type: 'email',
            fn: (e) => setEmail(e.target.value)
        }
    ]
    const submit = () => {
        editPropietario({ id: props.id, apellidos: apellidos, nombres: nombres, nodocumento: nodocumento, razonsocial: razonsocial, direccion: direccion, telefono: telefono, email: email, nit: nit })
            .then((res) => {
                if (res.data?.data) {
                    refetch()
                    props.fn()
                    toast.success('Propietario modificado')
                } else {
                    console.log(res)
                    toast.error('No se pudo modificar el propietario')
                }
            })
            .catch((error) => console.log(error))
        dispatch(editOpenModal())
    }
    return (
        <form className='form'>
            {
                props.tipopersona === "Natural"
                    ?
                    formDataNatural.map((item) => (
                        <label className='label' key={item.key}>
                            {item.label}
                            <input className='input' type={item.type} name={item.name} value={item.value} onChange={item.fn} required min={1} />
                        </label>
                    ))
                    :
                    formDataJuridica.map((item) => (
                        <label className='label' key={item.key}>
                            {item.label}
                            <input className='input' type={item.type} name={item.name} value={item.value} onChange={item.fn} required min={1} />
                        </label>
                    ))

            }
            {
                formData.map((item) => (
                    <label className='label' key={item.key}>
                        {item.label}
                        <input className='input' type={item.type} name={item.name} value={item.value} onChange={item.fn} required min={1} />
                    </label>
                ))
            }
            <button className='button' type='button' onClick={submit}>
                Enviar
            </button>
        </form>
    )
}
