import React from 'react'
import { useAddTerrenoMutation } from 'features/terrenosAPI';
import { newTerrenoOpenModal } from 'features/modalSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
export default function NewTerreno({ id, fn }) {
    const newTerrenoRef = React.useRef()
    const [addTerreno] = useAddTerrenoMutation();
    const dispatch = useDispatch();
    const onFinish = (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(newTerrenoRef.current))
        addTerreno({ ...body, idpredio: id })
            .then((res) => {
                if (res.data?.data) {
                    fn()
                    toast.success('Terreno agregado')
                } else {
                    console.log(res)
                    toast.error('No se pudo agregar el terreno')
                }
            }
            )
            .catch((error) => console.log(error))
        dispatch(newTerrenoOpenModal())
    };
    return (
        <form ref={newTerrenoRef} onSubmit={onFinish} className='form'>
            <select className='select' name='tipoterreno' defaultValue='tipo' required>
                <option disabled value="tipo" selected>Tipo de terreno</option>
                <option value='Rural'>Rural</option>
                <option value='Urbano'>Urbano</option>
            </select>
            <select className='select' name='fuentesagua' defaultValue='tipo' required>
                <option disabled value="tipo" selected>Está cerca de fuentes de agua?</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
            </select>
            <select className='select' name='construcciones' defaultValue='tipo' required>
                <option disabled value="tipo" selected>Tiene construcciones?</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
            </select>
            <label className='label'>
                * Área
                <input className='input' type='number' name='area' placeholder='3' required min={1} />
            </label>
            <label className='label'>
                * Valor comercial
                <input className='input' type='number' name='valorcomercial' placeholder='3' required min={1} />
            </label>
            <button type="submit" className='button'>Agregar construccion</button>
        </form>
    )
}
