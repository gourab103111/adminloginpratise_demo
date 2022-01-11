
import { Route,Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import {useLoginReducer } from '../pages/login/Login.reducer'
import {useLoginContext } from '../context/Logincontextprovider'
import Createcourse from '../pages/Createcourse/Createcourse';
import Listscourses from '../pages/Createcourse/Listscourses';
import {Dashboardnavigation} from '../component/Dashboardnavigation';

const Loginroutes = () =>{
    const { isUserLogin} =    useLoginContext();
 
    return isUserLogin?(

        <>
           <Dashboardnavigation />

           <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/createcourse" element={<Createcourse />} />
            <Route path="/courselists" element={<Listscourses />} />
           </Routes>


        </>
        
        ):(

        <Routes>
           <Route exact  path="/" element={<Login/>} />
        </Routes>
        
    );
}

export default Loginroutes;