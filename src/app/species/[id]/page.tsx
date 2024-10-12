"use client"

import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOneSpecies } from "@/services/species";
import { DEFAULT_IMAGE_PLACEHOLDER_URL } from "@/types/constants";
import Image from "next/image";

interface SpeciesDetailProps {
    params: {
        id: string;
    }
}

export default function Page({ params }: SpeciesDetailProps) {
    const { data, isLoading } = useFetchOneSpecies(params.id);

    function getLoadingContent() {
        return (
            <Skeleton className="w-full h-32 border border-black">
                <div className="flex flex-col">
                    <Skeleton className="w-32 h-32
                    border border-black"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                    <Skeleton className="w-32 h-8"></Skeleton>
                </div>
            </Skeleton>
        )
    }
    return (
        <div className="min-w-full flex flex-col">
            <Header />
            <div className="w-full h-full grid grid-flow-row justify-center items-center">
                {isLoading ? getLoadingContent() :
                    <Card className="min-w-96 grid grid-flow-row justify-center text-center p-10 gap-y-4">
                        <Image className="mb-5 border" src={data?.imageUrl ?? DEFAULT_IMAGE_PLACEHOLDER_URL} alt={data?.indonesianName ?? ""} width={200} height={300} />
                        <div>{data?.faoCode}</div>
                        <div>{data?.typeOfFish}</div>
                        <div>{data?.scientificName}</div>
                        <div>{data?.englishName}</div>
                        <div>{data?.indonesianName}</div>
                        <div>{data?.localName}</div>
                        <div>{data?.typeOfWater}</div>
                        <div>{data?.statusInIndonesia}</div>
                        <div>{data?.fishUtilization}</div>
                    </Card>
                }
            </div>
        </div>
    )
}