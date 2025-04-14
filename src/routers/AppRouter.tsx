import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "constants/routes";
// Pages
import HomePage from "pages/Home";
// Components
import NotFoundPage from "pages/errors/NotFound";
// Utils and services
import {getPublicUrl} from "utils/url";

function AppRouter() {
    return (
        <BrowserRouter basename={getPublicUrl()}
            future={{
                v7_startTransition: true,   // Enables React`s transition API for Router v7
                v7_relativeSplatPath: true  // Updates relative path behavior for splat routes (*)
            }}
        >
            <Routes>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path={ROUTES.HOME} element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;