import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withNavigation from './WithNavigation.jsx'
import ErrorComponent from './ErrorComponent.jsx';
import withParams from './withParams.jsx';
import ElimComponent from './ElimComponent.jsx';
import KutamaComponent from './KutamaComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LoginComponent from './LoginComponent.jsx';
import HeaderComponent from './HeaderComponent';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import KutamaUpdate from './KutamaUpdate.jsx';
import ElimUpdate from './ElimUpdate.jsx';
// import KutamaEdit from './Kutama/KutamaEdit.jsx';
// import KutamaDelete from './Kutama/KutamaDelete.jsx'
// import ElimDelete from './Elim/ElimDelete.jsx'
// import ElimEdit from './Elim/ElimEdit'

class BoreholeApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const KutamaComponentWithNavigation = withNavigation(KutamaComponent);
        const ElimComponentWithNavigation = withNavigation(ElimComponent);
        const KutamaUpdateWithNavigationWithParamsAndNavigation = withParams(withNavigation(KutamaUpdate));
        const ElimUpdateWithNavigationWithParamsAndNavigation = withParams(withNavigation(ElimUpdate));
        // const KutamaEditWithNavigationWithParamsAndNavigation = withParams(withNavigation(KutamaEdit));
        // const KutamaDeleteWithNavigationWithParamsAndNavigation = withParams(withNavigation(KutamaDelete));
        // const ElimDeleteWithNavigationWithParamsAndNavigation = withParams(withNavigation(ElimDelete));
        // const ElimEditWithNavigationWithParamsAndNavigation = withParams(withNavigation(ElimEdit));


        return (
            <div className='BoreholeApp'>
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="/kutama" element={<AuthenticatedRoute><KutamaComponentWithNavigation/></AuthenticatedRoute>} />
                        {/* <Route path="/kutama-edit" element={<AuthenticatedRoute><KutamaEditWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} />
                        <Route path="/kutama-delete" element={<AuthenticatedRoute><KutamaDeleteWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} /> */}
                        <Route path="/kutama/:id" element={<AuthenticatedRoute><KutamaUpdateWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} />
                        <Route path="/elim-satellite/:id" element={<AuthenticatedRoute><ElimUpdateWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} />
                        <Route path="/elim-satellite" element={<AuthenticatedRoute><ElimComponentWithNavigation/></AuthenticatedRoute>} />
                        {/* <Route path="/elim-satellite-delete" element={<AuthenticatedRoute><ElimDeleteWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} />
                        <Route path="/elim-edit" element={<AuthenticatedRoute><ElimEditWithNavigationWithParamsAndNavigation/></AuthenticatedRoute>} /> */}
                        <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                </Router>
            </div>
        )
    }
}

export default BoreholeApp