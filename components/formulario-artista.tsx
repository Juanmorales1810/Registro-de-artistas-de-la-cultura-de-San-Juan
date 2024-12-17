"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormValues, Miembro, esquemaPersona, MiembroFisico } from "@/validations/validations-form"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "./ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const rubros = ["Música", "Informática", "Diseño", "Otros"]

const categorias = {
    "Música": ["Producción", "Intérprete", "Manager"],
    "Informática": ["Diseño Web", "Diseño Gráfico", "Video Juegos"],
    "Diseño": ["Diseño Web", "Diseño Gráfico", "Video Juegos"],
    "Otros": []
}

export function FormularioArtista() {
    const [selectedRubro, setSelectedRubro] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<FormValues>({
        resolver: zodResolver(esquemaPersona),
        defaultValues: {
            miembros: [
                {
                    tipo_persona: "PersonaFisica",
                    nya: "",
                    cuit: "",
                    nacionalidad: "",
                    correo: "",
                    telefono: "",
                    fecha_inicio: "",
                    persona_expuesta: false,
                    rubro: "",
                    categoria: "",
                } as MiembroFisico,
            ],
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "miembros",
    });

    const handleTipoPersonaChange = (index: number, value: "PersonaFisica" | "PersonaJuridica") => {
        const updatedMiembro: Miembro = value === "PersonaFisica"
            ? {
                tipo_persona: "PersonaFisica",
                nya: "",
                cuit: "",
                nacionalidad: "",
                correo: "",
                telefono: "",
                fecha_inicio: "",
                persona_expuesta: false,
                rubro: "",
                categoria: "",
                bio: "",
                terminos: false,
            }
            : {
                tipo_persona: "PersonaJuridica",
                nombre: "",
                cuit: "",
                domicilio: "",
                jurisdiccion: "",
                autoridades: "",
                correo: "",
                telefono: "",
                antecedentes: "",
                rubro: "",
                categoria: "",
                bio: "",
                terminos: false,
            };

        update(index, updatedMiembro);
    };

    async function onSubmit(data: FormValues) {
        setIsLoading(true)
        // Simular una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (data) {
            toast({
                title: "Inicio de sesión exitoso",
                description: "Bienvenido al panel de administración",
            })
            router.push("/admin")
        } else {
            toast({
                title: "Error de inicio de sesión",
                description: "Credenciales inválidas",
                variant: "destructive",
            })
        }
        setIsLoading(false)
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {fields.map((field, index) => (
                            <div key={field.id} className="max-w-xl mx-auto py-4 space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`miembros.${index}.tipo_persona`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-nowrap">Tipo de Persona</FormLabel>
                                                <Select
                                                    onValueChange={(value: "PersonaFisica" | "PersonaJuridica") => {
                                                        field.onChange(value);
                                                        handleTipoPersonaChange(index, value);
                                                    }}
                                                    value={field.value}
                                                // disabled={!!datos?.length}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950">
                                                            <SelectValue placeholder="Seleccione el tipo de persona" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="PersonaFisica">Persona Humana</SelectItem>
                                                        <SelectItem value="PersonaJuridica">Persona Jurídica</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {field.tipo_persona === "PersonaFisica" ? (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.nya`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">Nombre y Apellido</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                placeholder="Ej: Juan Perez"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.cuit`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">CUIT</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                placeholder="Ej: 00000000000 sin guiones"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.nacionalidad`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">Nacionalidad</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                placeholder="Ej: Argentino"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.correo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">Correo</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                type="email"
                                                                placeholder="Ej: ejemplo@correo.com"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.telefono`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">Teléfono</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                type="tel"
                                                                placeholder="Ej: 011-12345678"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.fecha_inicio`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel className="text-nowrap">Fecha de inicio</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                type="date"
                                                                // disabled={!!datos?.length}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.persona_expuesta`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row justify-center items-center space-x-3 space-y-0 p-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            className="data-[state=checked]:bg-naranjaPrincipal data-[state=checked]:border-none data-[state=checked]:drop-shadow-[0_35px_35px_rgba(236,102,8,0.25)]"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        // disabled={!!datos?.length}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            ¿Es una persona políticamente expuesta?
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.nombre`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Nombre</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: Empresa S.A." className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.cuit`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>CUIT</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: 00000000000 sin guiones" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.domicilio`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Domicilio</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: Calle 123" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.jurisdiccion`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Jurisdicción de origen</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: Buenos Aires" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.autoridades`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Autoridades</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: Juan Perez, Miguel Rodriguez" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.correo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Correo</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="Ej: ejemplo@correo.com" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.telefono`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Teléfono</FormLabel>
                                                        <FormControl>
                                                            <Input type="tel" placeholder="Ej: 011-12345678" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`miembros.${index}.antecedentes`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Antecedentes</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ej: Empresa con 10 años de antigüedad" className="max-w-[420px] disabled:border-none disabled:shadow-none disabled:text-zinc-950"
                                                                {...field}
                                                            // disabled={!!datos?.length} 
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </>
                                )}
                                <FormField
                                    control={form.control}
                                    name={`miembros.${index}.rubro`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rubro</FormLabel>
                                            <Select onValueChange={(value) => {
                                                field.onChange(value)
                                                setSelectedRubro(value)
                                                form.setValue(`miembros.${index}.categoria`, "")
                                            }}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un rubro" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {rubros.map((rubro) => (
                                                        <SelectItem key={rubro} value={rubro}>
                                                            {rubro}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Selecciona el rubro de tu interés.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {selectedRubro && selectedRubro !== "Otros" && (
                                    <FormField
                                        control={form.control}
                                        name={`miembros.${index}.categoria`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Categoría</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona una categoría" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categorias[selectedRubro as keyof typeof categorias].map((categoria) => (
                                                            <SelectItem key={categoria} value={categoria}>
                                                                {categoria}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Selecciona la categoría correspondiente.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name={`miembros.${index}.bio`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Biografía</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Cuéntanos sobre ti y tu arte..."
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`miembros.${index}.terminos`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Acepto los términos y condiciones
                                                </FormLabel>
                                                <FormDescription>
                                                    Al marcar esta casilla, aceptas nuestros términos de servicio y política de privacidad.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                            </div>
                        ))}
                        <div className="flex flex-col justify-center items-center gap-4">

                            <Button type="submit" className="bg-orange-600"
                                disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Enviando formulario..." : "Enviar formulario"}
                            </Button>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

