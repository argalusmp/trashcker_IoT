import Table from "./Tabel";
import SampahTemp from "./table_temp/SampahTemp";

export default function Sampah() {
  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <Table>
        <SampahTemp />
      </Table>
    </div>
  );
}
