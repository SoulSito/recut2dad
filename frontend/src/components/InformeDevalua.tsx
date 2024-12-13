//& Informe con el csv y pdf añadido

import React from "react";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface IProducto2 {
  articulo: string;
  meses: number;
  devaluacion: number;
}

const InformeDevalua: React.FC<{ deva: IProducto2[] }> = ({ deva }) => {
  const columns2: Array<Column<IProducto2>> = [
    { title: "Articulo", field: "articulo", filtering: true },
    { title: "Meses", field: "meses", type: "numeric", filtering: false },
    { title: "Devaluacion", field: "devaluacion", type: "numeric", filtering: false },
  ];

  return (
    <div style={{ maxWidth: "100%", marginTop: "20px" }}>
      <MaterialTable
        title="Informe de la Devaluacion"
        columns={columns2}
        data={deva}
        options={{
          filtering: true,
          columnsButton: true,
          draggable: true,
          paging: true,
          exportMenu: [
            {
              label: "Exportar a PDF",
              exportFunc: (cols, rows) => ExportPdf(cols, rows, "Informe_Devaluacion"),
            },
            {
              label: "Exportar a CSV",
              exportFunc: (cols, rows) => ExportCsv(cols, rows, "Informe_Devaluacion"),
            },
          ],
          headerStyle: {
            backgroundColor: "#1976d2",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          rowStyle: (_, index) => ({
            backgroundColor: index % 2 === 0 ? "#dark" : "#dark",
          }),
          searchFieldStyle: {
            borderRadius: "25px",
            padding: "5px 15px",
            fontSize: "16px",
          },
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "Buscar producto...",
            exportTitle: "Exportar",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Página siguiente",
            lastTooltip: "Última página",
          },
          header: {
            actions: "Acciones",
          },
        }}
      />
    </div>
  );
};

export default InformeDevalua;