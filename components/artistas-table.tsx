"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, Trash2 } from 'lucide-react'

type Artista = {
    id: number
    nombre: string
    email: string
    telefono: string
    genero: string
    disciplinas: string[]
    experiencia: string
}

const initialArtistas: Artista[] = [
    {
        id: 1,
        nombre: "María González",
        email: "maria@example.com",
        telefono: "1234567890",
        genero: "femenino",
        disciplinas: ["pintura", "escultura"],
        experiencia: "intermedio",
    },
    {
        id: 2,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        telefono: "0987654321",
        genero: "masculino",
        disciplinas: ["fotografía", "música"],
        experiencia: "avanzado",
    },
    {
        id: 3,
        nombre: "Ana Rodríguez",
        email: "ana@example.com",
        telefono: "5555555555",
        genero: "femenino",
        disciplinas: ["danza", "teatro"],
        experiencia: "principiante",
    },
    // Agrega más artistas aquí...
]

export function ArtistasTable() {
    const [artistas, setArtistas] = useState<Artista[]>(initialArtistas)
    const [searchTerm, setSearchTerm] = useState("")
    const [generoFilter, setGeneroFilter] = useState("todos")
    const [experienciaFilter, setExperienciaFilter] = useState("todos")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filteredArtistas = artistas.filter((artista) => {
        return (
            artista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (generoFilter === "todos" || artista.genero === generoFilter) &&
            (experienciaFilter === "todos" || artista.experiencia === experienciaFilter)
        )
    })

    const pageCount = Math.ceil(filteredArtistas.length / itemsPerPage)
    const paginatedArtistas = filteredArtistas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleDelete = (id: number) => {
        setArtistas(artistas.filter((artista) => artista.id !== id))
    }

    const handleEdit = (id: number) => {
        // Aquí iría la lógica para editar un artista
        console.log("Editar artista con ID:", id)
    }

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <Input
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={generoFilter} onValueChange={setGeneroFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por género" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={experienciaFilter} onValueChange={setExperienciaFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por experiencia" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="principiante">Principiante</SelectItem>
                        <SelectItem value="intermedio">Intermedio</SelectItem>
                        <SelectItem value="avanzado">Avanzado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableCaption>Lista de artistas inscritos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Género</TableHead>
                        <TableHead>Disciplinas</TableHead>
                        <TableHead>Experiencia</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedArtistas.map((artista) => (
                        <TableRow key={artista.id}>
                            <TableCell>{artista.nombre}</TableCell>
                            <TableCell>{artista.email}</TableCell>
                            <TableCell>{artista.telefono}</TableCell>
                            <TableCell>{artista.genero}</TableCell>
                            <TableCell>{artista.disciplinas.join(", ")}</TableCell>
                            <TableCell>{artista.experiencia}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(artista.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(artista.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                }
                            }}
                        />
                    </PaginationItem>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (currentPage < pageCount) {
                                    setCurrentPage((prev) => prev + 1)
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

