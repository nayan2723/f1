import React from 'react';
import { createRoot } from 'react-dom/client';
import { DriverSelect } from './DriverSelect.jsx';
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

    // Mount PrimeReact DataTable conditionally
    const standingsContainer = document.getElementById('full-standings-react-root');
    if (standingsContainer) {
        import('./DriverStandingsTable.jsx').then(({ DriverStandingsTable }) => {
            const rootStandings = createRoot(standingsContainer);
            rootStandings.render(<DriverStandingsTable />);
        });
    }

    // Mount Personality Engine conditionally
    const quizContainer = document.getElementById('personality-quiz-root');
    if (quizContainer) {
        import('./PersonalityEntryPoint.jsx').then(({ PersonalityEntryPoint }) => {
            const rootQuiz = createRoot(quizContainer);
            rootQuiz.render(<PersonalityEntryPoint />);
        });
    }
});
