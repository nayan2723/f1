import { f1Auth, f1Db, f1Doc, f1SetDoc } from './lib/firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const driverASelect = document.getElementById('driver-a-select');
    const driverBSelect = document.getElementById('driver-b-select');
    const barsContainer = document.getElementById('compare-bars-container');
    const ctx = document.getElementById('compareRadarChart');

    if (!window.F1Data || !driverASelect || !ctx) return;

    const drivers = window.F1Data.drivers;
    let radarChart = null;

    // Initialize Selects
    const optionsHTML = drivers.map(d => `<option value="${d.id}">${d.name} (${d.team})</option>`).join('');
    driverASelect.innerHTML = optionsHTML;
    driverBSelect.innerHTML = optionsHTML;

    // Default initial pair (e.g., VER vs NOR)
    driverASelect.value = 'ver';
    driverBSelect.value = 'nor';

    // Memoization state
    let lastA = '', lastB = '';

    const renderComparison = () => {
        const valA = driverASelect.value;
        const valB = driverBSelect.value;

        if (valA === valB || (valA === lastA && valB === lastB)) return;

        lastA = valA; lastB = valB;

        const drvA = drivers.find(d => d.id === valA);
        const drvB = drivers.find(d => d.id === valB);
        const colorA = window.F1Data.getTeamColor(drvA.team);
        const colorB = window.F1Data.getTeamColor(drvB.team);

        // Render Animated Bars
        const metrics = [
            { label: 'Wins', key: 'wins', max: 60 },
            { label: 'Podiums', key: 'podiums', max: 120 },
            { label: 'Poles', key: 'poles', max: 50 },
            { label: 'Points (2026)', key: 'pts', max: 400 },
            { label: 'Consistency %', key: 'consistency', max: 100 }
        ];

        barsContainer.innerHTML = metrics.map(m => {
            // Mock consistency if missing
            const aVal = drvA[m.key] !== undefined ? drvA[m.key] : Math.floor(Math.random() * 40 + 60);
            const bVal = drvB[m.key] !== undefined ? drvB[m.key] : Math.floor(Math.random() * 40 + 60);

            const pctA = Math.min((aVal / m.max) * 100, 100);
            const pctB = Math.min((bVal / m.max) * 100, 100);

            const aWin = aVal > bVal;
            const bWin = bVal > aVal;

            return `
        <div class="compare-metric">
          <div style="display:flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase;">
             <span style="color: ${aWin ? '#fff' : ''}">${drvA.code} • ${aVal}</span>
             <span>${m.label}</span>
             <span style="color: ${bWin ? '#fff' : ''}">${bVal} • ${drvB.code}</span>
          </div>
          <div style="display: flex; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
             <div style="width: 50%; display: flex; justify-content: flex-end; padding-right: 2px;">
                <div style="width: ${pctA}%; background: ${colorA}; transition: width 0.8s easeOutQuart; border-radius: 4px 0 0 4px;"></div>
             </div>
             <div style="width: 50%; display: flex; justify-content: flex-start; padding-left: 2px;">
                <div style="width: ${pctB}%; background: ${colorB}; transition: width 0.8s easeOutQuart; border-radius: 0 4px 4px 0;"></div>
             </div>
          </div>
        </div>
      `;
        }).join('');

        // Update Radar Chart
        const radarData = {
            labels: ['Pace', 'Racecraft', 'Consistency', 'Experience', 'Qualifying', 'Rain'],
            datasets: [
                {
                    label: drvA.name,
                    data: generateMockRatings(drvA),
                    backgroundColor: `${colorA}40`,
                    borderColor: colorA,
                    borderWidth: 2,
                    pointBackgroundColor: colorA
                },
                {
                    label: drvB.name,
                    data: generateMockRatings(drvB),
                    backgroundColor: `${colorB}40`,
                    borderColor: colorB,
                    borderWidth: 2,
                    pointBackgroundColor: colorB
                }
            ]
        };

        if (radarChart) {
            radarChart.data = radarData;
            radarChart.update();
        } else {
            radarChart = new Chart(ctx, {
                type: 'radar',
                data: radarData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            pointLabels: { color: 'var(--text-secondary)', font: { family: 'Inter', size: 11 } },
                            ticks: { display: false, min: 60, max: 100 }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#fff', font: { family: 'Inter' } }
                        }
                    }
                }
            });
        }

        // Save to Firestore (Fire-and-forget, non-blocking)
        if (f1Auth && f1Auth.currentUser) {
            f1SetDoc(f1Doc('users', f1Auth.currentUser.uid + '/history/lastCompare'), {
                driverA: valA,
                driverB: valB,
                timestamp: new Date().toISOString()
            }, { merge: true }).catch(() => { }); // silent fail offline
        }
    };

    function generateMockRatings(drv) {
        // Generate deterministic mock ratings out of 100 based on driver pts
        const base = Math.min(drv.pts / 2, 99);
        return [
            Math.max(60, Math.min(99, base + (drv.wins * 2))), // Pace
            Math.max(60, Math.min(99, base + (drv.podiums * 1.5))), // Racecraft
            Math.max(60, Math.min(99, 90 - (drv.dnfs * 5))), // Consistency
            Math.max(60, Math.min(99, 70 + (drv.wins))), // Experience
            Math.max(60, Math.min(99, base + (drv.poles * 2))), // Quali
            Math.floor(Math.random() * 20 + 75) // Rain (randomized mock)
        ];
    }

    driverASelect.addEventListener('change', renderComparison);
    driverBSelect.addEventListener('change', renderComparison);

    // Initial Render
    renderComparison();
});
