import { Outlet, Link } from 'react-router-dom';
import '../index.css';

export default function Root() {
    return (
        <div
            style={{
                margin: 'auto',
                marginTop: '2%',
                display: 'flex',
                flexDirection: 'column',
                placeItems: 'center',
                width: '100vw',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <div style={{ paddingBottom: '1%' }}>
                <Link to={-1}>Back</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
