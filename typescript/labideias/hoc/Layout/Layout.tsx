import Navigation from '../../components/Navigation/Navbar'
import Footer from '../../components/Footer/Footer'
import Aux from '../Aux/Aux'

const Layout = (props: any) => (
    <Aux>
        <Navigation />
        {props.children}
        <Footer />
    </Aux>
)

export default Layout