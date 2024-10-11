import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import customTheme from "./theme";
import { Provider } from "react-redux";
import store from './Stores/store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={customTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
