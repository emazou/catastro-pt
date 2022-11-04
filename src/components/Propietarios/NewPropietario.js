import React from 'react';
import { newPropietarioOpenModal } from 'features/modalSlice';
import { useDispatch } from 'react-redux';
import { useAddPropietarioMutation } from 'features/propietariosAPI';
import { toast } from 'react-hot-toast';
const naturalData = [
    {
        name: 'nodocumento',
        label: 'Número de documento',
        type: 'number',
        key: 1,
        placeholder: '110011011'
    },
    {
        name: 'nombres',
        label: 'Nombres',
        type: 'text',
        key: 2,
        placeholder: 'Nombres'
    },
    {
        name: 'apellidos',
        label: 'Apellidos',
        type: 'text',
        key: 3,
        placeholder: 'Apellidos'
    }
]
const formData = [
    {
        name: 'direccion',
        label: 'Dirección',
        type: 'text',
        key: 4,
        placeholder: 'Calle 3 #54-98'
    },
    {
        name: 'telefono',
        label: 'Telefono',
        type: 'number',
        key: 5,
        placeholder: '4445321'
    },
    {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        key: 6,
        placeholder: 'email@gmail.com'
    },
]
const juridicaData = [
    {
        name: 'nit',
        label: 'Nit',
        type: 'number',
        key: 6,
        placeholder: '101010101'
    },
    {
        name: 'razonsocial',
        label: 'Razón Social',
        type: 'text',
        key: 7,
        placeholder: 'Razón social'
    },
]

export default function NewPropietario({ fn, id }) {
    const [tipo, setTipo] = React.useState('');
    const formNewRef = React.useRef();
    const dispatch = useDispatch();
    const [addPropietario] = useAddPropietarioMutation();
    const onFinish = (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(formNewRef.current));
        let nullable = {};
        if (tipo === "Natural") {
            nullable = { nit: null, razonsocial: null };
        } else {
            nullable = { tipodocumento: null, nodocumento: null, apellidos: null, nombres: null };
        }
        addPropietario({ ...body, ...nullable, idpredio:id })
            .then((res) => {
                if (res.data?.data) {
                    fn()
                    toast.success('Propietario agregado')
                } else {
                    console.log(res)
                    toast.error('No se pudo agregar el propietario')
                }
            }
            )
            .catch((error) => console.log(error))
        dispatch(newPropietarioOpenModal())
    };
    return (
        <form ref={formNewRef} onSubmit={onFinish} className='form' >
            <select className='select' name='tipopersona' defaultValue='tipo' onChange={(e) => setTipo(e.target.value) } required>
                <option disabled value="tipo">Tipo de persona</option>
                <option value='Natural'>Natural</option>
                <option value='Jurídica'>Jurídica</option>
            </select>
            {
                tipo === "Natural"
                &&
                <select className='select' name='tipodocumento' defaultValue='Select' required >
                    <option disabled value="Select" selected>Tipo de documento</option>
                    <option value='Cédula de ciudadanía'>Cédula de ciudadanía</option>
                    <option value='DNI'>DNI</option>
                </select>
            }
            {
                tipo === "Natural" && naturalData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} name={item.name} placeholder={item.placeholder} required min={1} />
                    </label>
                ))
            }

            {
                tipo === 'Jurídica' && juridicaData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} name={item.name} placeholder={item.placeholder} required min={1} />
                    </label>
                ))
            }
            {
                formData.map((item) => (
                    <label className='label' key={item.key}>
                        * {item.label}
                        <input className='input' type={item.type} name={item.name} placeholder={item.placeholder} required={item.name === 'email' ? null : true} min={1} />
                    </label>
                ))
            }
            <button type="submit" className='button'>Agregar propietario</button>
        </form>
    )
}
