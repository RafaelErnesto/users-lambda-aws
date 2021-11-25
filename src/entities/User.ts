export class User {

    private _id?: number;
    private _name: string;
    private _role: string;
    private _age: number;

    constructor(data: {name: string, role: string, age: number, id?: number}) {
        this.name = data.name;
        this.role = data.role;
        this.age = data.age;
        this._id = data?.id;
    }

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }

    public set name(name: string) {
        if(name.length === 0) {
            throw new Error('Name cannot be empty');    
        }
        if(!(/^[a-zA-Z\s]+$/.test(name))) {
            throw new Error('Numbers are not allowed on name');
        }
        this._name = name;
    }

    public get role(): string {
        return this._role;
    }

    public set role(role: string) {
        const roles = ['manager', 'user'];
        if(!roles.includes(role)) {
            throw new Error('Role not allowed');
        }
        this._role = role;
    }

    public get age(): number {
        return this._age;
    }

    public set age(age: number) {
        if(age < 0 || age > 130) { 
            throw new Error('Age out of range');
         }
        this._age = age;
    }
}