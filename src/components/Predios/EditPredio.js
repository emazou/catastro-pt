import React from 'react'
import {
    Button,
    Form,
    Input,
    InputNumber,
} from 'antd';
import { useDispatch } from 'react-redux';
import { editPredioOpenModal } from 'redux/modalSlice';
import { useAddPredio } from 'hooks/useMutationPredio';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default function EditPredio({id, nombre, avaluo, municipio, departamento}) {
    const dispatch = useDispatch();
    const addPredio = useAddPredio()
    const onFinish = (values) => {
        addPredio({
            variables: { ...values.predio}
        })
        dispatch(editPredioOpenModal)
    };
    const formData = [
        {
            name: 'id',
            label: 'Número predial',
            type: 'number',
            message: 'Ingresa el número predial',
            key: 1,
            defaultValue: id
        },
        {
            name: 'avaluo',
            label: 'Avalúo',
            type: 'number',
            message: 'Ingresa el avalúo',
            key: 2,
            defaultValue: avaluo
        },
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            message: 'Ingresa el nombre del predio',
            key: 3,
            defaultValue: nombre
        },
        {
            name: 'departamento',
            label: 'Departamento',
            type: 'text',
            message: 'Ingresa el departamento',
            key: 4,
            defaultValue: departamento
        },
        {
            name: 'municipio',
            label: 'Municipio',
            type: 'text',
            message: 'Ingresa el municipio',
            key: 5,
            defaultValue: municipio
        }
    ]
    return (
        <Form {...layout} name="predios" onFinish={onFinish}>
            {
                formData.map((item) => (
                    <Form.Item key={item.key} name={['predio', item.name]} label={item.label} rules={[{ required: true, type: item.type, message: item.message, value:item.defaultValue }]}>
                        {
                            item.type === 'number' ? <InputNumber value={item.value} required style={{width:260}} /> : <Input value={item.value} required type='text' />
                        }

                    </Form.Item>
                ))
            }
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className='button' type="primary" htmlType="submit">
                    Editar predio
                </Button>
            </Form.Item>
        </Form>
    )
}
