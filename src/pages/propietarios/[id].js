/* import React from 'react';
import { useRouter } from 'next/router';
import { Descriptions } from 'antd';
import { useGetPropietarioQuery } from 'features/propietariosAPI';
export default function Propietario() {
    const router = useRouter()
    const { id } = router.query
    const { data, loading } = useGetPropietarioQuery(id)
    const propietario = data?.data.propietarios[0]
    return (
        <div className='container flex-row'>
            <Descriptions title="Información del propietario">
                {
                    propietario?.map((item)=>{
                        
                    })
                }
                <Descriptions.Item label="Nombres">{propietario.nombres}</Descriptions.Item>
                <Descriptions.Item label="Apellidos">{propietario.apellidos}</Descriptions.Item>
                <Descriptions.Item label="Correo electrónico">{}</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
 */