import Header from "../components/Header"
import Promo from "../components/Promo"
import Products from "@/components/Products";
import Banner from "@/components/Banner";
import Partner from "../components/Partner"
import FeedBack from "../components/Feedback"
import Footer from "@/components/Footer";


const Home = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Banner></Banner>
                <Promo></Promo>
                <Products></Products>
                <FeedBack></FeedBack>
                <Partner></Partner>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Home;