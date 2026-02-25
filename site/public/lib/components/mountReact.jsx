import React from 'react';
import { createRoot } from 'react-dom/client';
import { DriverSelect } from './DriverSelect.jsx';
import { AuthDialog } from './AuthDialog.jsx';
import './islands.css';

// Wait for F1Data and DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const drivers = window.F1Data ? window.F1Data.drivers : [];

    // Mount Driver A Select
    const containerA = document.getElementById('radix-driver-a');
    if (containerA && drivers.length > 0) {
        const rootA = createRoot(containerA);
        rootA.render(
            <DriverSelect
                id="driver-a-select"
                drivers={drivers}
                initialValue="ver"
            />
        );
    }

    // Mount Driver B Select
    const containerB = document.getElementById('radix-driver-b');
    if (containerB && drivers.length > 0) {
        const rootB = createRoot(containerB);
        rootB.render(
            <DriverSelect
                id="driver-b-select"
                drivers={drivers}
                initialValue="nor"
            />
        );
    }

    // Mount Auth Dialog globally
    let authContainer = document.getElementById('auth-react-root');
    if (!authContainer) {
        authContainer = document.createElement('div');
        authContainer.id = 'auth-react-root';
        document.body.appendChild(authContainer);
    }
    const rootAuth = createRoot(authContainer);
    rootAuth.render(<AuthDialog />);

    // Mount PrimeReact DataTable conditionally
    const standingsContainer = document.getElementById('full-standings-react-root');
    if (standingsContainer) {
        import('./DriverStandingsTable.jsx').then(({ DriverStandingsTable }) => {
            const rootStandings = createRoot(standingsContainer);
            rootStandings.render(<DriverStandingsTable />);
        });
    }
});
