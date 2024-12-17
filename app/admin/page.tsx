"use client"

import { ArtistasTable } from "@/components/artistas-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import Link from "next/link"

export default function AdminPage() {

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Panel de Administración</h1>
                <Button asChild>
                    <Link href="/inscripcion">
                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar Artista
                    </Link>
                </Button>
            </div>
            <ArtistasTable />
        </div>
    )
}

