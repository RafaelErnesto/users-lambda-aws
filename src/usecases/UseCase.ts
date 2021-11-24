
export interface UseCase<Input = any, Output = any>{
    execute(input?: any): Promise<Input | Output>;
}