//NodeJS.ProcessEnv
declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        SALT: number;
        PORT:number;
        JW_SECRET: string;
    }
}