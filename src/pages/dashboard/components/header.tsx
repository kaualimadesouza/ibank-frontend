import {
  Bolt,
  CircleEllipsis,
  CreditCard,
  Eye,
  Home,
  Landmark,
} from "lucide-react";
import { User } from "..";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface headerProps {
  userData: User | undefined;

}

export function Header({ userData }: headerProps) {
  const { user } = useParams();
  const [isHideBalance, setIsHideBalance] = useState(false);

  function showhideBalance() {
    setIsHideBalance(!isHideBalance);
  }

  return (
    <header className="border-b border-zinc-200 pt-10">
      <div className="max-w-[1096px] m-auto space-y-7">
        <div className="flex items-center justify-between">
          <div className="text-black">
            <a href={`/dashboard/${user}`} className="flex items-center justify-center gap-1 hover:opacity-60 transition-all cursor-pointer">
              <Landmark className="size-12" />
              <span className="text-3xl font-extrabold">iBank</span>
            </a>
          </div>
          <div className="flex gap-6 items-center">
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
            <div className="w-px h-[30px] bg-black opacity-40"></div>
            <div className="flex items-center gap-7">
              <div className="flex flex-col gap-1">
                <span className="block font-medium text-[#666666] text-[12px]">
                  Olá, {userData?.first_name}
                </span>
                <span className="block text-[12px] font-bold">
                  {userData?.cpf}
                </span>
              </div>
              <Bolt className="size-7 opacity-50" />
            </div>
            <div className="w-px h-[30px] bg-black opacity-40"></div>
            <a
              href="/login"
              className="block font-medium text-sm text-[#666666]"
            >
              SIGN OUT
            </a>
          </div>
        </div>
        <div className="flex justify-around hover:box-border ga">
          <a href={`/dashboard/${user}`} className="hover:opacity-40 flex flex-col gap-3 justify-center items-center px-12 py-7 box-border">
            <Home className="size-7" />
            <span className="block">Home</span>
          </a>

          <a href={`/dashboard/${user}/cards`} className="hover:opacity-40 flex flex-col gap-3 justify-center items-center px-12 py-7 box-border">
            <CreditCard className="size-7" />
            <span className="block">Cards</span>
          </a>

          <a href={`/dashboard/${user}/about`} className="hover:opacity-40 flex flex-col gap-3 justify-center items-center px-12 py-7 box-border">
            <CircleEllipsis className="size-7" />
            <span className="block">About</span>
          </a>
        </div>
      </div>
    </header>
  );
}
