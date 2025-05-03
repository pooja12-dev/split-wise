import "./App.css";
import {Routing} from "./components/routing";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        const body = document.querySelector('body');

        const options = {
            attributes: true
        }

        function callback(mutationList) {
            mutationList.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (body.classList.contains("swal2-height-auto")) {
                        body.classList.remove("swal2-height-auto");
                    }
                }
            })
        }

        const observer = new MutationObserver(callback)
        observer.observe(body, options)
    }, []);

    return (
        <div className="h-100 d-flex w-100">
            <Routing/>
            <ToastContainer/>
        </div>
    );
}

export default App;
