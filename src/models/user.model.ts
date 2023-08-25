
type User = {
    id: number;
    name: string;
    email: string;
    numberphone: number;
}

const userss: User[] = [
    {
        id: 1,
        name: 'It me kiên',
        email: "buihaikien@gmail.com",
        numberphone: 9876543210
    },
    {
        id: 2,
        name: 'Em đi xa quá',
        email: "emdixaqua@gmail.com",
        numberphone: 1234567800
    },
    {
        id: 3,
        name: 'Anh vẫn đứng đợi',
        email: "anhvandungdoi@gmail.com",
        numberphone: 32765432100
    }

]

export default {
    getUsers(): Promise<User[]> {
        return new Promise((resolve) => resolve(userss));
    },
}







