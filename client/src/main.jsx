import { App } from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </BrowserRouter>,
);
