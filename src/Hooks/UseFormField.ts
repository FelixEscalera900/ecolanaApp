import { useState, useEffect } from 'react';

export class ValidationResult {
  constructor(
    public valido: boolean = false,
    public message: string = ""
  ) {}

  static Invalid(mensaje: string): ValidationResult {
    return new ValidationResult(false, mensaje);
  }

  static Valid(): ValidationResult {
    return new ValidationResult(true, "");
  }
}

export class Validator<T> {
  constructor(
    public Evaluator: (x: T) => ValidationResult,
    public Condition: () => boolean = () => true
  ) {}

  Validar(valor: T): ValidationResult {
    if (this.Condition()) {
      return this.Evaluator(valor);
    }
    return ValidationResult.Valid();
  }
}

function obtenerErrorDeValidacion<T>(valor: T, validadores: Validator<T>[]): ValidationResult {
  for (const validador of validadores) {
    const resultado: ValidationResult = validador.Validar(valor);
    if (!resultado.valido) {
      return resultado;
    }
  }
  return ValidationResult.Valid();
}

export function useFormField<T>(
  valorInicial: T,
  validadores: Validator<T>[] = [],
) {
  const [valor, setValor] = useState<T>(valorInicial);
  const [touched, setTouched] = useState<boolean>(false);

  const actualizarValor = (nuevoValor: T) => {
    if (!touched) setTouched(true);
    setValor(nuevoValor);
  };

  const result: ValidationResult = obtenerErrorDeValidacion(valor, validadores);
  const UIIsOnValidState = touched ? result.valido : true;
  const mensaje = touched ? result.message : "";
  const Valido = result.valido;


  return {
    valor,
    setValor: actualizarValor,
    mensaje,
    UIIsOnValidState,
    Valido,
    Validar : () => { !touched && setTouched(true)}
  };
}
