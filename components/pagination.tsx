"use client";
import { useRouter } from 'next/navigation';

const Pagination = ({pages, currentPage}: { pages: number, currentPage: number }) => {
    
  const router = useRouter();

  const changePage = (page: number) => {
    router.push(`/?page=${page}`)
  }

  const allButtons = [];
  {(() => {
    for (let index = 0; index < pages; index++) {

      if (index < 3) {
        const isActive = (index + 1) === currentPage;
        const classes = `p-3 md:p-6 font-bold hover:scale-125 ${(isActive === true) ? "border-b border-white" : ""}`;
        allButtons.push(<button key={index} onClick={() => changePage(index + 1)} className={classes}>{ index + 1}</button>);
        if (index === 2 && pages > 6) {
          allButtons.push(<button key={index + 1} className="p-6 font-bold cursor-default">...</button>);
        }
      }

      if (index > 2 && index >= (pages - 3)) {
        const isActive = (index + 1) === currentPage;
        const classes = `p-3 md:p-6 font-bold hover:scale-125 ${(isActive === true) ? "border-b border-white" : ""}`;
        allButtons.push(<button key={index} onClick={() => changePage(index + 1)} className={classes}>{ index + 1}</button>);
      }

    }
    return allButtons;
  })()}

  return allButtons
}

export default Pagination;