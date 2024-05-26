import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <>
      <div className="px-6 pt-1 bg-outline-color-theme">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {children}
          </table>
        </div>
      </div>
    </>
  );
}
