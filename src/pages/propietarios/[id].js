import React from 'react';
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
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
