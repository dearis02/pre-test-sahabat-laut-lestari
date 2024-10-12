"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateSpecies, useUpdateSpecies } from "@/services/species"
import LoadingButton from "../LoadingButton"
import { use, useEffect } from "react"
import { GetAllSpeciesRes } from "@/types/species"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    faoCode: z.string().min(1, "FAO Code is required"),
    typeOfFish: z.string().min(1, "Type of Fish is required"),
    scientificName: z.string().min(1, "Scientific Name is required"),
    englishName: z.string().min(1, "English Name is required"),
    indonesianName: z.string().min(1, "Indonesian Name is required"),
    localName: z.string().min(1, "Local Name is required"),
    typeOfWater: z.string().min(1, "Type of Water is required"),
    imageUrl: z.string().url().min(1, "Image URL is required"),
    statusInIndonesia: z.string().min(1, "Status in Indonesia is required"),
    fishUtilization: z.string().min(1, "Fish Utilization is required"),
})

type FormData = z.infer<typeof formSchema>

export interface SpeciesFormProps {
    data?: GetAllSpeciesRes;
    onSuccess: (isUpdateAction: boolean) => void;
}

export function SpeciesForm(props: SpeciesFormProps) {
    const form = useForm<FormData>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                faoCode: "",
            },
        }
    )
    const { mutate: mutateCreate, isSuccess: isSuccessCreate, isError: isErrorCreate, isPending: isPendingCreate, error: errorCreate } = useCreateSpecies()
    const { mutate: mutateUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, isPending: isPendingUpdate, error: errorUpdate } = useUpdateSpecies()

    const { toast } = useToast()

    function submitForm() {
        form.handleSubmit((data) => {
            if (props.data) {
                mutateUpdate({
                    id: props.data.id,
                    data: data,
                })
            } else {
                mutateCreate(data)
            }
        })()
    }

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            props.onSuccess(isSuccessUpdate ?? false)
        }

        if (isErrorCreate) {
            console.error(errorCreate)
            toast({
                title: "Error",
                description: errorCreate.message,
                variant: "destructive",
            })
        } else if (isErrorUpdate) {
            console.error(errorUpdate)
            toast({
                title: "Error",
                description: errorUpdate.message,
                variant: "destructive",
            })
        }
    }, [isSuccessCreate, isSuccessUpdate, isErrorUpdate])

    useEffect(() => {
        if (props.data) {
            form.reset(props.data as FormData)
        }
    }, [props.data])

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="w-full grid grid-cols-2 gap-y-3 gap-x-3">
                <FormField
                    control={form.control}
                    name="faoCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>FAO Code</FormLabel>
                            <FormControl>
                                <Input placeholder="FAO Code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="typeOfFish"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of Fish</FormLabel>
                            <FormControl>
                                <Input placeholder="Type of Fish" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="scientificName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Scientific Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Scientific Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="englishName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>English Name</FormLabel>
                            <FormControl>
                                <Input placeholder="English Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="indonesianName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Indonesian Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Indonesian Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="localName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Local Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Local Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="typeOfWater"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of Water</FormLabel>
                            <FormControl>
                                <Input placeholder="Type of Water" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="statusInIndonesia"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status in Indonesia</FormLabel>
                            <FormControl>
                                <Input placeholder="Status in Indonesia" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fishUtilization"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fish Utilization</FormLabel>
                            <FormControl>
                                <Input placeholder="Fish Utilization" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            {!isPendingCreate && !isPendingUpdate ?
                <Button onClick={submitForm}>{props.data ? "Update" : "Save"}</Button>
                :
                <LoadingButton />
            }
        </Form>
    )
}
