import { CircleDollarSign, Divide, Landmark } from "lucide-react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FormEvent, useEffect, useState } from "react";
import { User } from ".";
import { useParams } from "react-router-dom";
import { API } from "../../lib/axios";

interface CreditCard {
  id: string;
  cardNumber: string;
  valid: string;
  cvv: string;
  user: User;
  cardLimit: number;
  remainLimit: number;
  taxaJuros: string;
  creditPassword: string;
}

interface DebitCard {
  id: string;
  cardNumber: string;
  valid: string;
  cvv: string;
  user: User;
  debitPassword: string;
}

export function Cards() {
  const [userData, setUserData] = useState<User>();
  const { user } = useParams();
  const [haveCards, setHaveCards] = useState(false);
  const [dataCreditCard, setDataCreditCard] = useState<CreditCard>();
  const [dataDebittCard, setDataDebitCard] = useState<DebitCard>();
  const [password, setPassword] = useState("");
  const [creditOrDebit, setCreditOrDebit] = useState(true);

  function openCreditCard() {
    setCreditOrDebit(true);
  }

  function openDebitCard() {
    setCreditOrDebit(false);
  }

  async function getCards(u: string) {
    try {
      await API.get(`/user/${u}/cards/credit`);
      setHaveCards(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    if (user == "demo") {
      API.get(`/user/553.988.118-43/cpf`).then((response) => {
        setUserData(response.data);

        getCards(response.data.id).then((result) => {
          if (result === false) {
            console.log("A requisição falhou.");
          } else {
            API.get(`/user/${response.data.id}/cards/credit`).then(
              (response) => {
                setDataCreditCard(response.data);
              }
            );

            API.get(`/user/${response.data.id}/cards/debit`).then(
              (response) => {
                setDataDebitCard(response.data);
              }
            );
          }
        });
      });
    } else {
      API.get(`/user/${user}/cpf`).then((response) => {
        setUserData(response.data);
        getCards(response.data.id).then((result) => {
          if (result === false) {
            console.log("A requisição falhou.");
          } else {
            API.get(`/user/${response.data.id}/cards/credit`).then(
              (response) => {
                setDataCreditCard(response.data);
              }
            );

            API.get(`/user/${response.data.id}/cards/debit`).then(
              (response) => {
                setDataDebitCard(response.data);
              }
            );
          }
        });
      });
    }
  }, []);

  function showCards() {
    console.log(dataCreditCard);
  }

  function activeCards(event: FormEvent) {
    event.preventDefault();
    API.post(`/user/${userData?.id}/cards/debit/active`, {
      password,
    });

    API.post(`/user/${userData?.id}/cards/credit/active`, {
      password,
    });


  }

  return (
    <div className="h-screen">
      <Header userData={userData} />

      <main className="min-h-[74%] bg-[#F2F2F2] flex flex-col items-center justify-center shadow-sha">
        {haveCards ? (
          <div>
            <div className="max-w-[1096px] m-auto flex space-x-3 py-10">
              <div className="space-y-3">
                <div
                  className="w-[420px] rounded-md shadow-shape text-white bg-black p-10 space-y-10 hover:opacity-60 transition-all cursor-pointer"
                  onClick={openCreditCard}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 hover:opacity-60 transition-all">
                      <Landmark className="size-7" />
                      <span className="text-xl font-extrabold">iBank</span>
                    </div>
                    <span className="block">Credit</span>
                  </div>
                  <div className="space-y-2">
                    <img src="/chip.svg" alt="chip" />
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <span className="block font-bold text-base">
                          {dataCreditCard?.cardNumber}
                        </span>
                        <span className="block font-normal text-[#666666] text-sm">
                          Valid: {dataCreditCard?.valid}
                        </span>
                        <span className="block font-bold text-[15px]">
                          {`${userData?.first_name} ${userData?.last_name}`}
                        </span>
                      </div>
                      <img src="/mastercard.svg" alt="mastercard" />
                    </div>
                  </div>
                </div>

                <div
                  className="w-[420px] rounded-md shadow-shape text-white bg-black p-10 space-y-10 transition-all hover:opacity-60 cursor-pointer"
                  onClick={openDebitCard}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 hover:opacity-60 transition-all">
                      <Landmark className="size-7" />
                      <span className="text-xl font-extrabold">iBank</span>
                    </div>
                    <span className="block">Debit</span>
                  </div>
                  <div className="space-y-2">
                    <img src="/chip.svg" alt="chip" />
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <span className="block font-bold text-base">
                          {dataDebittCard?.cardNumber}
                        </span>
                        <span className="block font-normal text-[#666666] text-sm">
                          Valid: {dataDebittCard?.valid}
                        </span>
                        <span className="block font-bold text-[15px]">
                          {`${userData?.first_name} ${userData?.last_name}`}
                        </span>
                      </div>
                      <img src="/mastercard.svg" alt="mastercard" />
                    </div>
                  </div>
                </div>
              </div>
              {creditOrDebit ? (
                <div>
                  <div className="min-w-[720px] h-auto rounded-md shadow-shape bg-white p-10 flex items-center ">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold">Credit Card</h2>
                      <div className="space-y-1">
                        <span className="block font-bold text-base text-[#666666]">
                          Fatura atual
                        </span>
                        <span className="block font-bold text-2xl">
                          R$ {dataCreditCard?.remainLimit.toFixed(2)}
                        </span>
                        <span className="block font-bold text-base text-[#666666]">
                          Limite disponível{" "}
                          <span className="text-[#00AA4F]">
                            R$ {dataCreditCard?.cardLimit.toFixed(2)}
                          </span>
                        </span>
                        <span className="block font-bold text-base text-[#666666]">
                          Password: {dataCreditCard?.creditPassword}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="w-[250px] bg-black text-white rounded-md py-2 font-bold"
                      >
                        Pagar fatura
                      </button>
                    </div>
                    <CircleDollarSign className="size-44 flex-1" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="min-w-[720px] h-auto rounded-md shadow-shape bg-white p-10 flex items-center ">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold">Debit Card</h2>
                      <div className="space-y-1">
                        <span className="block font-bold text-base text-[#666666]">
                          Password: {dataDebittCard?.debitPassword}
                        </span>
                      </div>
                    </div>
                    <CircleDollarSign className="size-44 flex-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-4">
            <h2 className="text-3xl font-bold text-center">
              Do you want to active your cards?
            </h2>
            <form onSubmit={activeCards} className="flex flex-col gap-4">
              <input
                onChange={(event) => setPassword(event.currentTarget.value)}
                type="text"
                className="px-5 py-4 bg-[#DEDEDE] rounded-md outline-none text-sm"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-[500px] bg-black text-white rounded-md py-2.5 font-bold hover:opacity-70 transition-all"
              >
                Active
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
