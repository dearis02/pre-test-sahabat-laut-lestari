import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSpeciesReq, GetAllSpeciesFilter, GetAllSpeciesRes, UpdateSpeciesReq } from "@/types/species";
import { PaginatedResponse } from "@/types/pagination";
import api from "@/utils/api";

function useFetchAllSpecies(req: GetAllSpeciesFilter) {
    const query = useQuery({
        queryKey: [req],
        queryFn: async () => {
            return await getAllSpecies(req);
        },
        enabled: false,
    });

    return query;
}

async function getAllSpecies(req: GetAllSpeciesFilter): Promise<PaginatedResponse<GetAllSpeciesRes>> {
    return await api.get("/species", { params: req });
}

function useFetchOneSpecies(id: string) {
    const query = useQuery({
        queryKey: [id],
        queryFn: async () => getOneSpecies(id),
    });

    return query;
}

async function getOneSpecies(id: string): Promise<GetAllSpeciesRes> {
    return api.get(`/species/${id}`);
}

function useCreateSpecies() {
    const query = useMutation({
        mutationFn: async (req: CreateSpeciesReq) => createSpecies(req),
    })

    return query;
}

async function createSpecies(data: CreateSpeciesReq): Promise<void> {
    return await api.post("/species", data);
}

function useUpdateSpecies() {
    const query = useMutation({
        mutationFn: async (req: UpdateSpeciesReq) => updateSpecies(req.id, req.data),
    })

    return query;
}

async function updateSpecies(id: string, data: CreateSpeciesReq): Promise<void> {
    return await api.put(`/species/${id}`, data);
}

function useDeleteSpecies() {
    const query = useMutation({
        mutationFn: async (id: string) => deleteSpecies(id),
    })

    return query;
}

async function deleteSpecies(id: string): Promise<void> {
    return await api.delete(`/species/${id}`);
}


export { useFetchAllSpecies, useCreateSpecies, useFetchOneSpecies, useUpdateSpecies, useDeleteSpecies };