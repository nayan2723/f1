import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// We import the Lara dark theme, but we will override its CSS variables in islands.css
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export function DriverStandingsTable() {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        // Poll for F1Data
        const loadData = () => {
            if (window.F1Data) {
                setDrivers(window.F1Data.getSortedDrivers());
            } else {
                setTimeout(loadData, 100);
            }
        };
        loadData();
    }, []);

    const posTemplate = (rowData) => {
        return <span className={`pos-cell font-mono text-xs ${rowData.pos <= 3 ? 'text-white font-bold' : 'text-white/40'}`}>{rowData.pos}</span>;
    };

    const driverTemplate = (rowData) => {
        const tc = window.F1Data.getTeamColor(rowData.team);
        return (
            <div className="driver-cell flex items-center gap-3">
                <span className="team-color-bar shadow-sm" style={{ background: tc, width: '4px', height: '24px', display: 'inline-block', borderRadius: '2px', boxShadow: `0 0 10px ${tc}80` }}></span>
                <span className="driver-name font-black text-white text-base tracking-tight">{rowData.name}</span>
                <span className="driver-code text-white/50 text-xs tracking-wider md:inline hidden">{rowData.code}</span>
            </div>
        );
    };

    const teamTemplate = (rowData) => {
        return <span className="team-cell text-white/70">{window.F1Data.getTeamName(rowData.team)}</span>;
    };

    const pointsTemplate = (rowData) => {
        if (rowData.pts === 0) {
            return <span className="points-cell font-orbitron font-bold text-white/30">{rowData.pts}</span>;
        }
        return (
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: rowData.pos * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                className="points-cell font-orbitron font-bold text-white"
            >
                {rowData.pts}
            </motion.span>
        );
    };

    return (
        <div className="primereact-table-container custom-f1-table">
            <DataTable value={drivers} responsiveLayout="scroll"
                paginator rows={10} rowsPerPageOptions={[10, 22]}
                stripedRows
                emptyMessage="Loading driver standings..."
                className="w-full text-sm"
                rowClassName={(rowData) => rowData.pos <= 3 ? 'top-3-row' : ''}>
                <Column field="pos" header="POS" body={posTemplate} sortable className="w-[80px] px-4 py-3 border-b border-white/5" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 uppercase" />
                <Column field="name" header="DRIVER" body={driverTemplate} sortable className="px-4 py-3 border-b border-white/5" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 uppercase" />
                <Column field="team" header="TEAM" body={teamTemplate} sortable className="px-4 py-3 border-b border-white/5 hidden sm:table-cell" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 uppercase hidden sm:table-cell" />
                <Column field="pts" header="PTS" body={pointsTemplate} sortable className="px-4 py-3 border-b border-white/5" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 uppercase" />
                <Column field="wins" header="WINS" sortable className="px-4 py-3 border-b border-white/5 hidden md:table-cell text-white/70" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 hidden md:table-cell uppercase" />
                <Column field="podiums" header="PODIUMS" sortable className="px-4 py-3 border-b border-white/5 hidden lg:table-cell text-white/70" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 hidden lg:table-cell uppercase" />
                <Column field="dnfs" header="DNFs" sortable className="px-4 py-3 border-b border-white/5 hidden lg:table-cell text-white/70" headerClassName="text-white/50 font-bold tracking-wider text-xs px-4 py-3 border-b border-white/10 hidden lg:table-cell uppercase" />
            </DataTable>
        </div>
    );
}
