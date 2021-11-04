import { Switch, Route } from 'react-router-dom';
import Home from "../home/home";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="" component={Home} />
            </Switch>
        </main>
    )
};
export default Main;