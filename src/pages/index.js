import Link from 'next/link';
import { RightCircleOutlined } from '@ant-design/icons';

export default function Home() {
  return (
    <div className="container flex-column hero">
      <h2 className='h2-hero'>
        Bienvenido a CATASTRO
      </h2>
      <Link href='/predios' className='calltoaction'>
        Empieza a buscar predios
        <RightCircleOutlined style={{ marginLeft: '12px' }} />
      </Link>
    </div>
  )
}
