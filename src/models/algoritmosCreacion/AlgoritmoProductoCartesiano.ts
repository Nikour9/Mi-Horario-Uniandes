import AlgoritmoCreacionHorarios from "./AlgoritmoCreacionHorarios";
import Horario from "../Horario";
import Seccion from "../Seccion";
import Curso from "../Curso";
import { horarioEsValido } from "@/services/operacionesSobreHorario";

export default class AlgoritmoBacktracking implements AlgoritmoCreacionHorarios {
    crearHorarios(cursos: Curso[]): Horario[] {
        const horarios: Horario[] = [];
        this.backtrack(cursos, 0, [], horarios);
        return horarios;
    }

    private backtrack(
        cursos: Curso[],
        indiceCurso: number,
        seccionesActuales: Seccion[],
        horarios: Horario[]
    ): void {
        if (indiceCurso === cursos.length) {
            // Base case: We've assigned a section to each course
            const nuevoHorario = new Horario(horarios.length, [...seccionesActuales]);
            if (horarioEsValido(nuevoHorario)) {
                horarios.push(nuevoHorario);
            }
            return;
        }

        const cursoActual = cursos[indiceCurso];
        for (const seccion of cursoActual.secciones) {
            seccionesActuales.push(seccion);
            this.backtrack(cursos, indiceCurso + 1, seccionesActuales, horarios);
            seccionesActuales.pop(); // Backtrack: remove the current section
        }
    }
}
