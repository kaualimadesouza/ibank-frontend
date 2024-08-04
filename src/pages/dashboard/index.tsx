import {
  ArrowUpFromDot,
  CircleDollarSign,
  Eye,
  Landmark,
  LogOut,
  X,
} from "lucide-react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../lib/axios";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  amount: number;
  cpf: string;
  email: string;
  password: string;
}

interface Transfer {
  id: string;
  sender: User;
  receiver: User;
  amount: number;
  type: string;
  transfer_date: string;
}

export function Dashboard() {
  const [sendMoneyModal, setSendMoneyModal] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [transfersDataSender, setTransfersDataSender] = useState<Transfer[]>(
    []
  );
  const [transfersDataReceiver, setTransfersDataReceiver] = useState<
    Transfer[]
  >([]);
  const { user } = useParams();
  const [transferMethod, setTransferMethod] = useState("");
  const [receiverId, setReceiverId] = useState<User>();
  const [inputoutputTransfers, setinputOutputTransfers] = useState(true);
  const [isHideBalance, setIsHideBalance] = useState(false);

  useEffect(() => {
    if (user == "demo") {
      API.get(`/user/553.988.118-43/cpf`).then((response) => {
        setUserData(response.data);
        API.get(`/transfer/sender/${response.data.id}`).then((response) => {
          setTransfersDataSender(response.data);
        });

        API.get(`/transfer/receiver/${response.data.id}`).then((response) => {
          setTransfersDataReceiver(response.data);
        });
      });
    } else {
      API.get(`/user/${user}/cpf`).then((response) => {
        setUserData(response.data);

        API.get(`/transfer/sender/${response.data.id}`).then((response) => {
          setTransfersDataSender(response.data);
        });

        API.get(`/transfer/receiver/${response.data.id}`).then((response) => {
          setTransfersDataReceiver(response.data);
        });
      });
    }
  }, []);

  function openSendMoneyModal() {
    setSendMoneyModal(true);
    document.body.style.overflow = "hidden";
  }

  function closeSendMoneyModal() {
    setSendMoneyModal(false);
    document.body.style.overflow = "auto";
  }

  function extractYear(date: string) {
    const newDate = new Date(date);
    return (
      <span>{`${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`}</span>
    );
  }

  async function postTransfer(id_rece: string, moneytosend: FormDataEntryValue | null) {
    await API.post(`/transfer`, {
      id_sender: userData?.id,
      id_receiver: id_rece,
      amount: moneytosend,
      type: transferMethod,
    });
  }

  async function sendTransfer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const cpf = data.get("cpf");
    const moneytosend = data.get("moneytosend");

    await API.get(`/user/${cpf}/cpf`).then((response) => {
      postTransfer(response.data.id, moneytosend);
    });

    setTimeout(() => {
      window.document.location.reload();
    }, 1000)
  }

  function inputs() {
    setinputOutputTransfers(true);
  }

  function output() {
    setinputOutputTransfers(false);
  }

  function showhideBalance() {
    setIsHideBalance(!isHideBalance);
  }

  return (
    <div className="h-screen">
      <Header userData={userData} />

      <main className="min-h-[74%] bg-[#F2F2F2] shadow-sha">
        <div className="max-w-[960px] m-auto py-14 h-full flex gap-4">
          <div className="bg-white h-full w-1/2 shadow-shape rounded-md px-7 py-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Extract</h2>
              <button
                onClick={openSendMoneyModal}
                className="shadow-shape py-2 px-4 bg-black rounded-md text-white"
              >
                Send money
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="flex flex-col gap-1">
                  <span className="block font-medium text-[#666666] text-[12px]">
                    Balance
                  </span>
                  {isHideBalance ? (
                    <span className="block font-semibold text-sm ">
                      R$ {userData?.amount.toFixed(2)}
                    </span>
                  ) : (
                    <span className="block font-semibold text-sm bg-slate-300 text-slate-300 opacity-50 rounded-lg transition-all">
                      R$ {userData?.amount.toFixed(2)}
                    </span>
                  )}
                </div>
                <button onClick={showhideBalance}>
                  <Eye className="size-7 opacity-50" />
                </button>
              </div>
              <div className="w-px h-[30px] bg-black opacity-20"></div>

              <div className="flex items-center gap-2">
                <button
                  onClick={inputs}
                  className="bg-transparent border-[#D9D9D9] border-[1px] w-32 py-2 rounded-md font-semibold text-sm text-[#666666]"
                >
                  Senders
                </button>
                <button
                  onClick={output}
                  className="bg-transparent border-[#D9D9D9] border-[1px] w-32 py-2 rounded-md font-semibold text-sm text-[#666666]"
                >
                  Receivers
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {transfersDataSender.length > 0 ? (
                <div>
                  {inputoutputTransfers ? (
                    <div>
                      {transfersDataSender.map((transfer) => (
                        <div key={transfer.id}>
                          <div className="border-b border-[#666666]">
                            <span className="text-[#666666] text-xs mb-1 block">
                              {extractYear(transfer.transfer_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-7">
                            <ArrowUpFromDot className="size-10 text-[#666666] ml-5" />
                            <div className="w-px h-[45px] bg-black opacity-20"></div>
                            <div className="flex flex-col gap-1 mt-3">
                              <span className="font-semibold">
                                {transfer.type.toLowerCase()} enviado
                              </span>
                              <span className=" font-semibold text-sm">
                                {transfer.amount.toFixed(2)}
                              </span>
                              <span className="text-[#666666] text-sm">
                                {`${transfer.receiver.first_name} ${transfer.receiver.last_name}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {transfersDataReceiver.map((transfer) => (
                        <div key={transfer.id}>
                          <div className="border-b border-[#666666]">
                            <span className="text-[#666666] text-xs mb-1 block">
                              {extractYear(transfer.transfer_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-7">
                            <CircleDollarSign className="size-10 text-[#666666] ml-5" />
                            <div className="w-px h-[45px] bg-black opacity-20"></div>
                            <div className="flex flex-col gap-1 mt-3">
                              <span className="font-semibold">
                                {transfer.type.toLowerCase()} recebido
                              </span>
                              <span className=" font-semibold text-sm">
                                {transfer.amount.toFixed(2)}
                              </span>
                              <span className="text-[#666666] text-sm">
                                {`${transfer.sender.first_name} ${transfer.sender.last_name}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            <div className="bg-white w-full shadow-shape rounded-md p-10 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-xl">
                  {`${userData?.first_name} ${userData?.last_name}`}
                </h3>
                <div className="text-xs text-[#666666]">
                  CPF:<span>{userData?.cpf}</span> -{" "}
                  <span>{userData?.email}</span>
                </div>
              </div>
              <a href="/login">
                <LogOut />
              </a>
            </div>
            <div className="bg-black w-full shadow-shape rounded-md h-[276px] flex items-center justify-center flex-col gap-4 text-white">
              <div className="flex items-center justify-center gap-1 ">
                <Landmark className="size-7" />
                <span className="text-xl font-extrabold">iBank</span>
              </div>
              <span className="block opacity-50 underline text-sm cursor-pointer">
                Invest with iBank
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {sendMoneyModal && (
        <div className="bg-black/50 fixed inset-0">
          <div className="bg-white w-1/3 h-full fixed right-0">
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 space-y-6 w-2/3">
              <h1 className="text-4xl font-bold">
                Who do you <br /> want to pay for?
              </h1>
              <form onSubmit={sendTransfer} className="space-y-4">
                <input
                  className="px-5 py-4 bg-[#DEDEDE] w-full rounded-md outline-none text-sm"
                  type="text"
                  required
                  placeholder="CPF or Email"
                  name="cpf"
                />

                <label
                  htmlFor="moneytosend"
                  className=" block font-bold text-xl mt-5"
                >
                  Value to pay
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col space-y-2 ">
                    <input
                      type="text"
                      name="moneytosend"
                      placeholder="Money to send"
                      className="px-5 py-4 bg-[#DEDEDE] w-full rounded-md outline-none text-sm"
                      required
                    />
                  </div>
                  <div className="w-px h-12 bg-[#DEDEDE] opacity-40"></div>
                  <div className="flex items-center gap-7">
                    <div className="flex flex-col gap-1">
                      <span className="block font-medium text-[#666666] text-[12px]">
                        Account Balance
                      </span>
                      <span className="block font-semibold text-sm">
                        R$ 0,00
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pagamento"
                      id="pagamento"
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      value="PIX"
                      onChange={(event) =>
                        setTransferMethod(event.currentTarget.value)
                      }
                    />
                    <label
                      htmlFor="pagamento"
                      className="text-[#666666] text-sm"
                    >
                      Pix
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pagamento"
                      id="pagamento"
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      value="DEBIT"
                      onChange={(event) =>
                        setTransferMethod(event.currentTarget.value)
                      }
                    />
                    <label
                      htmlFor="pagamento"
                      className="text-[#666666] text-sm"
                    >
                      Debit
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pagamento"
                      id="pagamento"
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      value="CREDIT"
                      onChange={(event) =>
                        setTransferMethod(event.currentTarget.value)
                      }
                    />
                    <label
                      htmlFor="pagamento"
                      className="text-[#666666] text-sm"
                    >
                      Credit
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white rounded-md py-2.5 font-bold"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          <button
            onClick={closeSendMoneyModal}
            className="absolute right-4 top-4 opacity-60 hover:opacity-100"
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}
