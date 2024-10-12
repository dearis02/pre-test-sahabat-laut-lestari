"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useFetchAllSpecies } from "@/services/species";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PaginationData } from "../PaginationData";
import { GetAllSpeciesFilter } from "@/types/species";

export default function Home() {
    const [filter, setFilter] = useState<GetAllSpeciesFilter>({
        PageNumber: 1,
        PageSize: 30,
    });

    const { data, isFetching, refetch } = useFetchAllSpecies(filter);

    function getItemNumber(index: number) {
        return ++index + (((data?.pageNumber ?? filter.PageNumber) - 1) * (data?.pageSize ?? filter.PageSize));
    }

    const imgPLaceHolderURL = "https://via.placeholder.com/100";

    function renderSpecies() {
        if (data?.data.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={11} className="text-center">No data found</TableCell>
                </TableRow>
            );
        } else {
            return data?.data.map((species, i) => (
                <TableRow key={species.id}>
                    <TableCell className="font-medium">{getItemNumber(i)}</TableCell>
                    <TableCell>
                        <Image src={species.imageUrl ?? imgPLaceHolderURL} alt="" width={100} height={100} />
                    </TableCell>
                    <TableCell>{species.faoCode}</TableCell>
                    <TableCell>{species.typeOfFish}</TableCell>
                    <TableCell>{species.scientificName}</TableCell>
                    <TableCell>{species.englishName}</TableCell>
                    <TableCell>{species.indonesianName}</TableCell>
                    <TableCell>{species.localName}</TableCell>
                    <TableCell>{species.typeOfWater}</TableCell>
                    <TableCell>{species.statusInIndonesia}</TableCell>
                    <TableCell>{species.fishUtilization}</TableCell>
                </TableRow>
            ));
        }
    }

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    function onPageChange(page: number) {
        setFilter({
            ...filter,
            PageNumber: page
        })
    }

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        refetch();
    }, [filter.PageNumber, refetch]);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            if (filter.Keyword?.trim() !== "") {
                refetch();
            }
        }, 500);
    }, [filter.Keyword, refetch]);

    return (
        <div className="w-full grid place-content-start">
            <h1 className="font-bold text-4xl mb-20 justify-self-center">Species</h1>
            <Input type="text" className="w-full max-w-md place-self-start mb-4 border border-black focus:border-none"
                placeholder="search...."
                onChange={(e) => setFilter({
                    ...filter,
                    Keyword: e.target.value === "" ? undefined : e.target.value,
                    PageNumber: 1
                })} />
            <Table className="border border-slate-400 w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>FAO Code</TableHead>
                        <TableHead>Type of Fish</TableHead>
                        <TableHead>Scientific Name</TableHead>
                        <TableHead>English Name</TableHead>
                        <TableHead>Indonesian Name</TableHead>
                        <TableHead>Local Name</TableHead>
                        <TableHead>Type of Water</TableHead>
                        <TableHead>Status in Indonesia</TableHead>
                        <TableHead>Fish Utilization</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {renderSpecies()}
                    {isFetching && (
                        <>
                            <TableRow>
                                <TableCell colSpan={11}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={11}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={11}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={11}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
            <PaginationData
                className="w-full mx-auto mt-10"
                totalPages={data?.totalPages ?? 0}
                pageSize={data?.pageSize ?? 0}
                currentPage={data?.pageNumber ?? 1}
                nextPageLink={data?.nextPage ?? null}
                prevPageLink={data?.previousPage ?? null}
                onPageChange={onPageChange}
            />
        </div>
    );
}
