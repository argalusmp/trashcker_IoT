"use client";
import Table from "./Tabel";
import UsersTemp from "./table_temp/UsersTemp";

export default function Users() {
  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <Table>
        <UsersTemp />
      </Table>
    </div>
  );
}
