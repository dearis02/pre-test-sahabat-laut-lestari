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
import { useDeleteSpecies, useFetchAllSpecies } from "@/services/species";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PaginationData } from "../PaginationData";
import { GetAllSpeciesFilter, GetAllSpeciesRes } from "@/types/species";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { SpeciesForm } from "../form/SpeciesForm";
import { useToast } from "@/hooks/use-toast";
import { isUserLoggedIn } from "@/services/auth";
import { useRouter } from 'next/navigation';
import { useStore } from "@nanostores/react";
import { $isLoggedIn } from "@/stores/auth";
import LoadingButton from "../LoadingButton";

export default function Home() {
    const [selectedSpecies, setSelectedSpecies] = useState<GetAllSpeciesRes>();
    const [filter, setFilter] = useState<GetAllSpeciesFilter>({
        PageNumber: 1,
        PageSize: 30,
    });
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const isLogIn = useStore($isLoggedIn)

    const { data, isFetching, refetch } = useFetchAllSpecies(filter);

    const { toast } = useToast()

    function getItemNumber(index: number) {
        return ++index + (((data?.pageNumber ?? filter.PageNumber) - 1) * (data?.pageSize ?? filter.PageSize));
    }

    const router = useRouter();

    function handleOnRowClick(id: string) {
        router.push(`/species/${id}`);
    }

    function handleOnEditClick(data: GetAllSpeciesRes) {
        setSelectedSpecies(data);
        handleToggleModal(true);
    }

    const { mutate: mutateDelete, isSuccess: isSuccessDelete, isPending: isPendingDelete } = useDeleteSpecies();

    function onDeleteClick(data: GetAllSpeciesRes) {
        setSelectedSpecies(data);
        handleToggleDeleteModal(true);
    }

    function handleOnDelete(id: string | undefined) {
        if (id) {
            mutateDelete(id)
        }
    }

    function handleToggleModal(isOpen: boolean) {
        setIsOpenCreateModal(isOpen);
    }

    function handleToggleDeleteModal(isOpen: boolean) {
        setIsOpenDeleteModal(isOpen);
    }

    function onSuccessAction(isUpdateAction: boolean) {
        handleToggleModal(false);
        if (isUpdateAction) {
            toast({
                description: "Species has been updated",
                duration: 3000,
                variant: "default",
            })
        } else {

            toast({
                description: "New species has been created",
                duration: 3000,
                variant: "default",
            })
        }
        refetch();
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
                <TableRow key={species.id} className="hover:cursor-pointer" onClick={() => handleOnRowClick(species.id)}>
                    <TableCell className="font-medium">{getItemNumber(i)}</TableCell>
                    <TableCell>
                        <Image src={species.imageUrl ?? imgPLaceHolderURL} alt="" width={100} height={100} />
                    </TableCell>
                    <TableCell>{species.faoCode}</TableCell>
                    <TableCell>{species.typeOfFish}</TableCell>
                    <TableCell>{species.scientificName}</TableCell>
                    <TableCell>{species.englishName}</TableCell>
                    {isLoggedIn && (
                        <TableCell className="flex gap-x-1">
                            <Button className="w-fit bg-blue-400 text-white font-bold hover:bg-blue-500" onClick={
                                (e) => {
                                    e.stopPropagation();
                                    handleOnEditClick(species);
                                }}>Edit</Button>
                            <Button className="w-fit bg-red-400 text-white font-bold hover:bg-red-500" onClick={
                                (e) => {
                                    e.stopPropagation();
                                    onDeleteClick(species);
                                }
                            }>Delete</Button>
                        </TableCell>
                    )}
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
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            refetch();
        }, 500);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [filter.Keyword, filter.PageNumber]);

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn());
    }, [isLogIn])

    useEffect(() => {
        if (isSuccessDelete) {
            handleToggleDeleteModal(false);
            toast({
                description: `Species with code ${selectedSpecies?.faoCode} has been deleted`,
                duration: 3000,
                variant: "default",
            })
            refetch();
        }
    }, [isSuccessDelete])

    return (
        <div className="w-full grid place-items-center px-20 my-20">
            <h1 className="font-bold text-4xl mb-20 justify-self-center">Species</h1>
            <div className="w-full flex flex-row flex-wrap justify-between">
                <Input type="text" className="w-full max-w-md place-self-start mb-4 border border-black focus:border-none"
                    placeholder="search...."
                    onChange={(e) => setFilter({
                        ...filter,
                        Keyword: e.target.value === "" ? undefined : e.target.value,
                        PageNumber: 1
                    })} />
                {isLoggedIn &&
                    <Button className="bg-green-400 text-white font-bold hover:bg-green-500" onClick={() => {
                        handleToggleModal(true)
                        setSelectedSpecies(undefined)
                    }
                    }>Create</Button>
                }
            </div>
            <Table className="border border-slate-400 w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>FAO Code</TableHead>
                        <TableHead>Type of Fish</TableHead>
                        <TableHead>Scientific Name</TableHead>
                        <TableHead>English Name</TableHead>
                        {isLoggedIn && <TableHead>Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isFetching ? (
                        <>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Skeleton className="w-full h-10 border border-black rounded-none" />
                                </TableCell>
                            </TableRow>
                        </>
                    ) : renderSpecies()
                    }
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
            {/* CREATE / UPDATE MODAL */}
            <Modal isOpen={isOpenCreateModal} modalTitle="Store New Species" toggleModal={handleToggleModal}>
                <SpeciesForm onSuccess={onSuccessAction} data={selectedSpecies} />
            </Modal>

            {/* DELETE MODAL */}
            <Modal isOpen={isOpenDeleteModal} modalTitle="Delete Species" toggleModal={handleToggleDeleteModal}>
                <div className="w-full grid place-items-center">
                    <p className="text-center">Are you sure want to delete this species?</p>
                    <div className="flex gap-x-4 mt-4">
                        {!isPendingDelete ?
                            <Button className="bg-red-400 text-white font-bold hover:bg-red-500" onClick={() => handleOnDelete(selectedSpecies?.id)}>Yes</Button>

                            : <LoadingButton className="bg-red-400 text-white font-bold hover:bg-red-500" />}
                        <Button className="bg-green-400 text-white font-bold hover:bg-green-500" disabled={isPendingDelete}>No</Button>
                    </div>
                </div>
            </Modal>
        </div >
    );
}
