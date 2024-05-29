import Table from "./Tabel";
import LaporanTemp from "./table_temp/LaporanTemp";

export default function Laporan() {
  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <div className="px-6 pt-1 bg-outline-color-theme rounded-2xl shadow-[10px_15px_4px_0_rgba(0,0,0,0.3)]">
        <Table>
          <LaporanTemp />
        </Table>
      </div>
    </div>
  );
}
