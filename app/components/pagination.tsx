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
      const isActive = (index + 1) === currentPage;
      const classes = `p-6 font-bold ${(isActive === true) ? "border-b border-white" : ""}`
      allButtons.push(<button onClick={() => changePage(index + 1)} className={classes}>{ index + 1}</button>)
    }
    return allButtons;
  })()}
  return allButtons
}

export default Pagination