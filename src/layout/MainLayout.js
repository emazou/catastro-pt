import Link from "next/link";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import { Toaster } from "react-hot-toast";
export default function MainLayout({ children }) {
    return (
        <>
            <Layout>
                <Header className="header flex-row">
                    <Link href='/' className="navbar">Inicio</Link>
                    <img src="https://i.ibb.co/VpnQLRv/colombia.png" />
                    <Link href='/predios' className="navbar">Predios</Link>
                </Header>
                <Content>
                    {children}
                    <Toaster />
                    </Content>
                <Footer className="footer flex-row">Hecho por Estefania 💛</Footer>
            </Layout>
        </>
    )
}
