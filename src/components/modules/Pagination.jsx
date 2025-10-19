function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  const buttonClass =
    "w-16 md:w-20 bg-blue-600 text-white border-none py-1 px-2 rounded text-sm md:text-base cursor-pointer transition-all";
  const pageClass =
    "w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded border border-blue-600 text-sm md:text-base transition-all";
  const selectedClass = "bg-blue-600 text-white";
  const disabledClass = "opacity-30 cursor-not-allowed";

  return (
    <div className="w-full max-w-xs md:max-w-md flex justify-between gap-1 items-center mx-auto mb-16 md:mb-24 px-4">
      <button
        onClick={previousHandler}
        className={`${buttonClass} ${
          page === 1 ? disabledClass : "hover:bg-blue-700"
        }`}
        disabled={page === 1}
      >
        prev
      </button>

      {/* صفحات - برای موبایل فقط صفحات ضروری نمایش داده می‌شود */}
      <div className="flex items-center gap-1 md:gap-2">
        <p className={`${pageClass} ${page === 1 ? selectedClass : null}`}>1</p>

        <p className={`${pageClass} ${page === 2 ? selectedClass : null}`}>2</p>

        {page > 2 && page < 9 && (
          <>
            <span className="mx-1">...</span>
            <p className={`${pageClass} ${selectedClass}`}>{page}</p>
          </>
        )}

        <span className="mx-1">...</span>

        <p className={`${pageClass} ${page === 9 ? selectedClass : null}`}>9</p>

        <p className={`${pageClass} ${page === 10 ? selectedClass : null}`}>
          10
        </p>
      </div>

      <button
        onClick={nextHandler}
        className={`${buttonClass} ${
          page === 10 ? disabledClass : "hover:bg-blue-700"
        }`}
        disabled={page === 10}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
