import Cookies from 'universal-cookie';

export default function Cooki() {
    const id = new Cookies().get("id");
    return id
    }