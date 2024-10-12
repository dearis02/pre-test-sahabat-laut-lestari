import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export interface PaginationDataProps {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    nextPageLink: string | null;
    prevPageLink: string | null;
    className?: string;
    onPageChange: (page: number) => void;
}

export function PaginationData(props: PaginationDataProps) {
    const paginationData = Array.from({ length: props.totalPages }, (_, i) => i + 1);

    return (
        <Pagination className={props.className}>
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => props.onPageChange(props.currentPage === 1 ? 1 : props.currentPage - 1)} />
                </PaginationItem>
                {paginationData.map((page, index) => (
                    <PaginationItem key={index} className="cursor-pointer hover:[border, border-gray-900 ]">
                        <PaginationLink onClick={() => props.onPageChange(page)} className={page === props.currentPage ? "bg-slate-300 border border-slate-300" : ""}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => props.onPageChange(props.currentPage === props.totalPages ? props.totalPages : props.currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
