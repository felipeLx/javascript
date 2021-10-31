import Link from 'next/link'

const Navbar = () => (
    <section>
        <Link href='/'><a>Home</a></Link>
        <Link href='/about'><a>Quem somos</a></Link>
        <Link href='/services'><a>Serviços</a></Link>
    </section>
)

export default Navbar