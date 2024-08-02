import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { useParams } from "react-router-dom";
import { API } from "../../lib/axios";
import { User } from ".";

export function About() {
  const { user } = useParams();
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    if (user == "demo") {
      API.get(`/user/553.988.118-43/cpf`).then((response) => {
        setUserData(response.data);
      });
    } else {
      API.get(`/user/${user}/cpf`).then((response) => {
        setUserData(response.data);
      });
    }
  }, []);

  return (
    <div className="h-screen">
      <Header userData={userData} />

      <main className="min-h-[74%] bg-[#F2F2F2] flex flex-col items-center justify-center shadow-sha">
        <div className="flex gap-4 items-center">
          <a href="https://github.com/kaualimadesouza/ibank-frontend" className="bg-black text-white rounded-md py-2.5 font-bold flex justify-center px-9 hover:opacity-80 transition-all" target="_blank">Frontend Details</a>
          <div className="w-px h-[15px] bg-black opacity-40"></div>
          <a href="https://github.com/kaualimadesouza/ibank-backend" className="bg-black text-white rounded-md py-2.5 font-bold flex justify-center px-9 hover:opacity-80 transition-all" target="_blank">Backend Details</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
