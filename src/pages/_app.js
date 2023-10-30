// import library
import { ToastContainer } from "react-toastify";

// import common
import Provider from "@/store/index";

// import styles
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.scss";

function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
