export interface LoginResult {
    token: string;
    message: string;
}

export class LoginFailure extends Error {
    constructor(message: string) {
        super(message); 
        this.name = 'LoginFailure'; 
    }
}

export interface LoginService {
    login(usuario: string, password: string): Promise<LoginResult>;
}

export class LoginServiceMock implements LoginService {
    login(usuario: string, password: string): Promise<LoginResult> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    if (usuario === 'admin' && password === '123') {
                        resolve({
                            token: 'token',
                            message: 'Login exitoso',
                        });
                    } else if(usuario === 'error') {
                        throw new Error ("errorSinvalorParaElUsuario")
                    } else {
                        reject(new LoginFailure('Usuario o contraseña incorrectos')); 
    
                    }
                }
                catch(error){
                    reject(error)
                }
 
            }, 2000); 
        });
    }
}
