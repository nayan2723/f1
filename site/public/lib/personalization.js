import { f1Auth, f1Db, f1GetDoc, f1SetDoc, f1Doc } from './firebase.js';

const teamAccentMap = {
    "Red Bull Racing": "#1E5BC6",
    "McLaren F1 Team": "#FF8000",
    "Scuderia Ferrari": "#DC0000",
    "Mercedes-AMG F1": "#00D2BE",
    "Aston Martin Aramco": "#006F62",
    "Williams Racing": "#005AFF",
    "BWT Alpine F1 Team": "#0090FF",
    "MoneyGram Haas F1 Team": "#FFFFFF",
    "Stake F1 Team Kick Sauber": "#2BFF00",
    "Visa Cash App RB": "#1E41FF",
    "Andretti Cadillac": "#C5A04F",
    "None": "var(--f1-red)" // Fallback identity
};

let currentFavoriteTeam = null;

// Apply UI Accent
export function applyTeamPersonalization(teamName) {
    if (!teamName || teamName === 'None') {
        document.documentElement.style.removeProperty('--team-accent');
        document.documentElement.style.removeProperty('--team-accent-glow');
        return;
    }

    const hexColor = teamAccentMap[teamName] || "var(--f1-red)";
    document.documentElement.style.setProperty('--team-accent', hexColor);

    // Convert hex to rgb for glow effect if needed, or just use hex
    // Simplest glow is fading the color slightly or passing it directly to a box-shadow
    document.documentElement.style.setProperty('--team-accent-glow', `${hexColor}40`);
}

// Fetch user document on Auth state change
export async function syncPersonalizationState(user) {
    if (!user) {
        currentFavoriteTeam = null;
        applyTeamPersonalization(null);
        return null;
    }
    try {
        const userRef = f1Doc('users', user.uid);
        const docSnap = await f1GetDoc(userRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            currentFavoriteTeam = data.favoriteTeam || 'None';

            if (currentFavoriteTeam === 'None') {
                openTeamModal();
            } else {
                applyTeamPersonalization(currentFavoriteTeam);
            }
            return currentFavoriteTeam;
        }
    } catch (e) {
        console.error("Error fetching personalization state", e);
    }
    return null;
}

// Modal Logic
const teamModal = document.getElementById('team-modal');
const teamCloseBtn = document.getElementById('team-close');
const teamGrid = document.getElementById('team-selector-grid');

export function openTeamModal() {
    if (!teamModal) return;
    teamModal.classList.remove('hidden');
    renderTeamGrid();
}

export function closeTeamModal() {
    if (!teamModal) return;
    teamModal.classList.add('hidden');
}

if (teamCloseBtn) teamCloseBtn.addEventListener('click', closeTeamModal);

function renderTeamGrid() {
    if (!teamGrid) return;
    const teams = Object.keys(teamAccentMap).filter(t => t !== 'None');

    teamGrid.innerHTML = teams.map(btnTeam => {
        const color = teamAccentMap[btnTeam];
        return `
        <button class="team-select-btn" data-team="${btnTeam}">
          <div class="team-color-indicator" style="background: ${color}; width: 16px; height: 16px; border-radius: 50%; margin-right: 12px; display: inline-block;"></div>
          <span class="team-name" style="color: white; font-weight: 500;">${btnTeam}</span>
        </button>
      `;
    }).join('');

    teamGrid.querySelectorAll('.team-select-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const selectedTeam = e.currentTarget.dataset.team;
            if (f1Auth.currentUser) {
                try {
                    const userRef = f1Doc('users', f1Auth.currentUser.uid);
                    await f1SetDoc(userRef, { favoriteTeam: selectedTeam }, { merge: true });
                    currentFavoriteTeam = selectedTeam;
                    applyTeamPersonalization(selectedTeam);

                    // Dispatch a custom event so the UI can update the dropdown if needed
                    window.dispatchEvent(new CustomEvent('f1TeamChanged', { detail: { team: selectedTeam } }));
                } catch (err) {
                    console.error("Error setting team.", err);
                }
            }
            closeTeamModal();
        });
    });
}
