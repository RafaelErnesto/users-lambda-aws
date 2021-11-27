
export interface UseCase<Input = any, Output = any>{
    execute(input?: Input): Promise<Input | Output>;
}

export class UseCaseOutputSuccess<Output>  {
    readonly result = 'success';
    value: Output;

    constructor(value: Output) {
        this.value = value;
    }
}

export class UseCaseOutputValidationError<Output>  {
    readonly result = 'validation_error';
    value: Output;

    constructor(value: Output) {
        this.value = value;
    }
}

export class UseCaseOutputError<Output>  {
    readonly result = 'error';
    value: Output;

    constructor(value: Output) {
        this.value = value;
    }
}