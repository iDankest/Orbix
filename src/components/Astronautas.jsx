
import Card from "./Card";
import { useFetch } from "../hooks/useFetch";

export default function Astronautas() {
const { data: crew } = useFetch("https://api.spacexdata.com/v4/crew");
// Filtramos por 'name' y por 'agency' (corporation)


return (
  <div>
    <div className="grid grid-cols-4 gap-4">
      {crew?.map(member => (
        <Card key={member.id} name={member.name} img={member.image} corporation={member.agency} />
      ))}
    </div>
  </div>
);
}