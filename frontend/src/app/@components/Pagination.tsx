import { Arrow2Left, Arrow2Right } from "@/icons";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        className="rounded bg-none px-3 py-1 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <Arrow2Left className="" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`rounded-xl px-3 py-1 font-bold transition ${
            currentPage === i + 1
              ? "bg-primary text-white"
              : "bg-white hover:bg-green-200 dark:bg-dark-2 dark:hover:bg-dark-3"
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="rounded bg-none px-3 py-1 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <Arrow2Right color="dark:bg-" />
      </button>
    </div>
  );
}
