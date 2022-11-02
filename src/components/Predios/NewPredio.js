import React from 'react'
import {
    Button,
    Form,
    Input,
    InputNumber,
} from 'antd';
import { useDispatch } from 'react-redux';
import { newPredioOpenModal } from 'redux/modalSlice';
import { useAddPredio } from 'hooks/useMutationPredio';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default function NewPredio() {
    const dispatch = useDispatch();
    const addPredio = useAddPredio()
    const onFinish = (values) => {
        addPredio({
            variables: { ...values.predio}
        })
        dispatch(newPredioOpenModal())
    };
    const formData = [
        {
            name: 'id',
            label: 'Número predial',
            type: 'number',
            message: 'Ingresa el número predial',
            key: 1
        },
        {
            name: 'avaluo',
            label: 'Avalúo',
            type: 'number',
            message: 'Ingresa el avalúo',
            key: 2
        },
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            message: 'Ingresa el nombre del predio',
            key: 3
        },
        {
            name: 'departamento',
            label: 'Departamento',
            type: 'text',
            message: 'Ingresa el departamento',
            key: 4
        },
        {
            name: 'municipio',
            label: 'Municipio',
            type: 'text',
            message: 'Ingresa el municipio',
            key: 5
        }
    ]
    return (
        <Form {...layout} name="predios" onFinish={onFinish}>
            {
                formData.map((item) => (
                    <Form.Item key={item.key} name={['predio', item.name]} label={item.label} rules={[{ required: true, type: item.type, message: item.message }]}>
                        {
                            item.type === 'number' ? <InputNumber required style={{width:260}} /> : <Input required type='text' />
                        }

                    </Form.Item>
                ))
            }
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className='button' type="primary" htmlType="submit">
                    Agregar predio
                </Button>
            </Form.Item>
        </Form>
    )
}
