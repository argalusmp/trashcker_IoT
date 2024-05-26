import Table from "./Tabel";
import LaporanTemp from "./table_temp/LaporanTemp";

export default function Laporan() {
  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <Table>
        <LaporanTemp />
      </Table>
    </div>
  );
}
