//& Informe con el csv y pdf añadido

import React from "react";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface IProducto {
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const InformeColeccion: React.FC<{ data: IProducto[] }> = ({ data }) => {
  const columns: Array<Column<IProducto>> = [
    { title: "Nombre", field: "nombre" },
    { title: "Marca", field: "marca", filtering: true },
    { title: "Tipo", field: "tipo", filtering: true },
    { title: "Precio (€)", field: "precio", type: "numeric" },
  ];

  return (
    <div style={{ maxWidth: "100%", marginTop: "20px" }}>
      <MaterialTable
        title="Informe de la Colección de Productos"
        columns={columns}
        data={data}
        options={{
          filtering: true,
          columnsButton: true,
          draggable: true,
          paging: true,
          exportMenu: [
            {
              label: "Exportar a PDF",
              exportFunc: (cols, rows) => ExportPdf(cols, rows, "Informe_Coleccion"),
            },
            {
              label: "Exportar a CSV",
              exportFunc: (cols, rows) => ExportCsv(cols, rows, "Informe_Coleccion"),
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
        renderSummaryRow={({ column, data }) =>
          column.field === "precio"
            ? {
                value: data.reduce((total, row) => total + row.precio, 0),
                style: { backgroundColor: "dark", fontWeight: "bold", color: "#1976d2" },
              }
            : undefined
        }
      />
    </div>
  );
};

export default InformeColeccion;