import { EyeOff, Landmark } from "lucide-react";

export function Register() {
  return (
    <div className="h-screen text-zinc-50">
      <div className="h-full flex">
        <main className="bg-black h-full flex-1">
          <div className="w-full h-full flex justify-center px-24 flex-col space-y-10">
            <h1 className="text-zinc-50 text-3xl font-bold ">
              Create an account
            </h1>

            <form className="w-full">
              <div className="space-y-7">
                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50">
                  <input
                    type="text"
                    placeholder="First name"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  />
                </div>

                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50 flex items-center">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  />
                </div>

                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50 flex items-center">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  />
                </div>

                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50 flex items-center">
                  <input
                    type="text"
                    name="CPF"
                    placeholder="CPF"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  />
                </div>

                <div className="py-2 border-b-[1px] border-zinc-50 border-opacity-50 flex items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-none bg-transparent placeholder:opacity-40 w-full"
                  />
                  <button>
                    <EyeOff className="size-6 opacity-40 hover:opacity-75" />
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
                  <span>Create</span>
                </div>
              </button>
            </form>

            <div>
              <span className="block text-center text-sm text-[#666666]">
                Already have an account? <a href="/" className="text-white underline">Log In now</a>
              </span>
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
