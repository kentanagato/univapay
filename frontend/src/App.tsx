import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const token = "<管理画面で取得できるAPP_TOKEN_ID>";

  const [tokenId, setTokenId] = useState("");
  const mounted = useRef(false);
  useEffect(() => {
    // StrictMode無視
    if (mounted.current) {
      return;
    }
    mounted.current = true;

    const head = document.getElementsByTagName("head")[0] as HTMLElement;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://widget.univapay.com/client/checkout.js";
    head.appendChild(script);

    window.addEventListener(
      "univapay:opened",
      (e) => {
        console.info("opened", e);
      },
      false
    );
    window.addEventListener(
      "univapay:success",
      (e) => {
        console.info("success ", e);
      },
      false
    );
    window.addEventListener(
      "univapay:error",
      (e) => {
        console.info("error ", e);
      },
      false
    );
    window.addEventListener(
      "univapay:token-created",
      (e) => {
        console.info("token-created ", e);
      },
      false
    );
  }, []);

  const handleSubmit = () => {
    var iFrame = document.querySelector("#checkout iframe");

    // @ts-ignore
    UnivapayCheckout.submit(iFrame)
      .then((data: any) => {
        console.log(data);
        setTokenId(data.transactionToken);
      })
      .catch((errors: any) => {
        console.error(errors);
      });
  };

  return (
    <div className="App">
      <form id="payment-form">
        <div id="checkout">
          <span
            data-app-id={token}
            data-checkout="token"
            data-inline="true"
            data-token-type="recurring"
            data-
          ></span>
        </div>
      </form>
      <button onClick={handleSubmit}>submit</button>
      <p>token id: {tokenId}</p>
    </div>
  );
}

export default App;
