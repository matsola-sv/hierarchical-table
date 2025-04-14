import React, {FC} from "react";
// Components
import AppRouter from "routers/AppRouter";
// Styles
import 'components/App/App.css';

const App: FC = () => {
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}
export default App;