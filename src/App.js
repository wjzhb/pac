import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home'

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* 路由精确匹配"/home"，跳转Home页面 */}
                <Route exact path="/home" element={<Home />} />
                {/* 未匹配，则跳转Login页面 */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </HashRouter>
    )
}

export default App