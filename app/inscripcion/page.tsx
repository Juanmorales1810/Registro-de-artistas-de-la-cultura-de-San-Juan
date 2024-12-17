import { FormularioArtista } from "@/components/formulario-artista"

export default function InscripcionPage() {
    return (
        <div className="container max-w-5xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Formulario de Inscripción para Artistas</h1>
            <FormularioArtista />
        </div>
    )
}

