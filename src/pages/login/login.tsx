import { ArrowRight, Eye, EyeOff, Landmark, SendHorizonal } from "lucide-react";
import { FormEvent, useState } from "react";
import { API } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState("");

  function loginToDashboard(event: FormEvent) {
    event.preventDefault();
  }

  function showPassword(event: FormEvent) {
    event.preventDefault();

    const passwordInput = document.querySelector('input[name="password"]');
    const type =
      passwordInput?.getAttribute("type") === "password" ? "text" : "password";
    passwordInput?.setAttribute("type", type);

    setShowPass(!showPass);
  }

  function demoAccount() {
    navigate("/dashboard/demo");
  }

  async function userAccount(event: FormEvent) {
    event.preventDefault();
    
    if(await API.get(`/user/${user}/cpf`)) {
      navigate(`/dashboard/${user}`);
    }
    
  }

  return (
    <div className="h-screen text-zinc-50">
      <div className="h-full flex relative">
        <main className="bg-black h-full flex-1 relative">
          <div className="w-full h-full flex justify-center px-24 flex-col space-y-10">
            <h1 className="text-zinc-50 text-3xl font-bold ">
              Sign in to iBank
            </h1>
            <form onSubmit={loginToDashboard} className="w-full">
              <div className="space-y-10">
                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50">
                  <input
                    type="text"
                    placeholder="E-mail or CPF"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                    required
                    
                  />
                </div>

                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50 flex items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                    required
                    
                  />
                  <button onClick={showPassword}>
                    {showPass ? (
                      <Eye
                        id="eye"
                        className="size-6 opacity-40 hover:opacity-75"
                      />
                    ) : (
                      <EyeOff
                        id="eye"
                        className="size-6 opacity-40 hover:opacity-75"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <input type="checkbox" name="remenmberme" className="size" />
                <span className="opacity-40 text-sm">Remember me</span>
              </div>
              <button
                type="submit"
                className="w-full  bg-[#666666] py-2.5 rounded-full mt-5 hover:bg-white"
              >
                <div className="opacity-40 flex items-center justify-center gap-1 hover:opacity-100 hover:text-black">
                  <span>Continue</span>
                  <ArrowRight />
                </div>
              </button>
            </form>
            <div>
              <span className="block text-center text-sm text-[#666666]">
                Don’t have an account?{" "}
                <a href="/register" className="text-white underline">
                  Sign Up now
                </a>
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex items-center justify-center flex-col space-y-3 mb-6">
            <div className="w-full px-24">
              <button
                onClick={demoAccount}
                className="w-full border-zinc-50 border rounded-xl px-7 h-16 text-xs opacity-40 hover:opacity-100"
              >
                If you don't have an account, click here to see a demo account
              </button>
            </div>

            <div className="w-full px-24">
              <form
                onSubmit={userAccount}
                className="flex w-full border-zinc-50 border rounded-xl justify-between px-7 h-16 border-opacity-40"
              >
                <input
                  type="text"
                  placeholder="Insert the user"
                  className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  required
                  onChange={(event) => setUser(event.currentTarget.value)}
                />
                <button className="opacity-40 hover:opacity-100">
                  <SendHorizonal className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
        <aside className="w-2/3 flex items-center justify-center">
          <img src="bike.png" alt="" />
        </aside>
      </div>

      <div className="fixed right-8 top-6 text-black">
        <a
          href="/"
          className="flex items-center justify-center gap-1 hover:opacity-60 transition-all"
        >
          <Landmark className="size-7" />
          <span className="text-xl font-extrabold">iBank</span>
        </a>
      </div>
    </div>
  );
}
