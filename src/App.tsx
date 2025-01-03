import "./styles/common.css";
import "./styles/variables.css";
import AppRouter from "./route/AppRouter";
import { ReactQueryWrapper } from "./config/ReactQuery";

function App() {
  return (
    <ReactQueryWrapper>
      <AppRouter />
    </ReactQueryWrapper>
  );
}

export default App;
