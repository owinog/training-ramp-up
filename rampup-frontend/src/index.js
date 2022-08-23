import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                {/* <Provider store={store}> */}
                <App />
                {/* </Provider> */}
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
