import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import VehicleModelStore from '../Stores/VehicleModelStore';

export default function ModelTable() {
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines & controls grid columns
    const columnDefs = [
        { headerName: 'Model', field: 'Name' },
        { headerName: 'Abreviation', field: 'Abrv' },
        { field: 'Id' },
        { field: 'MakeId' },
    ];

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
        }),
        []
    );

    const autoSizeStrategy = {
        type: 'fitCellContents',
    };

    // Get Model data to display in rows
    useEffect(() => {
        VehicleModelStore.getVehicleModels().then(() => setRowData(VehicleModelStore.vehicleModels));
    }, []);

    return (
        <div>
            <div className="ag-theme-alpine-dark" style={{ paddingBottom: '2%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination
                    paginationPageSize={5}
                    paginationPageSizeSelector={[2, 5, 10]}
                    autoSizeStrategy={autoSizeStrategy}
                    domLayout="autoHeight"
                />
            </div>
        </div>
    );
}
