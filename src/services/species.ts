import { useQuery } from "@tanstack/react-query";
import { GetAllSpeciesFilter, GetAllSpeciesRes } from "@/types/species";
import { PaginatedResponse } from "@/types/pagination";
import api from "@/utils/api";

function useFetchAllSpecies(req: GetAllSpeciesFilter) {
    const query = useQuery({
        queryKey: [req],
        queryFn: async () => getAllSpecies(req),
        enabled: false,
    });

    return query;
}

async function getAllSpecies(req: GetAllSpeciesFilter): Promise<PaginatedResponse<GetAllSpeciesRes>> {
    return await api.get("/species", { params: req });
}

export { useFetchAllSpecies };