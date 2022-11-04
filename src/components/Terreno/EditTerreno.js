import React from 'react'
import { useEditTerrenoMutation } from 'features/terrenosAPI';
import { editTerrenoOpenModal } from 'features/modalSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
export default function EditTerreno(props) {
    const [valorcomercial, setValorcomercial] = React.useState(props.valorcomercial);
    const [fuentesagua, setFuentesagua] = React.useState(props.fuentesagua);
    const [tipoterreno, setTipoterreno] = React.useState(props.tipoterreno);
    const [area, setArea] = React.useState(props.area);
    const [construcciones, setConstrucciones] = React.useState(props.construcciones);
    const [editTerreno] = useEditTerrenoMutation();
    const dispatch = useDispatch()
    const onFinish = (e) => {
        e.preventDefault()
        editTerreno({ id: props.id, valorcomercial, fuentesagua, tipoterreno, area, construcciones })
            .then((res) => {
                if (res.data?.data) {
                    props.fn()
                    toast.success('Terreno modificado')
                } else {
                    toast.error('No se pudo modificar el terreno')
                }
            })
            .catch((error) => console.log(error))
        dispatch(editTerrenoOpenModal())
    };
    return (
        <form onSubmit={onFinish} className='form'>
            <select className='select' name='tipoterreno' defaultValue={tipoterreno} onChange={(e) => setTipoterreno(e.target.value)} >
                <option disabled value={tipoterreno} >Tipo de terreno</option>
                <option value='Rural'>Rural</option>
                <option value='Urbano'>Urbano</option>
            </select>
            <select className='select' name='fuentesagua' defaultValue={fuentesagua} onChange={(e) => setFuentesagua(e.target.value)} >
                <option disabled value={fuentesagua} >Está cerca de fuentes de agua?</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
            </select>
            <select className='select' name='construcciones' defaultValue={construcciones} onChange={(e) => setConstrucciones(e.target.value)} >
                <option disabled value={construcciones} >Tiene construcciones?</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
            </select>
            <label className='label'>
                * Área
                <input className='input' type='number' name='area' value={area} onChange={(e) => setArea(e.target.value)} placeholder='3' required min={1} />
            </label>
            <label className='label'>
                * Valor comercial
                <input className='input' type='number' value={valorcomercial} onChange={(e) => setValorcomercial(e.target.value)} name='valorcomercial' placeholder='3' required min={1} />
            </label>
            <button type="submit" className='button'>Agregar construccion</button>
        </form>
    )
}
