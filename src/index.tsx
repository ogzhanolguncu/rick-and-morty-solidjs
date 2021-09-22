import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

//@ts-expect-error
render(() => <App />, document.getElementById("root"));
