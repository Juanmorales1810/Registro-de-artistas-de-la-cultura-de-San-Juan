import { z } from "zod";

const isFileListDefined = typeof FileList !== "undefined";

const fileSchema = isFileListDefined
    ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, {
              message: "Debe seleccionar un archivo de documento.",
          })
          .refine(
              (files) => {
                  const validTypes = [
                      "application/pdf",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
                      "text/plain",
                  ];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de documento no válido. Solo se permiten archivos PDF, DOCX y TXT.",
              }
          )
          .refine((files) => files[0]?.size <= 2 * 1024 * 1024, {
              message: "El tamaño del documento no debe exceder los 2MB.",
          })
    : z.any();

// Esquema para persona humana
const esquemaHumana = z.object({
    tipo_persona: z.literal("PersonaFisica"),
    nya: z
        .string()
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(50, {
            message: "El nombre no debe exceder los 50 caracteres.",
        }),
    cuit: z
        .string()
        .regex(/^[0-9,$]/, {
            message: "El cuit solo puede contener números.",
        })
        .min(11, {
            message: "El cuit debe tener al menos 11 caracteres.",
        })
        .max(11, {
            message: "El cuit no debe exceder los 11 caracteres.",
        }),
    nacionalidad: z
        .string()
        .min(3, {
            message: "La nacionalidad debe tener al menos 3 caracteres.",
        })
        .max(50, {
            message: "La nacionalidad no debe exceder los 50 caracteres.",
        }),
    correo: z.string().email("El correo debe ser válido."),
    telefono: z
        .string()
        .min(10, {
            message: "El teléfono debe tener al menos 9 caracteres.",
        })
        .max(15, {
            message: "El teléfono no debe exceder los 15 caracteres.",
        }),
    fecha_inicio: z.string().min(1, {
        message: "La fecha de inicio es obligatoria.",
    }),
    persona_expuesta: z.boolean().optional(),
    rubro: z.string().min(1, {
        message: "Por favor selecciona un rubro.",
    }),
    categoria: z.string().min(1, {
        message: "Por favor selecciona una categoría.",
    }),
    bio: z.string().min(10, "La biografía debe tener al menos 10 caracteres"),
    terminos: z.boolean().refine((val) => val === true, {
        message: "Debe aceptar los términos y condiciones",
    }),
});

// Esquema para persona jurídica
const esquemaJuridica = z.object({
    tipo_persona: z.literal("PersonaJuridica"),
    nombre: z
        .string()
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(50, {
            message: "El nombre no debe exceder los 50 caracteres.",
        }),
    cuit: z
        .string()
        .regex(/^[0-9,$]/, {
            message: "El cuit solo puede contener números.",
        })
        .min(11, {
            message: "El cuit debe tener al menos 11 caracteres.",
        })
        .max(11, {
            message: "El cuit no debe exceder los 11 caracteres.",
        }),
    domicilio: z
        .string()
        .min(3, {
            message: "El domicilio debe tener al menos 3 caracteres.",
        })
        .max(100, {
            message: "El domicilio no debe exceder los 100 caracteres.",
        }),
    jurisdiccion: z
        .string()
        .min(3, {
            message:
                "La jurisdicción de origen debe tener al menos 3 caracteres.",
        })
        .max(50, {
            message:
                "La jurisdicción de origen no debe exceder los 50 caracteres.",
        }),
    autoridades: z
        .string()
        .min(3, {
            message: "Las autoridades deben tener al menos 3 caracteres.",
        })
        .max(2000, {
            message: "Las autoridades no deben exceder los 2000 caracteres.",
        }),
    correo: z.string().email("El correo debe ser válido."),
    telefono: z
        .string()
        .min(10, {
            message: "El teléfono debe tener al menos 9 caracteres.",
        })
        .max(14, {
            message: "El teléfono no debe exceder los 14 caracteres.",
        }),
    antecedentes: z
        .string()
        .min(3, {
            message: "Los antecedentes deben tener al menos 3 caracteres.",
        })
        .max(1000, {
            message: "Los antecedentes no deben exceder los 1000 caracteres.",
        }),
    rubro: z.string().min(1, {
        message: "Por favor selecciona un rubro.",
    }),
    categoria: z.string().min(1, {
        message: "Por favor selecciona una categoría.",
    }),
    bio: z.string().min(10, "La biografía debe tener al menos 10 caracteres"),
    terminos: z.boolean().refine((val) => val === true, {
        message: "Debe aceptar los términos y condiciones",
    }),
});

const esquemaMiembro = z.discriminatedUnion("tipo_persona", [
    esquemaHumana,
    esquemaJuridica,
]);
// Esquema que combina los dos esquemas según el tipo de persona
export const esquemaPersona = z.object({
    miembros: z.array(esquemaMiembro),
});

export type FormValues = z.infer<typeof esquemaPersona>;

export interface FormPersonaProps {
    checkbox: boolean;
    datos: any;
    nombreSA: string;
}

export interface MiembroFisico {
    tipo_persona: "PersonaFisica";
    nya: string;
    cuit: string;
    nacionalidad: string;
    correo: string;
    telefono: string;
    fecha_inicio: string;
    persona_expuesta: boolean;
    rubro: string;
    categoria: string;
    bio: string;
    terminos: false;
}

export interface MiembroJuridico {
    tipo_persona: "PersonaJuridica";
    nombre: string;
    cuit: string;
    domicilio: string;
    jurisdiccion: string;
    autoridades: string;
    correo: string;
    telefono: string;
    antecedentes: string;
    rubro: string;
    categoria: string;
    bio: string;
    terminos: false;
}

export type Miembro = MiembroFisico | MiembroJuridico;
